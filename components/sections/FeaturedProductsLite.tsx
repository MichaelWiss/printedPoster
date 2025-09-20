'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/shopify/client';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { ShopifyProduct } from '@/types/shopify';

interface FeaturedProductsLiteProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export function FeaturedProductsLite({
  title = 'Featured Products',
  subtitle = 'Discover our most popular prints and posters',
  limit = 8,
}: FeaturedProductsLiteProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(limit);
        setProducts(data);
      } catch {
        // Error fetching products
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  if (loading) {
    return (
      <section className='py-16 bg-cream-base'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='font-display text-3xl lg:text-4xl font-normal text-deep-charcoal mb-4'>
              {title}
            </h2>
            <p className='text-warm-gray max-w-2xl mx-auto'>{subtitle}</p>
          </div>
          <div className='text-center py-8'>Loading products...</div>
        </div>
      </section>
    );
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
