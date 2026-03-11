export interface CartStateAccessor {
  isAuthenticated: boolean;
  userId: string | null;
  items: Array<{ id: string; pendingSync?: boolean; product: { id: string; title: string; handle: string }; quantity: number }>;
  lastSynced: Date | null;
  serverCartId: string | null;
  syncWithServer: () => Promise<void>;
}

export class SyncService {
  private syncInterval: NodeJS.Timeout | null = null;
  private isOnline = true;
  private getCartState: (() => CartStateAccessor) | null = null;

  constructor() {
    this.setupOnlineOfflineListeners();
  }

  /**
   * Bind a cart state accessor so the service can read cart state
   * without importing the store directly.
   */
  bindCartState(accessor: () => CartStateAccessor) {
    this.getCartState = accessor;
  }

  // Setup online/offline event listeners
  private setupOnlineOfflineListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.startPeriodicSync();
      this.performImmediateSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.stopPeriodicSync();
    });
  }

  // Start periodic sync for authenticated users
  startPeriodicSync(_userId?: string) {
    if (!_userId || this.syncInterval) return;

    // Sync every 30 seconds when online
    this.syncInterval = setInterval(() => {
      if (this.isOnline) {
        this.performBackgroundSync(_userId);
      }
    }, 30000);
  }

  // Stop periodic sync
  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Immediate sync when coming online
  async performImmediateSync() {
    const cartState = this.getCartState?.();
    if (!cartState) return;

    if (cartState.isAuthenticated && cartState.userId) {
      try {
        await cartState.syncWithServer();
      } catch {
        // Immediate sync failed — silently continue
      }
    }
  }

  // Background sync (doesn't show loading states)
  async performBackgroundSync(_userId: string) {
    try {
      const cartState = this.getCartState?.();
      if (!cartState) return;

      if (!cartState.isAuthenticated || cartState.items.length === 0) {
        return;
      }

      // Only sync if there are pending changes
      const hasPendingChanges = cartState.items.some(item => item.pendingSync);

      if (hasPendingChanges) {
        await cartState.syncWithServer();
      }
    } catch {
      // Background sync failed — don't surface error
    }
  }

  // Force sync (for manual sync button)
  async forceSync(): Promise<boolean> {
    const cartState = this.getCartState?.();
    if (!cartState) return false;

    if (!cartState.isAuthenticated || !cartState.userId) {
      return false;
    }

    try {
      await cartState.syncWithServer();
      return true;
    } catch {
      return false;
    }
  }

  // Handle sync conflicts (server vs local)
  async resolveSyncConflict(
    localItems: Array<{
      id: string;
      product: { id: string; title: string; handle: string } & Record<
        string,
        unknown
      >;
      quantity: number;
    }>,
    serverItems: Array<import('./cart-service').CartItemData & { id?: string }>
  ) {
    // Strategy: Server wins, but preserve local additions
    const serverItemMap = new Map(
      serverItems.map(item => [item.productId, item])
    );

    const resolvedItems = localItems.map(localItem => {
      const serverItem = serverItemMap.get(localItem.product.id);
      if (serverItem) {
        return {
          ...localItem,
          quantity: Math.max(localItem.quantity, serverItem.quantity),
        };
      }
      return localItem;
    });

    // Add server-only items
    serverItems.forEach(serverItem => {
      const existsLocally = localItems.some(
        item => item.product.id === serverItem.productId
      );
      if (!existsLocally) {
        resolvedItems.push({
          id: `server-${serverItem.id ?? serverItem.productId}`,
          product: {
            id: serverItem.productId,
            title: serverItem.title,
            handle: serverItem.handle,
            priceRange: {
              minVariantPrice: {
                amount: serverItem.price.toString(),
                currencyCode: 'USD',
              },
            },
            images: serverItem.imageUrl
              ? {
                  edges: [
                    {
                      node: {
                        url: serverItem.imageUrl,
                        altText: serverItem.title,
                      },
                    },
                  ],
                }
              : { edges: [] },
            variants: {
              edges: [
                {
                  node: {
                    id: serverItem.variantId,
                    availableForSale: true,
                  },
                },
              ],
            },
          },
          quantity: serverItem.quantity,
        });
      }
    });

    return resolvedItems;
  }

  // Get sync status
  getSyncStatus() {
    const cartState = this.getCartState?.();

    return {
      isOnline: this.isOnline,
      isAuthenticated: cartState?.isAuthenticated ?? false,
      lastSynced: cartState?.lastSynced ?? null,
      hasPendingChanges: cartState?.items.some(item => item.pendingSync) ?? false,
      serverCartId: cartState?.serverCartId ?? null,
    };
  }
}

export const syncService = new SyncService();
