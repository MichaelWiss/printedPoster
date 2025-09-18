/**
 * StoreProductsGrid Component
 *
 * Client component that displays products with add-to-cart functionality and loading states.
 * Handles cart operations for the store page.
 */

'use client';

import type { ShopifyProduct } from '@/types/shopify';
import { ProductGrid } from '@/components/product/ProductGrid';

interface StoreProductsGridProps {
  products: ShopifyProduct[];
}

export function StoreProductsGrid({ products }: StoreProductsGridProps) {
  return <ProductGrid products={products} />;
}
