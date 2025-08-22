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
const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    # Fetch products, limited by the "first" parameter
    products(first: $first) {
      edges {
        node {
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
    }
  }
`

// Import our Shopify types
import type { ProductsResponse, ShopifyProduct } from '@/types/shopify'

// Function to fetch products from Shopify
// Parameters:
// - first: number (default: 10) - Number of products to fetch
// Returns: Promise<ShopifyProduct[]> - Array of products
export async function getProducts(first: number = 10): Promise<ShopifyProduct[]> {
  try {
    // Make the API request to Shopify
    const data = await storefrontClient.request<ProductsResponse>(GET_PRODUCTS_QUERY, { first })
    
    // Transform the response to a simpler format
    // Convert from { edges: [{ node: { ... } }] } to [{ ... }]
    return data.products.edges.map((edge: { node: ShopifyProduct }) => edge.node)
  } catch (error) {
    // Log any errors that occur during the request
    console.error('Error fetching products:', error)
    throw error
  }
}

// Export the GraphQLClient type for use in other files
export type { GraphQLClient }
