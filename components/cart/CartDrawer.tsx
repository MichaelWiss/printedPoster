import React from 'react'
import { useCartItems, useCartActions } from '@/stores/cart-store'

export function CartDrawer() {
  const items = useCartItems()
  const { updateQuantity, removeItem, clear } = useCartActions()

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-cream-base shadow-lg p-4">
      <h3 className="text-lg font-semibold text-deep-charcoal">Your cart</h3>
      <div className="mt-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-warm-gray">Cart is empty</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-deep-charcoal">{item.product.title}</p>
                <p className="text-sm text-warm-gray">Qty: {item.quantity}</p>
              </div>
              <div className="space-y-1">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                <button onClick={() => removeItem(item.id)} className="text-sm text-red-500">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-6">
        <button onClick={() => clear()} className="w-full bg-terracotta text-cream-base py-2 rounded">Clear cart</button>
      </div>
    </aside>
  )
}
