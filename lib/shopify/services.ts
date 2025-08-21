import { prisma } from '../db/prisma'
import { storefrontClient } from './client'

const GetProductsQuery = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

interface ProductNode {
  id: string
  title: string
  handle: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string | null
      }
    }>
  }
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ProductNode
    }>
  }
}

export async function getProducts(first: number = 20) {
  try {
    console.log('Making GraphQL request...');
    const data = await storefrontClient.request<ProductsResponse>(GetProductsQuery, { first });
    console.log('GraphQL response:', data);
    
    if (!data || !data.products) {
      throw new Error('Invalid response format from Shopify');
    }
    
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function createCart() {
  // Create cart in Shopify via GraphQL mutation
  // Store cart reference in Prisma
  const cart = await prisma.cart.create({
    data: {
      checkoutUrl: null,
    }
  })
  return cart
}

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
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`

interface CartResponse {
  cart: {
    id: string
    totalQuantity: number
    cost: {
      totalAmount: {
        amount: string
        currencyCode: string
      }
    }
    lines: {
      edges: Array<{
        node: {
          id: string
          quantity: number
          merchandise: {
            id: string
            title: string
            price: {
              amount: string
              currencyCode: string
            }
            product: {
              title: string
              handle: string
            }
          }
        }
      }>
    }
  }
}

export async function getCart(cartId: string) {
  // Get cart details from both Shopify and our database
  const [shopifyCart, localCart] = await Promise.all([
    storefrontClient.request<CartResponse>(GetCartQuery, { cartId }),
    prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true }
    })
  ])
  
  return {
    ...shopifyCart.cart,
    localData: localCart
  }
}
