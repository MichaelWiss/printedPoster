import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/lib/auth';
import { cartService } from '@/lib/services/cart-service';

export async function GET() {
  try {
    const session = await getServerSession(getAuthOptions());

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cart = await cartService.getUserCart(session.user.id);

    return NextResponse.json({ cart });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(getAuthOptions());

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [body, existingCart] = await Promise.all([
      request.json(),
      cartService.getUserCart(session.user.id),
    ]);
    const { items } = body;

    let cart = existingCart;
    if (!cart) {
      cart = await cartService.createUserCart(session.user.id, items);
    }

    return NextResponse.json({ cart });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}
