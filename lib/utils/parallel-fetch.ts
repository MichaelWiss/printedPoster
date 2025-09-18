/**
 * Parallel Fetch Utilities
 * 
 * Utilities for fetching multiple data sources in parallel to reduce
 * total loading time and improve user experience.
 */

import { getCachedProducts, getCachedCollections } from '@/lib/cache/data-cache';

/**
 * Fetches homepage data in parallel
 */
export async function fetchHomepageData() {
  const [products, collections] = await Promise.all([
    getCachedProducts(8), // Featured products
    getCachedCollections(6), // Featured collections
  ]);

  return {
    products,
    collections,
  };
}

/**
 * Fetches store page data in parallel
 */
export async function fetchStoreData() {
  const [products, collections] = await Promise.all([
    getCachedProducts(24), // Store products
    getCachedCollections(10), // All collections for navigation
  ]);

  return {
    products,
    collections,
  };
}

/**
 * Fetches collection page data in parallel
 */
export async function fetchCollectionData(_handle: string) {
  const [relatedCollections] = await Promise.all([
    getCachedCollections(6), // Related collections
  ]);

  return {
    collection: null, // Collection data would be fetched here
    relatedCollections,
  };
}

/**
 * Fetches product page data in parallel
 */
export async function fetchProductData(_handle: string) {
  const [relatedProducts] = await Promise.all([
    getCachedProducts(4), // Related products
  ]);

  return {
    product: null, // Product data would be fetched here
    relatedProducts,
  };
}

/**
 * Generic parallel fetch utility
 */
export async function fetchInParallel<T extends Record<string, Promise<unknown>>>(
  promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  const results = await Promise.all(Object.values(promises));
  const keys = Object.keys(promises) as (keyof T)[];
  
  return keys.reduce((acc, key, index) => {
    acc[key] = results[index] as Awaited<T[keyof T]>;
    return acc;
  }, {} as { [K in keyof T]: Awaited<T[K]> });
}
