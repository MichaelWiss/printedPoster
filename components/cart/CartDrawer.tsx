import React from 'react'
import { useCart } from '@/context/CartContext'

export function CartDrawer() {
  const { state, actions } = useCart()

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-cream-base shadow-lg p-4">
      <h3 className="text-lg font-semibold text-deep-charcoal">Your cart</h3>
      <div className="mt-4 space-y-4">
        {state.items.length === 0 ? (
          <p className="text-sm text-warm-gray">Cart is empty</p>
        ) : (
          state.items.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-deep-charcoal">{item.product.title}</p>
                <p className="text-sm text-warm-gray">Qty: {item.quantity}</p>
              </div>
              <div className="space-y-1">
                <button onClick={() => actions.updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                <button onClick={() => actions.updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                <button onClick={() => actions.removeItem(item.id)} className="text-sm text-red-500">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-6">
        <button onClick={() => actions.clear()} className="w-full bg-terracotta text-cream-base py-2 rounded">Clear cart</button>
      </div>
    </aside>
  )
}
