import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/stores/cart-store';
import { syncService } from '@/lib/services/sync-service';

export function useCartSync() {
  const { data: session } = useSession();
  const loadFromServer = useCartStore(state => state.loadFromServer);
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    // Start sync service when user logs in
    if (userId) {
      syncService.startPeriodicSync(userId);

      // Initial sync
      loadFromServer();
    } else {
      // Stop sync when user logs out
      syncService.stopPeriodicSync();
    }

    // Cleanup on unmount
    return () => {
      syncService.stopPeriodicSync();
    };
  }, [userId, loadFromServer]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      if (userId) {
        syncService.startPeriodicSync(userId);
        loadFromServer(); // Immediate sync when coming online
      }
    };

    const handleOffline = () => {
      syncService.stopPeriodicSync();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userId, loadFromServer]);

  return {
    syncStatus: syncService.getSyncStatus(),
    forceSync: syncService.forceSync.bind(syncService),
  };
}
