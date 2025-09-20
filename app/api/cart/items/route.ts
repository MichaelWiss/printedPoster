import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { cartService } from '@/lib/services/cart-service';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, variantId, title, handle, price, imageUrl, quantity } =
      body;

    const cart = await cartService.getUserCart(session.user.email);

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Add item and update activity in parallel
    const [cartItem] = await Promise.all([
      cartService.addItemToCart(cart.id, {
        productId,
        variantId,
        title,
        handle,
        price: parseFloat(price),
        imageUrl,
        quantity: parseInt(quantity),
      }),
      cartService.updateCartActivity(cart.id),
    ]);

    return NextResponse.json({ cartItem });
  } catch {
    // Error adding item to cart
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
