'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/shopify/client'
import { ProductCardDemo } from '@/components/product/ProductCardDemo'
import type { ShopifyProduct } from '@/types/shopify'

export default function ProductCardDemoPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts(4)
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleAddToCart = async (product: ShopifyProduct, quantity: number) => {
    // Simulate adding to cart with delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(`Added ${quantity} x "${product.title}" to cart`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-display font-semibold text-deep-charcoal mb-4">
            Product Card Demo
          </h1>
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-semibold text-deep-charcoal mb-4">
          Product Card Demo
        </h1>
        <p className="text-lg text-warm-gray max-w-2xl mx-auto">
          This demo showcases a standard product card design with both &ldquo;View Details&rdquo; and &ldquo;Add to Cart&rdquo; functionality.
          The card provides clear call-to-actions and an intuitive user experience.
        </p>
      </div>

      {/* Features List */}
      <div className="bg-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-xl font-medium text-deep-charcoal mb-4">Features Demonstrated:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-sage-green rounded-full"></div>
            <span className="text-sm text-deep-charcoal">Quantity selector with +/- buttons</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-sage-green rounded-full"></div>
            <span className="text-sm text-deep-charcoal">Add to Cart with loading state</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-sage-green rounded-full"></div>
            <span className="text-sm text-deep-charcoal">View Details link to product page</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-sage-green rounded-full"></div>
            <span className="text-sm text-deep-charcoal">Hover effects and smooth transitions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-sage-green rounded-full"></div>
            <span className="text-sm text-deep-charcoal">Responsive design for all devices</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-sage-green rounded-full"></div>
            <span className="text-sm text-deep-charcoal">Clean, accessible button hierarchy</span>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCardDemo
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-warm-gray text-lg mb-2">No products found</div>
          <div className="text-warm-gray text-sm">Please check back later for new arrivals</div>
        </div>
      )}

      {/* Usage Notes */}
      <div className="mt-12 bg-white border border-sage-green/20 rounded-lg p-6">
        <h2 className="text-xl font-medium text-deep-charcoal mb-4">Implementation Notes:</h2>
        <div className="space-y-3 text-sm text-warm-gray">
          <p>
            <strong>Primary Action:</strong> &ldquo;Add to Cart&rdquo; is the primary CTA with terracotta background
          </p>
          <p>
            <strong>Secondary Action:</strong> &ldquo;View Details&rdquo; uses outline style for less prominence
          </p>
          <p>
            <strong>Quantity Control:</strong> Simple +/- buttons for quick quantity adjustments
          </p>
          <p>
            <strong>Loading States:</strong> Visual feedback during cart operations
          </p>
          <p>
            <strong>Accessibility:</strong> Proper ARIA labels and keyboard navigation support
          </p>
        </div>
      </div>
    </div>
  )
}
