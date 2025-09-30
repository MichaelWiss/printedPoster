import Link from 'next/link';
import type { ShopifyProduct } from '@/types/shopify';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getCachedProductsWithRevalidation } from '@/lib/cache/data-cache';
import { getCollectionByHandle } from '@/lib/shopify/client';
import { getConfig } from '@/lib/config';
import { logError } from '@/lib/utils/error-handling';

interface FeaturedProductsLiteProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export async function FeaturedProductsLite({
  title = 'Featured Products',
  subtitle = 'Discover our most popular prints and posters',
  limit = 8,
}: FeaturedProductsLiteProps) {
  let products: ShopifyProduct[] = [];
  const config = getConfig();
  const featuredCollectionHandle =
    config.shopify.featuredCollectionHandle?.trim() || 'featured-products';

  try {
    const collection = await getCollectionByHandle(featuredCollectionHandle, {
      first: limit,
    });

    if (collection?.products?.edges?.length) {
      products = collection.products.edges.map(edge => edge.node);
    }
  } catch (error) {
    logError('FeaturedProductsLite:getCollection', error, {
      featuredCollectionHandle,
      limit,
    });
  }

  if (!products.length) {
    try {
      products = await getCachedProductsWithRevalidation(limit);
    } catch (fallbackError) {
      logError('FeaturedProductsLite:fallbackProducts', fallbackError, {
        limit,
      });
    }
  }

  return (
    <section className='py-16 bg-cream-base'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='font-display text-3xl lg:text-4xl font-normal text-deep-charcoal mb-4'>
            {title}
          </h2>
          <p className='text-warm-gray max-w-2xl mx-auto'>{subtitle}</p>
        </div>

        <ProductGrid
          products={products}
          enableScrollAnimations={true}
        />

        <div className='text-center mt-12'>
          <Link
            href='/products'
            prefetch={false}
            className='inline-block bg-sage-green text-pure-white px-8 py-3 font-medium hover:bg-sage-green/90 transition-colors duration-200'
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
