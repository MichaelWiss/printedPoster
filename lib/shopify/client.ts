import { GraphQLClient } from 'graphql-request'

if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not defined')
}

if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined')
}

const SHOPIFY_STOREFRONT_API_ENDPOINT = 
  `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`

// For debugging
console.log('API Endpoint:', SHOPIFY_STOREFRONT_API_ENDPOINT);
console.log('Access Token:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN);

export const storefrontClient = new GraphQLClient(SHOPIFY_STOREFRONT_API_ENDPOINT, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export type { GraphQLClient }
