/**
 * CartCounter Component
 *
 * Client-side cart item counter that displays the total number of items in the cart.
 * Uses Zustand store with selective subscription to prevent unnecessary re-renders.
 * Shows different states based on authentication and sync status.
 *
 * Features:
 * - Selective subscription (only re-renders when item count changes)
 * - Authentication-aware display
 * - Loading state support
 * - Sync status indicators
 * - Accessible with proper ARIA labels
 *
 * @example
 * <CartCounter />
 */

'use client';

import { useEffect, useState } from 'react';
import {
  useCartItemCount,
  useIsAuthenticated,
  useCartLoading,
} from '@/stores/cart-store';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function CartCounter() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartItemCount();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useCartLoading();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (itemCount === 0 && !isLoading && mounted) {
    return null; // Don't show badge when cart is empty
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <span
      className='absolute -top-2 -right-2 bg-terracotta text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse'
      aria-label={`${itemCount} items in cart${isAuthenticated ? ' (synced)' : ' (local only)'}`}
      suppressHydrationWarning
    >
      {isLoading ? (
        <LoadingSpinner size='xs' color='white' />
      ) : itemCount > 99 ? (
        '99+'
      ) : (
        itemCount
      )}
    </span>
  );
}
