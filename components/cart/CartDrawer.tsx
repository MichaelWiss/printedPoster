import React from 'react'
import { useCart } from '@/context/CartContext'

export function CartDrawer() {
  const { state, actions } = useCart()

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4">
      <h3 className="text-lg font-semibold">Your cart</h3>
      <div className="mt-4 space-y-4">
        {state.items.length === 0 ? (
          <p className="text-sm text-gray-500">Cart is empty</p>
        ) : (
          state.items.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
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
        <button onClick={() => actions.clear()} className="w-full bg-blue-600 text-white py-2 rounded">Clear cart</button>
      </div>
    </aside>
  )
}
