/**
 * ProductCard Component
 *
 * Displays a single product in a card format with image, title, description, and price.
 * Links to the product detail page and includes hover effects.
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { ShopifyProduct } from '@/types/shopify'

// Define the props interface for type safety
interface ProductCardProps {
  /** The product data to display */
  product: ShopifyProduct
  /** Optional click handler forwarded from the parent */
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)

  // Extract the first image from the product's images array
  const firstImage = product.images?.edges[0]?.node
  // Get the price information
  const price = product.priceRange?.minVariantPrice

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  return (
    // Link wrapper makes the entire card clickable
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onClick={onClick}
    >
      {/* Card container with refined styles */}
      <div className="bg-white border border-border-gray rounded-sm overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5 hover:border-sage-green group">
        {/* Product image section */}
        {firstImage && (
          <div className="relative bg-light-gray aspect-square overflow-hidden">
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {/* Product information section */}
        <div className="p-4">
          <h2 className="text-lg font-medium mb-2">{product.title}</h2>
          <p className="text-warm-gray text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
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
            <span className="text-sm text-warm-gray">Free shipping</span>
          </div>

          {/* Advanced Add to Cart Button */}
          <div className="relative">
            <button className="add-to-cart-btn w-full" onClick={(e) => e.preventDefault()}>
              <div className="quantity-section">
                <span
                  className="quantity-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleQuantityChange(-1)
                  }}
                >−</span>
                <span className="quantity-display">{quantity}</span>
                <span
                  className="quantity-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleQuantityChange(1)
                  }}
                >+</span>
              </div>
              <div className="divider"></div>
              <div className="add-to-cart-section">
                Add to Cart
              </div>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
