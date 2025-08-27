/**
 * CartCounter Component
 * 
 * Client-side cart item counter that displays the total number of items in the cart.
 * Uses Zustand store with selective subscription to prevent unnecessary re-renders.
 * 
 * Features:
 * - Selective subscription (only re-renders when item count changes)
 * - Optimistic updates
 * - Handles empty cart state
 * - Accessible with proper ARIA labels
 * 
 * @example
 * <CartCounter />
 */

'use client'

import { useCartItemCount } from '@/stores/cart-store'

export function CartCounter() {
  const itemCount = useCartItemCount()

  if (itemCount === 0) {
    return null // Don't show badge when cart is empty
  }

  return (
    <span 
      className="absolute -top-2 -right-2 bg-terracotta text-pure-white text-caption font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs"
      aria-label={`${itemCount} items in cart`}
    >
      {itemCount > 99 ? '99+' : itemCount}
    </span>
  )
}
