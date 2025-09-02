import React from 'react'
import { useCartItems, useCartActions, useCartLoading, useCartError, useIsAuthenticated } from '@/stores/cart-store'
import { LoadingButton } from '@/components/ui/LoadingButton'
import { CartItemSkeleton } from '@/components/ui/CartItemSkeleton'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { SyncStatus } from './SyncStatus'

export function CartDrawer() {
  const items = useCartItems()
  const { updateQuantity, removeItem, clear, clearError } = useCartActions()
  const isLoading = useCartLoading()
  const error = useCartError()
  const isAuthenticated = useIsAuthenticated()

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 0) return
    try {
      await updateQuantity(id, newQuantity)
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to update quantity:', error)
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await removeItem(id)
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to remove item:', error)
    }
  }

  const handleClearCart = async () => {
    try {
      await clear()
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to clear cart:', error)
    }
  }

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-cream-base shadow-lg p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-deep-charcoal">Your cart</h3>
        <div className="text-right">
          <SyncStatus />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4">
          <ErrorMessage
            message={error}
            onDismiss={clearError}
          />
        </div>
      )}

      <div className="mt-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-warm-gray">Cart is empty</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 border border-border-gray rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-deep-charcoal text-sm truncate">{item.product.title}</p>
                <p className="text-xs text-warm-gray mt-1">Qty: {item.quantity}</p>
                {item.product.priceRange?.minVariantPrice && (
                  <p className="text-sm font-semibold text-terracotta mt-1">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: item.product.priceRange.minVariantPrice.currencyCode || 'USD'
                    }).format(parseFloat(item.product.priceRange.minVariantPrice.amount) * item.quantity)}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 ml-3">
                {/* Quantity Controls */}
                <div className="flex items-center gap-1">
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

                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

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

                {/* Remove Button */}
                <LoadingButton
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={isLoading}
                  className="text-xs text-red-600 hover:text-red-800 underline disabled:opacity-50"
                  loading={isLoading}
                  loadingText="Removing..."
                  spinnerSize="xs"
                >
                  Remove
                </LoadingButton>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border-gray">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-deep-charcoal">Total:</span>
            <span className="font-bold text-terracotta">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(
                items.reduce((total, item) => {
                  const price = item.product.priceRange?.minVariantPrice?.amount
                  return total + (price ? parseFloat(price) * item.quantity : 0)
                }, 0)
              )}
            </span>
          </div>

          <LoadingButton
            onClick={handleClearCart}
            disabled={isLoading}
            className="w-full bg-terracotta hover:bg-terracotta/90 text-cream-base py-2 px-4 rounded font-medium transition-colors"
            loading={isLoading}
            loadingText="Clearing cart..."
          >
            Clear cart
          </LoadingButton>
        </div>
      )}
    </aside>
  )
}
