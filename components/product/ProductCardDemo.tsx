/**
 * ProductCardDemo Component
 *
 * Demo component showcasing a standard product card with both View Details and Add to Cart functionality.
 * This demonstrates a clean, user-friendly card design with clear call-to-action buttons.
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { ShopifyProduct } from '@/types/shopify'

interface ProductCardDemoProps {
  product: ShopifyProduct
  onAddToCart?: (product: ShopifyProduct, quantity: number) => void
}

export function ProductCardDemo({ product, onAddToCart }: ProductCardDemoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const firstImage = product.images?.edges[0]?.node
  const price = product.priceRange?.minVariantPrice

  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAdding(true)
      try {
        await onAddToCart(product, quantity)
        // Reset quantity after successful add
        setQuantity(1)
      } catch (error) {
        console.error('Failed to add to cart:', error)
      } finally {
        setIsAdding(false)
      }
    }
  }

  return (
    <div className="group bg-white border border-sage-green/20 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-sage-green hover:-translate-y-1">

      {/* Product Image */}
      <div className="relative bg-light-gray aspect-square overflow-hidden">
        {firstImage && (
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Quick Add Overlay - appears on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-6">

        {/* Title */}
        <h3 className="text-lg font-medium text-deep-charcoal mb-2 line-clamp-2 group-hover:text-sage-green transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-warm-gray text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold text-deep-charcoal">
            {price ? (
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: price.currencyCode || 'USD'
              }).format(parseFloat(price.amount))
            ) : (
              'Price on request'
            )}
          </p>
          <span className="text-xs text-warm-gray bg-light-gray px-2 py-1 rounded">
            Free shipping
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center border border-sage-green/30 rounded hover:bg-sage-green/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-sage-green/30 rounded hover:bg-sage-green/10 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-terracotta hover:bg-terracotta/90 text-cream-base py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-cream-base border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <span>Add to Cart</span>
                <span className="text-lg">🛒</span>
              </>
            )}
          </button>

          {/* View Details Button */}
          <Link
            href={`/products/${product.handle}`}
            className="w-full bg-transparent border border-sage-green text-sage-green hover:bg-sage-green hover:text-cream-base py-3 px-4 rounded-lg font-medium transition-all duration-200 text-center"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  )
}
