/**
 * Data Cache Utilities
 * 
 * Implements React cache and Next.js caching strategies for optimal performance.
 * Reduces API calls and improves page load times.
 */

import { cache } from 'react';
import { unstable_cache } from 'next/cache';

import { getProducts, getProductByHandle, getCollections } from '@/lib/shopify/client';

// React cache for request-scoped caching (same request)
export const getCachedProducts = cache(async (first: number = 12) => {
  return getProducts(first);
});

export const getCachedProduct = cache(async (handle: string) => {
  return getProductByHandle(handle);
});

export const getCachedCollections = cache(async (first: number = 10) => {
  return getCollections(first);
});

// Next.js unstable_cache for persistent caching across requests
export const getCachedProductsWithRevalidation = unstable_cache(
  async (first: number) => {
    return getProducts(first);
  },
  ['products'],
  {
    revalidate: 300, // 5 minutes
    tags: ['products'],
  }
);

export const getCachedProductWithRevalidation = unstable_cache(
  async (handle: string) => {
    return getProductByHandle(handle);
  },
  ['product'],
  {
    revalidate: 600, // 10 minutes
    tags: ['products', 'product'],
  }
);

export const getCachedCollectionsWithRevalidation = unstable_cache(
  async (first: number) => {
    return getCollections(first);
  },
  ['collections'],
  {
    revalidate: 900, // 15 minutes
    tags: ['collections'],
  }
);

// Cache invalidation utilities
export const revalidateProducts = () => {
  // This would be called from webhooks or admin actions
  // For now, we rely on time-based revalidation
};

export const revalidateProduct = (_handle: string) => {
  // This would be called when a specific product is updated
  // For now, we rely on time-based revalidation
};
