/**
 * StoreProductsGrid Component
 *
 * Client component that displays products with add-to-cart functionality and loading states.
 * Handles cart operations for the store page.
 */

"use client"

import type { ShopifyProduct } from '@/types/shopify'
import { ProductCard } from '@/components/product/ProductCard'

interface StoreProductsGridProps {
  products: ShopifyProduct[]
}

export function StoreProductsGrid({ products }: StoreProductsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
