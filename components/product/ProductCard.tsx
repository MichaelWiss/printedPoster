/**
 * ProductCard Component
 * 
 * Displays a single product in a card format with image, title, description, and price.
 * Links to the product detail page and includes hover effects.
 */

import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/types/shopify'

// Define the props interface for type safety
interface ProductCardProps {
  /** The product data to display */
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  // Extract the first image from the product's images array
  const firstImage = product.images?.edges[0]?.node
  // Get the price information
  const price = product.priceRange?.minVariantPrice

  return (
    // Link wrapper makes the entire card clickable
    <Link 
      href={`/products/${product.handle}`}
      className="group" // group class enables hover effects on child elements
    >
      {/* Card container with hover effects */}
      <div className="border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
        {/* Product image section */}
        {firstImage && (
          <div className="relative h-64">
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title} // Fallback to title if no alt text
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {/* Product information section */}
        <div className="p-4">
          {/* Product title */}
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          {/* Product description with 2-line clamp */}
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          {/* Price section */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">
              {price ? (
                // Format price according to locale and currency
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currencyCode || 'USD'
                }).format(parseFloat(price.amount))
              ) : (
                'Price not available'
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
