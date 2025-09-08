"use client"

import React, { useMemo, useState } from "react"
import type { ShopifyProduct } from "@/types/shopify"
import { useCartActions, useCartLoading } from "@/stores/cart-store"

export interface AdvancedAddToCartButtonProps {
  product: ShopifyProduct
  initialQty?: number
  onAdd?: (product: ShopifyProduct, qty: number) => Promise<void>
  className?: string
  disabled?: boolean
  simulateOnly?: boolean
}

/**
 * AdvancedAddToCartButton
 * - Mirrors ProductDetails behavior (qty controls, loading state)
 * - Reuses global styles: .add-to-cart-btn, .quantity-section, .divider, .quantity-btn, .quantity-display, .add-to-cart-section
 * - Works inside Link-wrapped cards by preventing navigation on internal controls
 */
export function AdvancedAddToCartButton({
  product,
  initialQty = 1,
  onAdd,
  className = "",
  disabled = false,
  simulateOnly = false,
}: AdvancedAddToCartButtonProps) {
  const [qty, setQty] = useState(Math.max(1, initialQty))
  const [localLoading, setLocalLoading] = useState(false)

  // Cart store integration as a sensible default
  const { addItem } = useCartActions()
  const cartLoading = useCartLoading()

  const isLoading = useMemo(() => localLoading || cartLoading, [localLoading, cartLoading])

  const handleQtyChange = (delta: number) => {
    setQty((q) => Math.max(1, q + delta))
  }

  const handleAdd = async () => {
    if (isLoading || disabled) return
    setLocalLoading(true)
    try {
      if (simulateOnly) {
        await new Promise((r) => setTimeout(r, 800))
      } else if (onAdd) {
        await onAdd(product, qty)
      } else {
        await addItem(product, qty)
      }
    } finally {
      setLocalLoading(false)
    }
  }

  return (
    <div className={`relative ${className}`.trim()}>
      <button
        className={`add-to-cart-btn w-full`.trim()}
        onClick={(e) => {
          e.preventDefault()
          handleAdd()
        }}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
      >
        <div className="quantity-section">
          <span
            className="quantity-btn"
            role="button"
            aria-label="Decrease quantity"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleQtyChange(-1)
            }}
          >
            −
          </span>
          <span className="quantity-display" aria-live="polite" aria-atomic>
            {qty}
          </span>
          <span
            className="quantity-btn"
            role="button"
            aria-label="Increase quantity"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleQtyChange(1)
            }}
          >
            +
          </span>
        </div>
        <div className="divider" />
        <div className="add-to-cart-section" aria-live="polite" aria-atomic>
          {isLoading ? "Adding..." : "Add to Cart"}
        </div>
      </button>
    </div>
  )
}

export default AdvancedAddToCartButton
