/**
 * StoreProductsGrid Component
 *
 * Client component that displays products with add-to-cart functionality and loading states.
 * Handles cart operations for the store page.
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { ShopifyProduct } from '@/types/shopify'
import { useCartActions, useCartLoading, useIsAuthenticated } from '@/stores/cart-store'
import { LoadingButton } from '@/components/ui/LoadingButton'

interface StoreProductsGridProps {
  products: ShopifyProduct[]
}

export function StoreProductsGrid({ products }: StoreProductsGridProps) {
  const { addItem } = useCartActions()
  const isLoading = useCartLoading()
  const isAuthenticated = useIsAuthenticated()
  const [addingProductId, setAddingProductId] = useState<string | null>(null)

  const handleAddToCart = async (product: ShopifyProduct) => {
    try {
      console.log('StoreProductsGrid: Adding item to cart', product.title)
      setAddingProductId(product.id)
      await addItem(product, 1)
      console.log('StoreProductsGrid: Item added successfully')
    } catch (error) {
      console.error('StoreProductsGrid: Failed to add item to cart:', error)
    } finally {
      setAddingProductId(null)
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((product) => (
        <div key={product.id} className="bg-white border border-border-gray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Product Image */}
          {product.images?.edges?.[0] && (
            <Link href={`/products/${product.handle}`}>
              <div className="relative h-64 bg-light-gray overflow-hidden group">
                <Image
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
          )}

          {/* Product Info */}
          <div className="p-4">
            <Link href={`/products/${product.handle}`}>
              <h2 className="text-lg font-semibold text-deep-charcoal mb-2 hover:text-terracotta transition-colors line-clamp-2">
                {product.title}
              </h2>
            </Link>

            <p className="text-warm-gray text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-bold text-terracotta">
                {product.priceRange?.minVariantPrice ? (
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: product.priceRange.minVariantPrice.currencyCode || 'USD'
                  }).format(parseFloat(product.priceRange.minVariantPrice.amount))
                ) : (
                  'Price not available'
                )}
              </p>
              <span className="text-xs text-warm-gray bg-cream-base px-2 py-1 rounded">
                Free shipping
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link
                href={`/products/${product.handle}`}
                className="flex-1 text-center bg-white hover:bg-light-gray text-deep-charcoal py-2 px-4 rounded border border-border-gray font-medium transition-colors"
              >
                View Details
              </Link>

              <LoadingButton
                onClick={() => handleAddToCart(product)}
                disabled={isLoading || addingProductId === product.id}
                className="flex-1 bg-terracotta hover:bg-terracotta/90 text-cream-base py-2 px-4 rounded font-medium transition-colors"
                loading={addingProductId === product.id}
                loadingText="Adding..."
                spinnerSize="xs"
              >
                Add to Cart
              </LoadingButton>
            </div>

            {isAuthenticated && (
              <p className="text-xs text-sage-green mt-2 text-center">
                ✓ Synced across devices
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
