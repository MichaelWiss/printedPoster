/**
 * LazyCollectionFilters Component
 * 
 * Lazy-loaded version of CollectionFilters with proper error boundaries
 * and loading states. Reduces initial bundle size by code splitting.
 */

'use client';

import { Suspense, lazy } from 'react';

import type { CollectionFiltersProps } from './CollectionFilters';

import { CollectionErrorBoundary } from '@/components/ui/ErrorBoundary';
import { LazyLoadingFallback } from '@/components/ui/LazyLoadingFallback';

// Lazy load the actual CollectionFilters component
const CollectionFilters = lazy(() => import('./CollectionFilters').then(module => ({ default: module.CollectionFilters })));

export function LazyCollectionFilters(props: CollectionFiltersProps) {
  return (
    <CollectionErrorBoundary>
      <Suspense fallback={<LazyLoadingFallback message="Loading filters..." />}>
        <CollectionFilters {...props} />
      </Suspense>
    </CollectionErrorBoundary>
  );
}
