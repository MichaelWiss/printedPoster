export interface MoneyV2 {
  amount: string
  currencyCode: string
}

export interface PriceRange {
  minVariantPrice: MoneyV2
}

export interface ShopifyImage {
  url: string
  altText: string | null
  width?: number
  height?: number
}

export interface ProductVariant {
  id: string
  availableForSale: boolean
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  priceRange: PriceRange
  images: {
    edges: Array<{
      node: ShopifyImage
    }>
  }
  variants: {
    edges: Array<{
      node: ProductVariant
    }>
  }
  // Optional array of product tags for filtering
  tags?: string[]
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct
    }>
  }
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string | null
  endCursor?: string | null
}

export interface ProductEdge {
  cursor: string
  node: ShopifyProduct
}

export interface ProductConnection {
  edges: ProductEdge[]
  pageInfo?: PageInfo
}

export interface ShopifyCart {
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

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  description: string
  image?: ShopifyImage | null
  products: ProductConnection
}

export interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: ShopifyCollection
    }>
  }
}

export interface CollectionResponse {
  collectionByHandle: ShopifyCollection | null
}

// Minimal subset of Shopify ProductFilter input for our tag/productType filtering use cases
export type ShopifyProductFilter = {
  tag?: string
  productType?: string
  vendor?: string
}
