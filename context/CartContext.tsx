"use client"

import React from 'react'
import type { ShopifyProduct } from '@/types/shopify'

export interface CartLineItem {
  id: string
  product: ShopifyProduct
  quantity: number
}

export interface CartState {
  items: CartLineItem[]
}

export interface CartActions {
  addItem: (product: ShopifyProduct, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
}

export const CartContext = React.createContext<{
  state: CartState
  actions: CartActions
} | null>(null)

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartLineItem[]>([])

  const addItem = (product: ShopifyProduct, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, { id: `${product.id}:${Date.now()}`, product, quantity }]
    })
  }

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQuantity = (id: string, quantity: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))

  const clear = () => setItems([])

  const state: CartState = { items }
  const actions: CartActions = { addItem, removeItem, updateQuantity, clear }

  return (
    <CartContext.Provider value={{ state, actions }}>
      {children}
    </CartContext.Provider>
  )
}
