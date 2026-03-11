import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/lib/auth';
import { cartService } from '@/lib/services/cart-service';
import { getPrismaClient } from '@/lib/db/prisma';
import { z } from 'zod';

const UpdateQuantitySchema = z.object({
  quantity: z.coerce.number().int().min(0).max(1000),
});

async function verifyCartOwnership(cartItemId: string, userId: string) {
  const prisma = getPrismaClient();
  const cart = await prisma.cart.findFirst({
    where: { items: { some: { id: cartItemId } }, userId },
  });
  return cart;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(getAuthOptions());

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = UpdateQuantitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const cart = await verifyCartOwnership(id, session.user.id);
    if (!cart) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const cartItem = await cartService.updateCartItem(id, parsed.data.quantity);
    await cartService.updateCartActivity(cart.id);

    return NextResponse.json({ cartItem });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(getAuthOptions());

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cart = await verifyCartOwnership(id, session.user.id);
    if (!cart) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await cartService.removeCartItem(id);
    await cartService.updateCartActivity(cart.id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to remove item' },
      { status: 500 }
    );
  }
}
