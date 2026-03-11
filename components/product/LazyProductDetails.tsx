/**
 * LazyProductDetails Component
 * 
 * Lazy-loaded wrapper for EnhancedProductDetails with error boundary
 * and loading skeleton. EnhancedProductDetails handles feature-flag
 * based fallback to legacy ProductDetails internally.
 */

'use client';

import { Suspense, lazy } from 'react';

import type { ShopifyProduct } from '@/types/shopify';

import { ProductErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ProductDetailsSkeleton } from '@/components/ui/LazyLoadingFallback';

const EnhancedProductDetails = lazy(() => import('./EnhancedProductDetails').then(module => ({ default: module.EnhancedProductDetails })));

interface LazyProductDetailsProps {
  product: ShopifyProduct;
}

export function LazyProductDetails({ product }: LazyProductDetailsProps) {
  return (
    <ProductErrorBoundary>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <EnhancedProductDetails product={product} />
      </Suspense>
    </ProductErrorBoundary>
  );
}
