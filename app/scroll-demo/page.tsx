/**
 * Scroll Animation Demo Page
 * Demonstrates the scroll animation effects for product cards
 */

'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getCachedProductsWithRevalidation } from '@/lib/cache/data-cache';
import type { ShopifyProduct } from '@/types/shopify';

export default function ScrollDemoPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const skeletonIds = useMemo(
    () => Array.from({ length: 8 }, (_, idx) => `scroll-skeleton-${idx}`),
    []
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getCachedProductsWithRevalidation(12);
        setProducts(data);
      } catch {
        // Error loading products
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-base flex items-center justify-center">
        <div className="text-center">
          <div className="text-warm-gray text-lg">Loading demo...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-base">
      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-sage">
        <div className="container mx-auto px-4">
          <h1 className="text-hierarchy-display mb-6">Scroll Animation Demo</h1>
          <p className="text-body-large max-w-2xl mx-auto">
            Watch as product cards smoothly slide in from the left and right as you scroll down the page.
            Each card has a staggered animation delay for a beautiful cascading effect.
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32" />

      {/* Product Grid with Scroll Animations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-hierarchy-h2 text-center mb-12">Featured Products</h2>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skeletonIds.map(token => (
                <div key={token} className="card h-80 animate-pulse">
                  <div className="bg-warm-gray/20 h-48 rounded-t-sm" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-warm-gray/20 rounded" />
                    <div className="h-3 bg-warm-gray/20 rounded w-3/4" />
                    <div className="h-6 bg-warm-gray/20 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          }>
            <ProductGrid
              products={products}
              columns={4}
              enableScrollAnimations={true}
            />
          </Suspense>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32" />

      {/* Another Product Grid */}
      <section className="py-16 bg-warm-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-hierarchy-h2 text-center mb-12">More Products</h2>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skeletonIds.map(token => (
                <div key={token} className="card h-80 animate-pulse">
                  <div className="bg-warm-gray/20 h-48 rounded-t-sm" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-warm-gray/20 rounded" />
                    <div className="h-3 bg-warm-gray/20 rounded w-3/4" />
                    <div className="h-6 bg-warm-gray/20 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          }>
            <ProductGrid
              products={products.slice(0, 8)}
              columns={4}
              enableScrollAnimations={true}
            />
          </Suspense>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-32" />
    </div>
  );
}
