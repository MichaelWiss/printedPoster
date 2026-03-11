import { CartService } from '../services/cart-service';

// Mock Prisma client
const mockPrisma = {
  cart: {
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  cartItem: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
};

jest.mock('../db/prisma', () => ({
  getPrismaClient: () => mockPrisma,
}));

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
    jest.clearAllMocks();
  });

  describe('createUserCart', () => {
    it('creates a cart with userId and items', async () => {
      const mockCart = { id: 'cart-1', userId: 'user-1', items: [] };
      mockPrisma.cart.create.mockResolvedValue(mockCart);

      const result = await service.createUserCart('user-1', []);

      expect(mockPrisma.cart.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          items: { create: [] },
        },
        include: { items: true },
      });
      expect(result).toEqual(mockCart);
    });
  });

  describe('createGuestCart', () => {
    it('creates a cart with sessionId and null userId', async () => {
      const mockCart = { id: 'cart-2', sessionId: 'guest-abc', userId: null, items: [] };
      mockPrisma.cart.create.mockResolvedValue(mockCart);

      const result = await service.createGuestCart('guest-abc');

      expect(mockPrisma.cart.create).toHaveBeenCalledWith({
        data: {
          sessionId: 'guest-abc',
          isActive: true,
          items: { create: [] },
        },
        include: { items: true },
      });
      expect(result.userId).toBeNull();
    });
  });

  describe('getUserCart', () => {
    it('finds active cart for user', async () => {
      const mockCart = { id: 'cart-1', userId: 'user-1', isActive: true, items: [] };
      mockPrisma.cart.findFirst.mockResolvedValue(mockCart);

      const result = await service.getUserCart('user-1');

      expect(mockPrisma.cart.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-1', isActive: true },
        include: { items: true },
        orderBy: { updatedAt: 'desc' },
      });
      expect(result).toEqual(mockCart);
    });

    it('returns null when no active cart exists', async () => {
      mockPrisma.cart.findFirst.mockResolvedValue(null);

      const result = await service.getUserCart('user-2');
      expect(result).toBeNull();
    });
  });

  describe('migrateGuestCart', () => {
    it('assigns guest cart to authenticated user', async () => {
      const guestCart = { id: 'cart-g', sessionId: 'sess-1', userId: null, items: [{ id: 'item-1' }] };
      const migratedCart = { ...guestCart, userId: 'user-1' };

      mockPrisma.cart.findFirst.mockResolvedValue(guestCart);
      mockPrisma.cart.update.mockResolvedValue(migratedCart);

      const result = await service.migrateGuestCart('sess-1', 'user-1');

      expect(mockPrisma.cart.findFirst).toHaveBeenCalledWith({
        where: { sessionId: 'sess-1', userId: null, isActive: true },
        include: { items: true },
      });
      expect(mockPrisma.cart.update).toHaveBeenCalledWith({
        where: { id: 'cart-g' },
        data: { userId: 'user-1' },
        include: { items: true },
      });
      expect(result!.userId).toBe('user-1');
    });

    it('returns null when no guest cart exists', async () => {
      mockPrisma.cart.findFirst.mockResolvedValue(null);

      const result = await service.migrateGuestCart('sess-none', 'user-1');
      expect(result).toBeNull();
    });
  });

  describe('addItemToCart', () => {
    const item = {
      productId: 'prod-1',
      variantId: 'var-1',
      title: 'Test Poster',
      handle: 'test-poster',
      price: 29.99,
      quantity: 1,
    };

    it('creates a new item when product is not in cart', async () => {
      mockPrisma.cartItem.findFirst.mockResolvedValue(null);
      mockPrisma.cartItem.create.mockResolvedValue({ id: 'ci-1', ...item });

      await service.addItemToCart('cart-1', item);

      expect(mockPrisma.cartItem.create).toHaveBeenCalledWith({
        data: { cartId: 'cart-1', ...item },
      });
    });

    it('increments quantity when product already exists in cart', async () => {
      const existing = { id: 'ci-1', cartId: 'cart-1', ...item, quantity: 2 };
      mockPrisma.cartItem.findFirst.mockResolvedValue(existing);
      mockPrisma.cartItem.update.mockResolvedValue({ ...existing, quantity: 3 });

      await service.addItemToCart('cart-1', item);

      expect(mockPrisma.cartItem.update).toHaveBeenCalledWith({
        where: { id: 'ci-1' },
        data: { quantity: 3 },
      });
    });
  });
});
