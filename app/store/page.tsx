// Incremental Static Regeneration for store page
export const revalidate = 300; // 5 minutes - longer cache for better performance

/**
 * Store Page Component
 *
 * Main store page that displays a grid of products fetched from Shopify.
 * Uses Server Components with caching for optimal performance.
 */

import { getCachedProductsWithRevalidation } from '@/lib/cache/data-cache';
import { StoreProductsGrid } from '@/components/store/StoreProductsGrid';

export default async function StorePage() {
  try {
    // Use cached products with revalidation for better performance
    const products = await getCachedProductsWithRevalidation(12);

    // Validate the response structure
    if (!products || products.length === 0) {
      throw new Error('No products found in the response');
    }

    return (
      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-deep-charcoal mb-2'>
            Our Products
          </h1>
          <p className='text-warm-gray'>
            Discover our collection of high-quality printed posters
          </p>
        </div>

        <StoreProductsGrid products={products} />
      </main>
    );
  } catch (error) {
    // Error loading products
    return (
      <main className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Our Products</h1>
        <div className='bg-red-50 border border-red-200 p-4 rounded'>
          <p className='text-red-600'>
            Error loading products. Please try again later.
          </p>
          <pre className='mt-2 text-sm text-red-500'>
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </div>
      </main>
    );
  }
}
