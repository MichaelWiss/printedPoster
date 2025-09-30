/**
 * Cart Store - Enhanced Zustand Implementation with Authentication
 *
 * High-performance cart state management with authentication integration.
 * Supports both localStorage (guests) and Prisma (authenticated users).
 *
 * Features:
 * - Selective subscriptions (components only re-render when needed)
 * - Hybrid persistence: localStorage + Prisma
 * - Authentication-aware cart management
 * - Cross-device synchronization
 * - Optimistic UI updates with server sync
 * - Type-safe operations
 *
 * Advantages:
 * 1. Seamless guest → authenticated user transition
 * 2. Cross-device cart synchronization
 * 3. Optimistic updates with server backup
 * 4. Better performance than Context API
 * 5. Selective re-rendering
 * 6. Built-in persistence with migration
 *
 * @example
 * // Component only re-renders when items array changes
 * const items = useCartStore(state => state.items)
 *
 * // Component only re-renders when item count changes
 * const itemCount = useCartItemCount()
 *
 * // Actions have stable references (no re-renders)
 * const { addItem, removeItem } = useCartActions()
 */

import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import type { ShopifyProduct } from '@/types/shopify';
import { cartService, type CartItemData } from '@/lib/services/cart-service';
import { migrationService } from '@/lib/services/migration-service';
import { logger } from '@/lib/utils/logger';

// Enhanced interfaces for authentication and server sync
export interface CartLineItem {
  id: string;
  product: ShopifyProduct;
  quantity: number;
  // Server-side tracking
  serverId?: string;
  // Local optimistic updates
  pendingSync?: boolean;
}

export interface CartState {
  // Local state (for immediate UX)
  items: CartLineItem[];
  isLoading: boolean;
  error: string | null;

  // Server state
  serverCartId: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  lastSynced: Date | null;

  // Sync state
  pendingSync: CartItemData[];
  isOnline: boolean;
  sessionId: string | null;
}

export interface CartActions {
  // Authentication
  setUser: (userId: string) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setSessionId: (sessionId: string) => void;
  initializeClient: () => void;

  // Cart operations (async with server sync)
  addItem: (product: ShopifyProduct, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clear: () => Promise<void>;

  // Server synchronization
  syncWithServer: () => Promise<void>;
  loadFromServer: () => Promise<void>;
  migrateGuestCart: (userId: string) => Promise<void>;
  validateAndMigrate: (userId: string) => Promise<void>;

  // Utility
  clearError: () => void;

  // Computed values (derived state)
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemById: (id: string) => CartLineItem | undefined;

  // Utility functions
  isInCart: (productId: string) => boolean;
  getProductQuantity: (productId: string) => number;
}

export type CartStore = CartState & CartActions;

// Helper function to convert local items to server format
const convertToServerFormat = (items: CartLineItem[]): CartItemData[] => {
  return items.map(item => ({
    productId: item.product.id,
    variantId: item.product.variants?.edges[0]?.node.id || item.product.id,
    title: item.product.title,
    handle: item.product.handle,
    price: parseFloat(item.product.priceRange?.minVariantPrice?.amount || '0'),
    imageUrl: item.product.images?.edges[0]?.node.url,
    quantity: item.quantity,
  }));
};

// Type for server cart items
interface ServerCartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  handle: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

// Helper function to convert server items to local format
const convertFromServerFormat = (
  serverItems: ServerCartItem[],
  products: ShopifyProduct[]
): CartLineItem[] => {
  return serverItems.map((item: ServerCartItem, index: number) => {
    const product = products.find(p => p.id === item.productId) || {
      id: item.productId,
      title: item.title,
      handle: item.handle,
      description: '', // Add required description field
      priceRange: {
        minVariantPrice: {
          amount: item.price.toString(),
          currencyCode: 'USD',
        },
      },
      images: {
        edges: item.imageUrl
          ? [
              {
                node: {
                  url: item.imageUrl as string,
                  altText: item.title,
                },
              },
            ]
          : [],
      },
      variants: {
        edges: [
          {
            node: {
              id: item.variantId,
              title: 'Default Title',
              availableForSale: true,
            },
          },
        ],
      },
    };

    return {
      id: item.id || `local-${index}`,
      product,
      quantity: item.quantity,
      serverId: item.id,
    };
  });
};

// Create the enhanced cart store
export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        items: [],
        isLoading: false,
        error: null,
        serverCartId: null,
        userId: null,
        isAuthenticated: false,
        lastSynced: null,
        pendingSync: [],
        isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
        sessionId: null, // Will be set on client-side only

        // Authentication actions
        setUser: (userId: string) => {
          set({ userId, isAuthenticated: true });
          // Trigger server sync when user logs in
          get().migrateGuestCart(userId);
        },

        setAuthenticated: (isAuthenticated: boolean) => {
          set({ isAuthenticated });
        },

        setSessionId: (sessionId: string) => {
          set({ sessionId });
        },

        initializeClient: () => {
          // Only run on client side
          if (typeof window !== 'undefined') {
            const sessionId = `guest-${Math.random().toString(36).substr(2, 9)}`;
            set({ sessionId, isOnline: navigator.onLine });
          }
        },

        // Enhanced cart actions with server sync
        addItem: async (product: ShopifyProduct, quantity = 1) => {
          logger.info('Cart store addItem called with:', { product, quantity });
          try {
            set({ isLoading: true, error: null });
            logger.info('Setting loading state to true');

            // Immediate local update for instant UX
            const existingIndex = get().items.findIndex(
              item => item.product.id === product.id
            );
            logger.info('Existing item index:', existingIndex);

            let newItems: CartLineItem[];
            if (existingIndex >= 0) {
              newItems = [...get().items];
              newItems[existingIndex] = {
                ...newItems[existingIndex],
                quantity: newItems[existingIndex].quantity + quantity,
                pendingSync: true,
              };
            } else {
              // Generate stable ID using crypto if available, otherwise use a simple counter
              const generateId = () => {
                if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                  return crypto.randomUUID();
                }
                // Fallback to timestamp-based ID that's more stable
                return `${product.id}-${Math.random().toString(36).substr(2, 9)}`;
              };

              const newItem: CartLineItem = {
                id: generateId(),
                product,
                quantity,
                pendingSync: true,
              };
              newItems = [...get().items, newItem];
            }

            logger.info('Updating cart state with new items:', newItems.length, 'items');
            set({ items: newItems, isLoading: false });
            logger.info('Cart state updated successfully');

            // Server sync for authenticated users
            if (get().isAuthenticated && get().userId) {
              logger.info('User is authenticated, syncing with server');
              await get().syncWithServer();
            } else {
              logger.info('User not authenticated, skipping server sync');
            }
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error ? error.message : 'Failed to add item',
            });
            throw error;
          }
        },

        removeItem: async (id: string) => {
          try {
            set({ isLoading: true, error: null });

            // Local update
            const newItems = get().items.map(item =>
              item.id === id ? { ...item, pendingSync: true } : item
            );
            set({ items: newItems, isLoading: false });

            // Server sync
            if (get().isAuthenticated && get().serverCartId) {
              const item = get().items.find(item => item.id === id);
              if (item?.serverId) {
                await cartService.removeCartItem(item.serverId);
                // Remove from local state after successful server removal
                set({ items: get().items.filter(item => item.id !== id) });
              }
            } else {
              // Remove from local state immediately for guests
              set({ items: get().items.filter(item => item.id !== id) });
            }
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to remove item',
            });
            throw error;
          }
        },

        updateQuantity: async (id: string, quantity: number) => {
          try {
            set({ isLoading: true, error: null });

            if (quantity <= 0) {
              await get().removeItem(id);
              return;
            }

            // Local update
            const newItems = get().items.map(item =>
              item.id === id ? { ...item, quantity, pendingSync: true } : item
            );
            set({ items: newItems, isLoading: false });

            // Server sync
            if (get().isAuthenticated && get().serverCartId) {
              const item = get().items.find(item => item.id === id);
              if (item?.serverId) {
                await cartService.updateCartItem(item.serverId, quantity);
              }
            }
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to update quantity',
            });
            throw error;
          }
        },

        clear: async () => {
          try {
            set({ isLoading: true, error: null });

            // Local clear
            set({ items: [], isLoading: false });

            // Server clear
            if (get().isAuthenticated && get().serverCartId && get().userId) {
              await cartService.clearCart(get().serverCartId!);
            }
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error ? error.message : 'Failed to clear cart',
            });
            throw error;
          }
        },

        // Server synchronization
        syncWithServer: async () => {
          if (!get().isAuthenticated || !get().userId) return;

          try {
            const serverFormat = convertToServerFormat(get().items);

            if (!get().serverCartId) {
              // Create new cart on server
              const cart = await cartService.createUserCart(
                get().userId!,
                serverFormat
              );
              set({
                serverCartId: cart.id,
                lastSynced: new Date(),
                items: get().items.map(item => ({
                  ...item,
                  pendingSync: false,
                })),
              });
            } else {
              // Update existing cart
              await cartService.syncCart(get().serverCartId!, serverFormat);
              set({
                lastSynced: new Date(),
                items: get().items.map(item => ({
                  ...item,
                  pendingSync: false,
                })),
              });
            }
          } catch (error) {
            logger.error('Failed to sync with server:', error);
            // Don't throw - allow local cart to continue working
          }
        },

        loadFromServer: async () => {
          if (!get().isAuthenticated || !get().userId) return;

          try {
            const cart = await cartService.getUserCart(get().userId!);

            if (cart && cart.items.length > 0) {
              // Convert server items to local format
              const serverItems = convertFromServerFormat(cart.items, []);
              set({
                items: serverItems,
                serverCartId: cart.id,
                lastSynced: new Date(),
              });
            }
          } catch (error) {
            logger.error('Failed to load from server:', error);
          }
        },

        migrateGuestCart: async (userId: string) => {
          try {
            const guestItems = get().items;
            if (guestItems.length === 0) return;

            // Backup localStorage before migration
            const backupKey = migrationService.backupLocalStorage();

            try {
              // Validate local data
              if (!migrationService.validateLocalStorageData(guestItems)) {
                throw new Error('Invalid localStorage data');
              }

              // Create user cart with guest items
              const serverFormat = convertToServerFormat(guestItems);
              const cart = await cartService.createUserCart(
                userId,
                serverFormat
              );

              set({
                serverCartId: cart.id,
                userId,
                isAuthenticated: true,
                lastSynced: new Date(),
                items: guestItems.map(item => ({
                  ...item,
                  pendingSync: false,
                })),
              });

              // Clear localStorage after successful migration
              if (typeof window !== 'undefined') {
                localStorage.removeItem('cart-storage');
              }

              logger.info('Successfully migrated guest cart for user:', userId);
            } catch (migrationError) {
              logger.error('Migration failed:', migrationError);

              // Restore from backup if available
              if (backupKey) {
                await migrationService.restoreFromBackup(backupKey);
              }

              set({
                error:
                  'Failed to migrate your cart. Your items are still safe locally.',
              });
            }
          } catch (error) {
            logger.error('Failed to migrate guest cart:', error);
            set({
              error: 'Failed to migrate your cart. Please try again.',
            });
          }
        },

        validateAndMigrate: async (userId: string) => {
          // Check if migration is needed
          const hasMigrated = await migrationService.hasMigratedCart(userId);

          if (!hasMigrated) {
            await get().migrateGuestCart(userId);
          } else {
            // Load existing server cart
            await get().loadFromServer();
          }
        },

        clearError: () => {
          set({ error: null });
        },

        // Computed values (derived state)
        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        getTotalPrice: () => {
          return get().items.reduce((total, item) => {
            const price = parseFloat(
              item.product.priceRange?.minVariantPrice?.amount || '0'
            );
            return total + price * item.quantity;
          }, 0);
        },

        getItemById: (id: string) => {
          return get().items.find(item => item.id === id);
        },

        // Utility functions
        isInCart: (productId: string) => {
          return get().items.some(item => item.product.id === productId);
        },

        getProductQuantity: (productId: string) => {
          const item = get().items.find(item => item.product.id === productId);
          return item ? item.quantity : 0;
        },
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
        // Enhanced partialize for auth state - exclude client-only fields
        partialize: state => ({
          items: state.items,
          userId: state.userId,
          isAuthenticated: state.isAuthenticated,
          // Exclude sessionId and isOnline as they cause hydration issues
        }),
        version: 2, // Increment version for migration
        skipHydration: false,
      }
    ),
    {
      name: 'cart-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// Enhanced selector hooks for common use cases (prevents unnecessary re-renders)
export const useCartItems = () => useCartStore(state => state.items);
export const useCartItemCount = () =>
  useCartStore(state => state.getTotalItems());
export const useCartTotal = () => useCartStore(state => state.getTotalPrice());

// Authentication state hooks
export const useIsAuthenticated = () =>
  useCartStore(state => state.isAuthenticated);
export const useAuthUser = () =>
  useCartStore(state => ({
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
  }));

// Loading and error state hooks
export const useCartLoading = () => useCartStore(state => state.isLoading);
export const useCartError = () => useCartStore(state => state.error);

// Action hooks with stable references
export const useCartActions = () => {
  const addItem = useCartStore(state => state.addItem);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const clear = useCartStore(state => state.clear);
  const syncWithServer = useCartStore(state => state.syncWithServer);
  const migrateGuestCart = useCartStore(state => state.migrateGuestCart);
  const validateAndMigrate = useCartStore(state => state.validateAndMigrate);
  const clearError = useCartStore(state => state.clearError);
  const initializeClient = useCartStore(state => state.initializeClient);

  return {
    addItem,
    removeItem,
    updateQuantity,
    clear,
    syncWithServer,
    migrateGuestCart,
    validateAndMigrate,
    clearError,
    initializeClient,
  };
};

// Utility hooks for specific cart operations
export const useIsInCart = (productId: string) =>
  useCartStore(state => state.isInCart(productId));

export const useProductQuantity = (productId: string) =>
  useCartStore(state => state.getProductQuantity(productId));

export const useCartItem = (id: string) =>
  useCartStore(state => state.getItemById(id));

/**
 * Migration Guide from Context to Zustand:
 *
 * Before (Context):
 * ```tsx
 * const { state, actions } = useCart()
 * const itemCount = state.items.length
 * ```
 *
 * After (Zustand - Selective):
 * ```tsx
 * const itemCount = useCartItemCount() // Only re-renders when count changes
 * const { addItem, removeItem } = useCartActions() // Stable references
 * ```
 *
 * Before (Context - causes re-renders):
 * ```tsx
 * const { state, actions } = useCart() // Re-renders on ANY cart change
 * return <div>{state.items.length}</div>
 * ```
 *
 * After (Zustand - optimized):
 * ```tsx
 * const itemCount = useCartItemCount() // Only re-renders when count changes
 * return <div>{itemCount}</div>
 * ```
 */
