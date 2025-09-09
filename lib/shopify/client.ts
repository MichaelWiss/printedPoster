// Import the GraphQL client library that we'll use to make requests to Shopify's Storefront API
import { GraphQLClient } from 'graphql-request'

// Environment variable validation
// These checks ensure our app has the required Shopify credentials before trying to make any API calls
if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not defined')
}

if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined')
}

// Construct the Shopify Storefront API endpoint URL
// Format: https://your-store.myshopify.com/api/2024-01/graphql.json
const SHOPIFY_STOREFRONT_API_ENDPOINT = 
  `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`

// Initialize the GraphQL client with our Shopify configuration
// This client will be used for all Storefront API requests
export const storefrontClient = new GraphQLClient(SHOPIFY_STOREFRONT_API_ENDPOINT, {
  headers: {
    // The Storefront Access Token authenticates our app with Shopify
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    // These headers tell Shopify we're sending and expecting JSON data
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Define our GraphQL queries
// This query fetches a list of products with basic information
// Only fetch fields needed for product cards
const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 1) {
            edges { node { url altText } }
          }
        }
      }
    }
  }
`

// Search products by a free-text query (Shopify search syntax supported)
const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
        }
      }
    }
  }
`

// This query fetches a single product by handle
const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    # Fetch a single product by its handle
    productByHandle(handle: $handle) {
      id            # Unique identifier for the product
      title         # Product title
      handle        # URL-friendly version of the product title
      description   # Product description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

// Collection queries
const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`

const GET_COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!, $first: Int = 50, $filters: [ProductFilter!], $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $after: String) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
        width
        height
      }
      products(first: $first, filters: $filters, sortKey: $sortKey, reverse: $reverse, after: $after) {
        edges {
          cursor
          node {
            id
            title
            handle
            description
            tags
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
                  width
                  height
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`

// Import our Shopify types
import type { ProductsResponse, ShopifyProduct, CollectionsResponse, ShopifyCollection, ShopifyProductFilter } from '@/types/shopify'

// Function to fetch products from Shopify
// Parameters:
// - first: number (default: 10) - Number of products to fetch
// Returns: Promise<ShopifyProduct[]> - Array of products
// Retry utility for Shopify API calls
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 500): Promise<T> {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries) await new Promise(res => setTimeout(res, delay * (i + 1)));
    }
  }
  throw lastErr;
}

// Function to fetch products from Shopify with caching and retry
export async function getProducts(first: number = 10): Promise<ShopifyProduct[]> {
  return withRetry(async () => {
    // Use Next.js fetch cache if available
    const data = await storefrontClient.request<ProductsResponse>(GET_PRODUCTS_QUERY, { first });
    return data.products.edges.map((edge: { node: ShopifyProduct }) => edge.node);
  });
}

// Search products by text query. Minimum trimming and length handling should be done by caller.
export async function searchProducts(query: string, first: number = 20): Promise<ShopifyProduct[]> {
  const q = (query || '').trim()
  if (!q) return []
  return withRetry(async () => {
    const data = await storefrontClient.request<ProductsResponse>(SEARCH_PRODUCTS_QUERY, { query: q, first });
    return data.products.edges.map((edge: { node: ShopifyProduct }) => edge.node);
  })
}

// Function to fetch a single product by handle
// Parameters:
// - handle: string - The product handle (URL slug)
// Returns: Promise<ShopifyProduct | null> - Single product or null if not found
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    // Make the API request to Shopify
    const data = await storefrontClient.request<{ productByHandle: ShopifyProduct | null }>(
      GET_PRODUCT_BY_HANDLE_QUERY,
      { handle }
    )

    return data.productByHandle
  } catch (error) {
    // Log any errors that occur during the request
    console.error('Error fetching product by handle:', error)
    throw error
  }
}

// Function to fetch collections from Shopify
// Parameters:
// - first: number (default: 10) - Number of collections to fetch
// Returns: Promise<ShopifyCollection[]> - Array of collections
// Function to fetch collections from Shopify with caching and retry
export async function getCollections(first: number = 10): Promise<ShopifyCollection[]> {
  return withRetry(async () => {
    const data = await storefrontClient.request<CollectionsResponse>(GET_COLLECTIONS_QUERY, { first });
    return data.collections.edges.map((edge: { node: ShopifyCollection }) => edge.node);
  });
}

// Function to fetch a single collection by handle
// Parameters:
// - handle: string - The collection handle (URL slug)
// Returns: Promise<ShopifyCollection | null> - Single collection or null if not found
export async function getCollectionByHandle(handle: string, opts?: { first?: number; filters?: ShopifyProductFilter[]; sortKey?: string; reverse?: boolean; after?: string | null }): Promise<ShopifyCollection | null> {
  try {
    // Make the API request to Shopify
  const variables: { handle: string; first?: number; filters?: ShopifyProductFilter[]; sortKey?: string; reverse?: boolean; after?: string | null } = { handle }
    if (opts?.first !== undefined) variables.first = opts.first
    if (opts?.filters) variables.filters = opts.filters
    if (opts?.sortKey) variables.sortKey = opts.sortKey
    if (typeof opts?.reverse === 'boolean') variables.reverse = opts.reverse
    if (opts?.after) variables.after = opts.after

    const data = await storefrontClient.request<{ collectionByHandle: ShopifyCollection | null }>(
      GET_COLLECTION_BY_HANDLE_QUERY,
      variables
    )

    return data.collectionByHandle
  } catch (error) {
    // Log any errors that occur during the request
    console.error('Error fetching collection by handle:', error)
    throw error
  }
}

// Export the GraphQLClient type for use in other files
export type { GraphQLClient }
