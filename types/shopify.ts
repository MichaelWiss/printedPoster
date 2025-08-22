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
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct
    }>
  }
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
