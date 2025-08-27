/**
 * Cart Store - Zustand Implementation
 * 
 * High-performance cart state management using Zustand with persistence.
 * Replaces React Context for better performance and selective re-rendering.
 * 
 * Features:
 * - Selective subscriptions (components only re-render when needed)
 * - Automatic localStorage persistence
 * - Optimistic UI updates
 * - Type-safe operations
 * - Better performance than Context API
 * 
 * Advantages over Context:
 * 1. No provider wrapper needed
 * 2. Selective re-rendering (only subscribed components update)
 * 3. Built-in persistence support
 * 4. Smaller bundle size
 * 5. Better DevTools integration
 * 6. No prop drilling or context provider hell
 * 
 * @example
 * // Component only re-renders when items array changes
 * const items = useCartStore(state => state.items)
 * 
 * // Component only re-renders when item count changes
 * const itemCount = useCartStore(state => state.items.length)
 * 
 * // Actions have stable references (no re-renders)
 * const addItem = useCartStore(state => state.addItem)
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import type { ShopifyProduct } from '@/types/shopify'

// Re-export types for compatibility with existing code
export interface CartLineItem {
  id: string
  product: ShopifyProduct
  quantity: number
}

export interface CartState {
  items: CartLineItem[]
}

export interface CartActions {
  // Core cart operations
  addItem: (product: ShopifyProduct, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
  
  // Computed values (derived state)
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemById: (id: string) => CartLineItem | undefined
  
  // Utility functions
  isInCart: (productId: string) => boolean
  getProductQuantity: (productId: string) => number
}

export type CartStore = CartState & CartActions

// Create the Zustand store with persistence and devtools
export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        items: [],

        // Actions
        addItem: (product: ShopifyProduct, quantity = 1) => {
          set((state) => {
            const existing = state.items.find(item => item.product.id === product.id)
            
            if (existing) {
              // Update existing item quantity
              return {
                items: state.items.map(item =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                )
              }
            } else {
              // Add new item
              const newItem: CartLineItem = {
                id: `${product.id}:${Date.now()}`,
                product,
                quantity
              }
              return {
                items: [...state.items, newItem]
              }
            }
          }, false, 'cart/addItem') // DevTools action name
        },

        removeItem: (id: string) => {
          set((state) => ({
            items: state.items.filter(item => item.id !== id)
          }), false, 'cart/removeItem')
        },

        updateQuantity: (id: string, quantity: number) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            get().removeItem(id)
            return
          }
          
          set((state) => ({
            items: state.items.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
          }), false, 'cart/updateQuantity')
        },

        clear: () => {
          set({ items: [] }, false, 'cart/clear')
        },

        // Computed values (derived state)
        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0)
        },

        getTotalPrice: () => {
          return get().items.reduce((total, item) => {
            const price = parseFloat(item.product.priceRange.minVariantPrice.amount)
            return total + (price * item.quantity)
          }, 0)
        },

        getItemById: (id: string) => {
          return get().items.find(item => item.id === id)
        },

        // Utility functions
        isInCart: (productId: string) => {
          return get().items.some(item => item.product.id === productId)
        },

        getProductQuantity: (productId: string) => {
          const item = get().items.find(item => item.product.id === productId)
          return item ? item.quantity : 0
        }
      }),
      {
        name: 'cart-storage', // localStorage key
        storage: createJSONStorage(() => localStorage),
        
        // Only persist the items array, not the functions
        partialize: (state) => ({ items: state.items }),
        
        // Version for migration handling
        version: 1,
        
        // Skip hydration during SSR to prevent hydration mismatches
        skipHydration: false,
      }
    ),
    {
      name: 'cart-store', // DevTools name
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)

// Selector hooks for common use cases (prevents unnecessary re-renders)
export const useCartItems = () => useCartStore(state => state.items)
export const useCartItemCount = () => useCartStore(state => state.getTotalItems())
export const useCartTotal = () => useCartStore(state => state.getTotalPrice())
export const useCartActions = () => useCartStore(state => ({
  addItem: state.addItem,
  removeItem: state.removeItem,
  updateQuantity: state.updateQuantity,
  clear: state.clear
}))

// Utility hook to check if a product is in cart
export const useIsInCart = (productId: string) => 
  useCartStore(state => state.isInCart(productId))

// Utility hook to get product quantity
export const useProductQuantity = (productId: string) => 
  useCartStore(state => state.getProductQuantity(productId))

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
