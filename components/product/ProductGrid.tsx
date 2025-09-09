/**
 * ProductGrid Component
 * 
 * Displays a responsive grid of product cards with enhanced responsive breakpoints.
 * Layout: 2 cols (mobile) → 3 cols (tablet) → 3-5 cols (desktop/ultra-wide)
 * Handles the layout, spacing, and empty states of ProductCard components.
 */

"use client"

import type { ShopifyProduct } from '@/types/shopify'
import { ProductCard } from './ProductCard'
import ViewportFadeIn from '@/components/ui/ViewportFadeIn'

/**
 * Props interface for the ProductGrid component
 * 
 * @interface ProductGridProps
 * @example
 * // Basic usage
 * <ProductGrid products={products} />
 * 
 * // With optional props
 * <ProductGrid 
 *   products={products}
 *   columns={5}
 *   spacing="loose"
 *   onProductClick={(product) => console.log(product)}
 * />
 */
interface ProductGridProps {
  /** Array of products to display in the grid */
  products: ShopifyProduct[]

  /** Number of columns to display in the grid on large screens. Default is 4 */
  columns?: 3 | 4 | 5

  /** Spacing between grid items. Default is "normal" */
  spacing?: 'tight' | 'normal' | 'loose'

  /** Optional callback when a product card is clicked */
  onProductClick?: (product: ShopifyProduct) => void

  /** Optional CSS class name to apply to the grid container */
  className?: string
}

export function ProductGrid({ 
  products,
  columns = 4,
  spacing = 'normal',
  onProductClick,
  className = ''
}: ProductGridProps) {
  // Define spacing classes based on the spacing prop
  const spacingClasses = {
    tight: 'gap-4',
    normal: 'gap-6',
    loose: 'gap-8'
  }

  // Define columns classes based on the columns prop with enhanced responsive breakpoints
  const columnClasses = {
    3: 'lg:grid-cols-3 xl:grid-cols-3',
    4: 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4',
    5: 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
  }

  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-warm-gray text-lg mb-2">No products found</div>
        <div className="text-warm-gray text-sm">Please check back later for new arrivals</div>
      </div>
    )
  }

  return (
    <div className={`
      grid 
      grid-cols-2
      sm:grid-cols-3
      ${columnClasses[columns]}
      ${spacingClasses[spacing]}
      w-full
      ${className}
    `.trim()}>
      {products.map((product, idx) => (
        <ViewportFadeIn key={product.id} delayMs={(idx % 12) * 40}>
          <ProductCard 
            product={product}
            onClick={() => onProductClick?.(product)}
          />
        </ViewportFadeIn>
      ))}
    </div>
  )
}
