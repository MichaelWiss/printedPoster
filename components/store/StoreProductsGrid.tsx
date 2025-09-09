/**
 * StoreProductsGrid Component
 *
 * Client component that displays products with add-to-cart functionality and loading states.
 * Handles cart operations for the store page.
 */

"use client"

import type { ShopifyProduct } from '@/types/shopify'
import { ProductCard } from '@/components/product/ProductCard'
import ViewportFadeIn from '@/components/ui/ViewportFadeIn'

interface StoreProductsGridProps {
  products: ShopifyProduct[]
}

export function StoreProductsGrid({ products }: StoreProductsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((product, idx) => (
        <ViewportFadeIn key={product.id} delayMs={(idx % 12) * 40}>
          <ProductCard product={product} />
        </ViewportFadeIn>
      ))}
    </div>
  )
}
