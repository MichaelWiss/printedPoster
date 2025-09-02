import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/stores/cart-store'
import { syncService } from '@/lib/services/sync-service'

export function useCartSync() {
  const { data: session } = useSession()
  const cartStore = useCartStore()

  useEffect(() => {
    // Start sync service when user logs in
    if (session?.user?.id) {
      syncService.startPeriodicSync(session.user.id)

      // Initial sync
      cartStore.loadFromServer()
    } else {
      // Stop sync when user logs out
      syncService.stopPeriodicSync()
    }

    // Cleanup on unmount
    return () => {
      syncService.stopPeriodicSync()
    }
  }, [session?.user?.id])

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      if (session?.user?.id) {
        syncService.startPeriodicSync(session.user.id)
        cartStore.loadFromServer() // Immediate sync when coming online
      }
    }

    const handleOffline = () => {
      syncService.stopPeriodicSync()
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [session?.user?.id])

  return {
    syncStatus: syncService.getSyncStatus(),
    forceSync: syncService.forceSync.bind(syncService)
  }
}
