'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  useCartItems,
  useCartActions,
  useCartLoading,
  useCartError,
  useCartTotal,
  useIsAuthenticated
} from '@/stores/cart-store'
import { LoadingButton } from '@/components/ui/LoadingButton'
import { CartItemSkeleton } from '@/components/ui/CartItemSkeleton'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { SyncStatus } from '@/components/cart/SyncStatus'

export default function CartPage() {
  const items = useCartItems()
  const { updateQuantity, removeItem, clear, clearError } = useCartActions()
  const isLoading = useCartLoading()
  const error = useCartError()
  const total = useCartTotal()
  const isAuthenticated = useIsAuthenticated()

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 0) return
    try {
      await updateQuantity(id, newQuantity)
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await removeItem(id)
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  const handleClearCart = async () => {
    try {
      await clear()
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
  }

	return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-deep-charcoal mb-2">Your Cart</h1>
            <nav className="text-sm text-warm-gray">
              <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Cart</span>
            </nav>
          </div>
          <div className="text-right">
            <SyncStatus />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6">
          <ErrorMessage
            message={error}
            onDismiss={clearError}
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-light-gray"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">Your cart is empty</h2>
          <p className="text-warm-gray mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Link
            href="/store"
            className="inline-block bg-terracotta hover:bg-terracotta/90 text-cream-base px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white border border-border-gray rounded-lg p-6 shadow-sm">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    {item.product.images?.edges?.[0] && (
                      <div className="flex-shrink-0">
                        <Image
                          src={item.product.images.edges[0].node.url}
                          alt={item.product.images.edges[0].node.altText || item.product.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg border border-border-gray"
                        />
                      </div>
                    )}

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-deep-charcoal text-lg mb-2">
                        <Link
                          href={`/products/${item.product.handle}`}
                          className="hover:text-terracotta transition-colors"
                        >
                          {item.product.title}
                        </Link>
                      </h3>

                      {item.product.priceRange?.minVariantPrice && (
                        <p className="text-terracotta font-semibold text-lg">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: item.product.priceRange.minVariantPrice.currencyCode || 'USD'
                          }).format(parseFloat(item.product.priceRange.minVariantPrice.amount))}
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-sm text-warm-gray">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <LoadingButton
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                            className="w-8 h-8 flex items-center justify-center border border-border-gray rounded text-sm hover:bg-light-gray transition-colors"
                            loading={isLoading}
                            loadingText=""
                            spinnerSize="xs"
                          >
                            -
                          </LoadingButton>

                          <span className="w-12 text-center text-sm font-medium bg-light-gray px-3 py-1 rounded">
                            {item.quantity}
                          </span>

                          <LoadingButton
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="w-8 h-8 flex items-center justify-center border border-border-gray rounded text-sm hover:bg-light-gray transition-colors"
                            loading={isLoading}
                            loadingText=""
                            spinnerSize="xs"
                          >
                            +
                          </LoadingButton>
                        </div>

                        {/* Subtotal */}
                        <div className="ml-auto text-right">
                          <p className="text-sm text-warm-gray">Subtotal</p>
                          <p className="font-semibold text-terracotta">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(
                              (item.product.priceRange?.minVariantPrice?.amount
                                ? parseFloat(item.product.priceRange.minVariantPrice.amount)
                                : 0) * item.quantity
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="mt-4 pt-4 border-t border-border-gray">
                    <LoadingButton
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-800 text-sm underline disabled:opacity-50"
                      loading={isLoading}
                      loadingText="Removing..."
                      spinnerSize="xs"
                    >
                      Remove item
                    </LoadingButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-6">
              <LoadingButton
                onClick={handleClearCart}
                disabled={isLoading || items.length === 0}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                loading={isLoading}
                loadingText="Clearing cart..."
              >
                Clear all items
              </LoadingButton>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border-gray rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-deep-charcoal mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(total)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-border-gray pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-terracotta">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(total)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-terracotta hover:bg-terracotta/90 text-cream-base py-3 px-4 rounded-lg font-medium transition-colors">
                  Proceed to Checkout
                </button>

                <Link
                  href="/store"
                  className="block w-full text-center bg-white hover:bg-light-gray text-deep-charcoal py-3 px-4 rounded-lg border border-border-gray font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 text-xs text-warm-gray text-center">
                <p>Secure checkout powered by Shopify</p>
              </div>
            </div>
          </div>
        </div>
      )}
		</main>
  )
}
