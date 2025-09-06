import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { cartService } from '@/lib/services/cart-service'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cart = await cartService.getUserCart(session.user.email)

    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items } = body

    let cart = await cartService.getUserCart(session.user.email)

    if (!cart) {
      cart = await cartService.createUserCart(session.user.email, items)
    }

    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Error creating cart:', error)
    return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 })
  }
}
