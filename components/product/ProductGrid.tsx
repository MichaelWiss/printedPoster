/**
 * ProductGrid Component
 * 
 * Displays a responsive grid of product cards.
 * Handles the layout and spacing of multiple ProductCard components.
 */

import type { ShopifyProduct } from '@/types/shopify'
import { ProductCard } from './ProductCard'

// Define props interface for type safety
interface ProductGridProps {
  /** Array of products to display in the grid */
  products: ShopifyProduct[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    // Responsive grid layout:
    // - 1 column on mobile
    // - 2 columns on medium screens
    // - 3 columns on large screens
    // gap-6 provides consistent spacing between grid items
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Map through products array and render a ProductCard for each */}
      {products.map(product => (
        <ProductCard 
          key={product.id} // Unique key for React's reconciliation
          product={product}
        />
      ))}
    </div>
  )
}
