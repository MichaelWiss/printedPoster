import { prisma } from '../db/prisma';

export interface CartItemData {
  productId: string;
  variantId: string;
  title: string;
  handle: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export class CartService {
  // Create cart for authenticated user
  async createUserCart(userId: string, items: CartItemData[] = []) {
    return prisma.cart.create({
      data: {
        userId,
        items: {
          create: items,
        },
      },
      include: { items: true },
    });
  }

  // Get active cart for user
  async getUserCart(userId: string) {
    return prisma.cart.findFirst({
      where: {
        userId,
        isActive: true,
      },
      include: { items: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Create guest cart with session tracking
  async createGuestCart(sessionId: string, items: CartItemData[] = []) {
    return prisma.cart.create({
      data: {
        userId: sessionId, // Temporary userId for guests
        sessionId,
        isActive: true,
        items: {
          create: items,
        },
      },
      include: { items: true },
    });
  }

  // Migrate guest cart to authenticated user
  async migrateGuestCart(sessionId: string, userId: string) {
    const guestCart = await prisma.cart.findFirst({
      where: { sessionId, isActive: true },
      include: { items: true },
    });

    if (!guestCart) return null;

    // Create new cart for authenticated user
    const userCart = await this.createUserCart(
      userId,
      guestCart.items.map(item => ({
        productId: item.productId,
        variantId: item.variantId,
        title: item.title,
        handle: item.handle,
        price: item.price,
        imageUrl: item.imageUrl || undefined,
        quantity: item.quantity,
      }))
    );

    // Deactivate guest cart
    await prisma.cart.update({
      where: { id: guestCart.id },
      data: { isActive: false },
    });

    return userCart;
  }

  // Add item to cart
  async addItemToCart(cartId: string, item: CartItemData) {
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId: item.productId,
        variantId: item.variantId,
      },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId,
        ...item,
      },
    });
  }

  // Update cart item quantity
  async updateCartItem(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      return prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    }

    return prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  // Remove item from cart
  async removeCartItem(cartItemId: string) {
    return prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  // Clear cart
  async clearCart(cartId: string) {
    return prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  // Sync cart items (for cross-device sync)
  async syncCart(cartId: string, items: CartItemData[]) {
    // Delete existing items
    await prisma.cartItem.deleteMany({ where: { cartId } });

    // Create new items
    await prisma.cartItem.createMany({
      data: items.map(item => ({ cartId, ...item })),
    });

    return prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });
  }

  // Get cart by session ID (for guest carts)
  async getGuestCart(sessionId: string) {
    return prisma.cart.findFirst({
      where: {
        sessionId,
        isActive: true,
      },
      include: { items: true },
    });
  }

  // Update cart's last activity
  async updateCartActivity(cartId: string) {
    return prisma.cart.update({
      where: { id: cartId },
      data: { updatedAt: new Date() },
    });
  }
}

export const cartService = new CartService();
