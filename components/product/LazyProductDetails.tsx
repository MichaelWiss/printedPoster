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
import { FEATURE_FLAGS } from '@/lib/feature-flags';

// Lazy load the appropriate ProductDetails component based on feature flags
const ProductDetails = lazy(() => import('./ProductDetails').then(module => ({ default: module.ProductDetails })));
const EnhancedProductDetails = lazy(() => import('./EnhancedProductDetails').then(module => ({ default: module.EnhancedProductDetails })));

interface LazyProductDetailsProps {
  product: ShopifyProduct;
}

export function LazyProductDetails({ product }: LazyProductDetailsProps) {
  // Use enhanced product details if feature flag is enabled
  const useEnhanced = FEATURE_FLAGS.ENHANCED_PRODUCT_TYPES;
  
  return (
    <ProductErrorBoundary>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        {useEnhanced ? (
          <EnhancedProductDetails product={product} />
        ) : (
          <ProductDetails product={product} />
        )}
      </Suspense>
    </ProductErrorBoundary>
  );
}
