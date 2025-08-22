/**
 * Tests for the Shopify Storefront API client
 * 
 * These tests verify the functionality of our GraphQL client setup
 * and product fetching capabilities. We use Jest's mocking features
 * to avoid making actual API calls during testing.
 */

// We'll capture the mocked client's `request` function from the mocked constructor instance
// Mock GraphQLClient and expose the internal request mock as __requestMock on the
// mocked module so tests can access it via require(...) without relying on globals.
jest.mock('graphql-request', () => {
  const rm = jest.fn()
  return {
    GraphQLClient: jest.fn().mockImplementation((url, options) => ({
      request: rm,
      options,
    })),
    __requestMock: rm,
  }
})

function getRequestMock(): jest.Mock {
  // Use Jest's module registry to access the mocked module synchronously
  const mod = jest.requireMock('graphql-request') as { __requestMock?: jest.Mock }
  const r = mod && mod.__requestMock
  if (!r) throw new Error('request mock not found on mocked module')
  return r as jest.Mock
}

// After setting up mocks, import the modules
import { GraphQLClient } from 'graphql-request'
import { getProducts } from '../client'
import type { ProductsResponse } from '@/types/shopify'

// Mock console.error to prevent noise in test output
console.error = jest.fn()

describe('Shopify Client', () => {
  // Mock data that matches our expected response shape
  const mockProductsResponse: ProductsResponse = {
    products: {
      edges: [
        {
          node: {
            id: 'gid://shopify/Product/1',
            title: 'Test Product',
            handle: 'test-product',
            description: 'A test product',
            priceRange: {
              minVariantPrice: {
                amount: '10.00',
                currencyCode: 'USD'
              }
            },
            images: {
              edges: [
                {
                  node: {
                    url: 'https://test.com/image.jpg',
                    altText: 'Test image'
                  }
                }
              ]
            },
            variants: {
              edges: [
                {
                  node: {
                    id: 'gid://shopify/ProductVariant/1',
                    availableForSale: true
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }

  beforeEach(() => {
  // Reset only the request mock and console.error so we don't erase
  // the GraphQLClient constructor call that happens at module import time.
  const request = getRequestMock()
  request.mockReset()
  request.mockResolvedValue({ products: mockProductsResponse.products })

  // Reset console.error mock separately
  ;(console.error as jest.Mock).mockClear?.()
  })

  describe('storefrontClient', () => {
    it('should initialize with correct URL and headers', () => {
      // Get the mocked constructor
      const MockGraphQLClient = (GraphQLClient as jest.Mock)

      // Verify the GraphQLClient was constructed with correct parameters
      expect(MockGraphQLClient).toHaveBeenCalledWith(
        expect.stringContaining('shopify.com/api/2024-01/graphql.json'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Shopify-Storefront-Access-Token': expect.any(String),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        })
      )
    })
  })

  describe('getProducts', () => {
    it('should fetch products with default limit', async () => {
      // Call getProducts with no arguments (should use default limit)
      const products = await getProducts()
      
      // Verify the request was made with correct parameters
  expect(getRequestMock()).toHaveBeenCalledWith(
        expect.any(String), // GraphQL query string
        { first: 10 }      // Default limit of 10 products
      )

      // Verify the response is properly transformed
      expect(products).toHaveLength(1)
      expect(products[0]).toEqual(mockProductsResponse.products.edges[0].node)
    })

    it('should fetch products with custom limit', async () => {
      // Call getProducts with a custom limit
      await getProducts(5)
      
      // Verify the request was made with the custom limit
  expect(getRequestMock()).toHaveBeenCalledWith(
        expect.any(String),
        { first: 5 }
      )
    })

    it('should handle errors gracefully', async () => {
      // Simulate an API error
      const error = new Error('API Error')
  getRequestMock().mockRejectedValueOnce(error)

      // Verify that the error is properly thrown
      await expect(getProducts()).rejects.toThrow('API Error')
      
      // Verify that the error is logged
      expect(console.error).toHaveBeenCalledWith('Error fetching products:', error)
    })
  })
})
