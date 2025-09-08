import { cartService } from './cart-service'
import { useCartStore } from '@/stores/cart-store'
import type { CartItemData } from './cart-service'

export class SyncService {
  private syncInterval: NodeJS.Timeout | null = null
  private isOnline = true

  constructor() {
    this.setupOnlineOfflineListeners()
  }

  // Setup online/offline event listeners
  private setupOnlineOfflineListeners() {
    if (typeof window === 'undefined') return

    window.addEventListener('online', () => {
      this.isOnline = true
      this.startPeriodicSync()
      this.performImmediateSync()
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
      this.stopPeriodicSync()
    })
  }

  // Start periodic sync for authenticated users
  startPeriodicSync(userId?: string) {
    if (!userId || this.syncInterval) return

    // Sync every 30 seconds when online
    this.syncInterval = setInterval(() => {
      if (this.isOnline) {
        this.performBackgroundSync(userId)
      }
    }, 30000)
  }

  // Stop periodic sync
  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }
  }

  // Immediate sync when coming online
  async performImmediateSync() {
    const cartStore = useCartStore.getState()

    if (cartStore.isAuthenticated && cartStore.userId) {
      try {
        await cartStore.syncWithServer()
        console.log('Immediate sync completed')
      } catch (error) {
        console.error('Immediate sync failed:', error)
      }
    }
  }

  // Background sync (doesn't show loading states)
  async performBackgroundSync(userId: string) {
    try {
      const cartStore = useCartStore.getState()

      if (!cartStore.isAuthenticated || cartStore.items.length === 0) {
        return
      }

      // Only sync if there are pending changes
      const hasPendingChanges = cartStore.items.some(item => item.pendingSync)

      if (hasPendingChanges) {
        await cartStore.syncWithServer()
        console.log('Background sync completed')
      }
    } catch (error) {
      console.error('Background sync failed:', error)
      // Don't show error for background sync
    }
  }

  // Force sync (for manual sync button)
  async forceSync(): Promise<boolean> {
    const cartStore = useCartStore.getState()

    if (!cartStore.isAuthenticated || !cartStore.userId) {
      return false
    }

    try {
      await cartStore.syncWithServer()
      return true
    } catch (error) {
      console.error('Force sync failed:', error)
      return false
    }
  }

  // Handle sync conflicts (server vs local)
  async resolveSyncConflict(
    localItems: Array<{
      id: string
      product: { id: string; title: string; handle: string } & Record<string, unknown>
      quantity: number
    }>,
    serverItems: Array<import('./cart-service').CartItemData & { id?: string }>
  ) {
    // Strategy: Server wins, but preserve local additions
    const serverItemMap = new Map(serverItems.map((item) => [item.productId, item]))

    const resolvedItems = localItems.map((localItem) => {
      const serverItem = serverItemMap.get(localItem.product.id)
      if (serverItem) {
        // Merge quantities if both exist
        return {
          ...localItem,
          quantity: Math.max(localItem.quantity, serverItem.quantity),
        }
      }
      return localItem
    })

    // Add server-only items
    serverItems.forEach((serverItem) => {
      const existsLocally = localItems.some((item) => item.product.id === serverItem.productId)
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
        })
      }
    })

    return resolvedItems
  }

  // Get sync status
  getSyncStatus() {
    const cartStore = useCartStore.getState()

    return {
      isOnline: this.isOnline,
      isAuthenticated: cartStore.isAuthenticated,
      lastSynced: cartStore.lastSynced,
      hasPendingChanges: cartStore.items.some(item => item.pendingSync),
      serverCartId: cartStore.serverCartId
    }
  }
}

export const syncService = new SyncService()
