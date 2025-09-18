/**
 * LazyCartDrawer Component
 * 
 * Lazy-loaded version of CartDrawer with proper error boundaries
 * and loading states. Reduces initial bundle size by code splitting.
 */

'use client';

import { Suspense, lazy } from 'react';

import { CartErrorBoundary } from '@/components/ui/ErrorBoundary';
import { CartDrawerSkeleton } from '@/components/ui/LazyLoadingFallback';

// Lazy load the actual CartDrawer component
const CartDrawer = lazy(() => import('./CartDrawer').then(module => ({ default: module.CartDrawer })));

export function LazyCartDrawer() {
  return (
    <CartErrorBoundary>
      <Suspense fallback={<CartDrawerSkeleton />}>
        <CartDrawer />
      </Suspense>
    </CartErrorBoundary>
  );
}
