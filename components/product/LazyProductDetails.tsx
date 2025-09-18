/**
 * LazyProductDetails Component
 * 
 * Lazy-loaded version of ProductDetails with proper error boundaries
 * and loading states. Reduces initial bundle size by code splitting.
 */

'use client';

import { Suspense, lazy } from 'react';

import type { ShopifyProduct } from '@/types/shopify';

import { ProductErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ProductDetailsSkeleton } from '@/components/ui/LazyLoadingFallback';

// Lazy load the actual ProductDetails component
const ProductDetails = lazy(() => import('./ProductDetails').then(module => ({ default: module.ProductDetails })));

interface LazyProductDetailsProps {
  product: ShopifyProduct;
}

export function LazyProductDetails({ product }: LazyProductDetailsProps) {
  return (
    <ProductErrorBoundary>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails product={product} />
      </Suspense>
    </ProductErrorBoundary>
  );
}
