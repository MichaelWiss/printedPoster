/**
 * ProductGrid Component
 * 
 * Displays a responsive grid of product cards.
 * Handles the layout and spacing of multiple ProductCard components.
 */

"use client"

import type { ShopifyProduct } from '@/types/shopify'
import { ProductCard } from './ProductCard'

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
 *   columns={4}
 *   spacing="loose"
 *   onProductClick={(product) => console.log(product)}
 * />
 */
interface ProductGridProps {
  /** Array of products to display in the grid */
  products: ShopifyProduct[]

  /** Number of columns to display in the grid on large screens. Default is 3 */
  columns?: 2 | 3 | 4

  /** Spacing between grid items. Default is "normal" */
  spacing?: 'tight' | 'normal' | 'loose'

  /** Optional callback when a product card is clicked */
  onProductClick?: (product: ShopifyProduct) => void

  /** Optional CSS class name to apply to the grid container */
  className?: string
}

export function ProductGrid({ 
  products,
  columns = 3,
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

  // Define columns classes based on the columns prop
  const columnClasses = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4'
  }

  return (
    <div className={`
      grid 
      grid-cols-1 
      md:grid-cols-2 
      ${columnClasses[columns]}
      ${spacingClasses[spacing]}
      ${className}
    `.trim()}>
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onClick={() => onProductClick?.(product)}
        />
      ))}
    </div>
  )
}
