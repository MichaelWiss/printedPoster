// Enhanced Shopify client with product type detection
import { getProductByHandle as getShopifyProduct } from './client';
import { enrichProductFromCollections } from '../utils/collection-based-types';
import type { ShopifyProduct } from '@/types/shopify';
import { ProductType, type MassProducedProduct, type OneOfAKindProduct } from '@/types/product-types';

// Type for enriched product that includes our type system
export type EnhancedShopifyProduct = ShopifyProduct & {
  type: ProductType;
  artist?: string;
  isUnique?: boolean;
  authenticity?: {
    certificate: boolean;
    signature: boolean;
    edition: string;
  };
};

/**
 * Get a product by handle with enhanced type detection
 * This is a drop-in replacement for the regular getProductByHandle
 */
export async function getEnhancedProductByHandle(
  handle: string
): Promise<EnhancedShopifyProduct | null> {
  try {
    // Fetch the product using existing Shopify client
    const product = await getShopifyProduct(handle);
    
    if (!product) {
      return null;
    }

    // Enrich the product with type detection based on collections
    const enrichedProduct = enrichProductFromCollections(product as unknown as { collections?: { edges: { node: { handle: string; }; }[]; } | undefined; title: string; });
    
    // Combine product data with enrichment, preserving original structure
    const result: EnhancedShopifyProduct = {
      ...product,
      type: enrichedProduct.type,
      artist: 'artist' in enrichedProduct ? enrichedProduct.artist : undefined,
      isUnique: 'isUnique' in enrichedProduct ? enrichedProduct.isUnique : undefined,
      authenticity: 'authenticity' in enrichedProduct ? enrichedProduct.authenticity : undefined,
    };
    
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching enhanced product:', error);
    throw error;
  }
}

/**
 * Convert enhanced product to our component-specific types
 */
export function toMassProducedProduct(product: EnhancedShopifyProduct): MassProducedProduct {
  return {
    id: product.id,
    title: product.title,
    description: product.description || '',
    type: ProductType.MASS_PRODUCED,
    images: product.images?.edges?.map(edge => ({
      id: edge.node.url, // Using URL as ID for now
      url: edge.node.url,
      altText: edge.node.altText || '',
      width: edge.node.width || 800,
      height: edge.node.height || 600,
    })) || [],
    inStock: product.variants?.edges?.some(edge => edge.node.availableForSale) || false,
    frameIncluded: false, // Default for mass produced
    variants: product.variants?.edges?.map((edge, index) => ({
      id: edge.node.id,
      title: edge.node.title || `${product.title} - Variant ${index + 1}`,
      size: edge.node.title || 'Standard',
      dimensions: {
        width: 8, // Default dimensions - could be parsed from title
        height: 12,
        unit: 'in' as const,
      },
      price: {
        amount: parseFloat(edge.node.price?.amount || '0'),
        currency: edge.node.price?.currencyCode || 'USD',
      },
      inStock: edge.node.availableForSale,
      isDefault: index === 0,
    })) || [],
    priceRange: {
      min: parseFloat(product.priceRange.minVariantPrice.amount),
      max: parseFloat(product.priceRange.minVariantPrice.amount), // TODO: Get max from variants
      currency: product.priceRange.minVariantPrice.currencyCode,
    },
    availableSizes: product.variants?.edges?.map(edge => edge.node.title || 'Standard') || [],
    deliveryInfo: {
      estimatedDays: '2-4 business days',
      freeShippingThreshold: 59,
      shippingMethods: [{
        id: 'standard',
        name: 'Standard Shipping',
        price: 5.99,
        estimatedDays: '2-4 business days',
      }],
    },
  };
}

export function toOneOfAKindProduct(product: EnhancedShopifyProduct): OneOfAKindProduct {
  const firstVariant = product.variants?.edges?.[0]?.node;
  
  return {
    id: product.id,
    title: product.title,
    description: product.description || '',
    type: ProductType.ONE_OF_A_KIND,
    images: product.images?.edges?.map(edge => ({
      id: edge.node.url,
      url: edge.node.url,
      altText: edge.node.altText || '',
      width: edge.node.width || 800,
      height: edge.node.height || 600,
    })) || [],
    inStock: firstVariant?.availableForSale || false,
    frameIncluded: true, // Default for one-of-a-kind
    price: {
      amount: parseFloat(firstVariant?.price?.amount || product.priceRange.minVariantPrice.amount),
      currency: firstVariant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode,
    },
    size: firstVariant?.title || '24" x 36"', // Default size
    dimensions: {
      width: 24, // Default dimensions
      height: 36,
      unit: 'in' as const,
    },
    isUnique: true,
    artist: product.artist,
    creationDate: new Date().getFullYear().toString(), // Default to current year
    authenticity: product.authenticity || {
      certificate: true,
      signature: true,
      edition: 'Original 1/1',
    },
  };
}

/**
 * Convenience function to get product in the correct format for components
 */
export async function getProductForComponents(handle: string) {
  const product = await getEnhancedProductByHandle(handle);
  
  if (!product) {
    return null;
  }
  
  if (product.type === ProductType.ONE_OF_A_KIND) {
    return {
      type: 'one_of_a_kind' as const,
      product: toOneOfAKindProduct(product),
    };
  } else {
    return {
      type: 'mass_produced' as const,
      product: toMassProducedProduct(product),
    };
  }
}