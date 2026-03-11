import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/lib/auth';
import { cartService } from '@/lib/services/cart-service';
import { z } from 'zod';

const AddItemSchema = z.object({
  productId: z.string().min(1).max(500),
  variantId: z.string().min(1).max(500),
  title: z.string().min(1).max(500),
  handle: z.string().min(1).max(500),
  price: z.union([z.number(), z.string()]).pipe(z.coerce.number().min(0).max(999999)),
  imageUrl: z.string().url().max(2000).optional().nullable(),
  quantity: z.union([z.number(), z.string()]).pipe(z.coerce.number().int().min(1).max(1000)),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(getAuthOptions());

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = AddItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productId, variantId, title, handle, price, imageUrl, quantity } = parsed.data;

    const cart = await cartService.getUserCart(session.user.id);

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const [cartItem] = await Promise.all([
      cartService.addItemToCart(cart.id, {
        productId,
        variantId,
        title,
        handle,
        price,
        imageUrl: imageUrl ?? undefined,
        quantity,
      }),
      cartService.updateCartActivity(cart.id),
    ]);

    return NextResponse.json({ cartItem });
  } catch {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
