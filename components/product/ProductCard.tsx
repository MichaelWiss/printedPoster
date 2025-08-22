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
  /** Optional click handler forwarded from the parent */
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  // Extract the first image from the product's images array
  const firstImage = product.images?.edges[0]?.node
  // Get the price information
  const price = product.priceRange?.minVariantPrice

  return (
    // Link wrapper makes the entire card clickable
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onClick={onClick}
    >
      {/* Card container with refined styles */}
      <div className="card overflow-hidden transition-transform hover:scale-[1.01]">
        {/* Product image section */}
        {firstImage && (
          <div className="relative h-72 w-full bg-gray-50">
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {/* Product information section */}
        <div className="p-4">
          <h2 className="text-lg font-medium mb-2">{product.title}</h2>
          <p className="text-muted text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold">
              {price ? (
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currencyCode || 'USD'
                }).format(parseFloat(price.amount))
              ) : (
                '—'
              )}
            </p>
            <span className="text-sm text-muted">Free shipping</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
