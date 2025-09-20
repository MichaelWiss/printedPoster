'use client';

import { useEffect, useState } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getProducts } from '@/lib/shopify/client';
import type { ShopifyProduct } from '@/types/shopify';

export default function ShopPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(12);
        setProducts(data);
      } catch {
        // Error fetching products
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Our Products</h1>
        <div className='text-center py-8'>Loading products...</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Our Products</h1>
      <ProductGrid 
        products={products} 
        enableScrollAnimations={true}
      />
    </div>
  );
}
