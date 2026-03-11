import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/lib/auth';
import { cartService } from '@/lib/services/cart-service';
import { z } from 'zod';

const CartItemSchema = z.object({
  productId: z.string().min(1).max(500),
  variantId: z.string().min(1).max(500),
  title: z.string().min(1).max(500),
  handle: z.string().min(1).max(500),
  price: z.coerce.number().min(0).max(999999),
  imageUrl: z.string().url().max(2000).optional().nullable(),
  quantity: z.coerce.number().int().min(1).max(1000),
});

const CartPostSchema = z.object({
  items: z.array(CartItemSchema).max(100).optional().default([]),
});

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

    const [rawBody, existingCart] = await Promise.all([
      request.json(),
      cartService.getUserCart(session.user.id),
    ]);

    const parsed = CartPostSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { items } = parsed.data;
    // Normalize nullable imageUrl to undefined for CartItemData compatibility
    const normalizedItems = items.map(item => ({
      ...item,
      imageUrl: item.imageUrl ?? undefined,
    }));

    let cart = existingCart;
    if (!cart) {
      cart = await cartService.createUserCart(session.user.id, normalizedItems);
    }

    return NextResponse.json({ cart });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}
