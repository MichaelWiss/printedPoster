'use client';

import { useEffect, useState } from 'react';
import { useIsAuthenticated, useCartError } from '@/stores/cart-store';
import { syncService } from '@/lib/services/sync-service';

export function SyncStatus() {
  const isAuthenticated = useIsAuthenticated();
  const error = useCartError();
  const [syncStatus, setSyncStatus] = useState(() =>
    syncService.getSyncStatus()
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update sync status periodically
    const interval = setInterval(() => {
      setSyncStatus(syncService.getSyncStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className='text-xs text-warm-gray'>💾 Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className='text-xs text-warm-gray'>💾 Cart saved locally</div>;
  }

  if (error) {
    return (
      <div className='text-xs text-red-600'>
        ⚠️ Sync error - working offline
      </div>
    );
  }

  if (!syncStatus.isOnline) {
    return (
      <div className='text-xs text-orange-600'>
        📶 Offline - changes will sync when online
      </div>
    );
  }

  if (syncStatus.hasPendingChanges) {
    return <div className='text-xs text-blue-600'>🔄 Syncing changes...</div>;
  }

  if (syncStatus.lastSynced) {
    const timeAgo = Math.floor(
      (Date.now() - syncStatus.lastSynced.getTime()) / 1000 / 60
    );
    return (
      <div className='text-xs text-sage-green'>
        ✅ Synced {timeAgo < 1 ? 'just now' : `${timeAgo}m ago`}
      </div>
    );
  }

  return <div className='text-xs text-sage-green'>✅ Connected</div>;
}
