import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { cartService } from '@/lib/services/cart-service';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In this case, only one async call, so no Promise.all needed
    const cart = await cartService.getUserCart(session.user.email);

    return NextResponse.json({ cart });
  } catch {
    // Error fetching cart
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse body and get cart in parallel
    const [body, existingCart] = await Promise.all([
      request.json(),
      cartService.getUserCart(session.user.email),
    ]);
    const { items } = body;

    let cart = existingCart;
    if (!cart) {
      cart = await cartService.createUserCart(session.user.email, items);
    }

    return NextResponse.json({ cart });
  } catch {
    // Error creating cart
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}
