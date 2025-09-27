import { getPrismaClient } from '../db/prisma';
import { getStorefrontClient } from './client';

// You must provide a userId to create a cart
export async function createCart(userId: string) {
  // Create cart in Shopify via GraphQL mutation
  // Store cart reference in Prisma
  const prisma = getPrismaClient();
  const cart = await prisma.cart.create({
    data: {
      userId,
    },
  });
  return cart;
}

// Limit cart lines to 20 and only fetch needed fields
const GetCartQuery = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 20) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product { title handle }
              }
            }
          }
        }
      }
    }
  }
`;

interface CartResponse {
  cart: {
    id: string;
    totalQuantity: number;
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
    lines: {
      edges: Array<{
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            price: {
              amount: string;
              currencyCode: string;
            };
            product: {
              title: string;
              handle: string;
            };
          };
        };
      }>;
    };
  };
}

export async function getCart(cartId: string) {
  // Get cart details from both Shopify and our database
  const [shopifyCart, localCart] = await Promise.all([
    getStorefrontClient().request<CartResponse>(GetCartQuery, { cartId }),
    getPrismaClient().cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    }),
  ]);

  return {
    ...shopifyCart.cart,
    localData: localCart,
  };
}
