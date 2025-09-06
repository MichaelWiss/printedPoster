import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { cartService } from '@/lib/services/cart-service'
import { prisma } from '@/lib/db/prisma'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { quantity } = body

    const cartItem = await cartService.updateCartItem(id, parseInt(quantity))

    // Find the cart and update its activity
    const cart = await prisma.cart.findFirst({
      where: { items: { some: { id } } }
    })

    if (cart) {
      await cartService.updateCartActivity(cart.id)
    }

    return NextResponse.json({ cartItem })
  } catch (error) {
    console.error('Error updating cart item:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the cart before deleting the item
    const cart = await prisma.cart.findFirst({
      where: { items: { some: { id } } }
    })

    await cartService.removeCartItem(id)

    // Update cart activity if cart exists
    if (cart) {
      await cartService.updateCartActivity(cart.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing cart item:', error)
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
  }
}
