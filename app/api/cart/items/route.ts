import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { cartService } from '@/lib/services/cart-service'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, variantId, title, handle, price, imageUrl, quantity } = body

    const cart = await cartService.getUserCart(session.user.id)

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const cartItem = await cartService.addItemToCart(cart.id, {
      productId,
      variantId,
      title,
      handle,
      price: parseFloat(price),
      imageUrl,
      quantity: parseInt(quantity)
    })

    // Update cart activity
    await cartService.updateCartActivity(cart.id)

    return NextResponse.json({ cartItem })
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}
