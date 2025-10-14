'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ShopifyProduct } from '@/types/shopify';
import { ProductDetails as LegacyProductDetails } from './ProductDetails';
import { MassProducedVariantSelector } from './MassProducedVariantSelector';
import { OneOfAKindDisplay } from './OneOfAKindDisplay';
import { QualitySpecs } from './QualitySpecs';
import { detectProductTypeFromCollections } from '@/lib/utils/collection-based-types';
import { ProductType, type ProductVariant } from '@/types/product-types';
import { FEATURE_FLAGS, debugProductType } from '@/lib/feature-flags';
import ViewportFadeIn from '@/components/ui/ViewportFadeIn';

interface Props {
  product: ShopifyProduct;
  useEnhancedTypes?: boolean;
}

export function EnhancedProductDetails({ product, useEnhancedTypes = true }: Props) {
  const [_selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  
  // Determine if we should use enhanced types
  const shouldEnhance = useEnhancedTypes && FEATURE_FLAGS.ENHANCED_PRODUCT_TYPES;
  
  // If not using enhanced types, render legacy component
  if (!shouldEnhance) {
    debugProductType('Using legacy product details', { productId: product.id });
    return <LegacyProductDetails product={product} />;
  }

  // Enhanced type detection
  const collections = product.collections?.edges || [];
  const productType = detectProductTypeFromCollections(collections);
  
  debugProductType('Detected product type', {
    productId: product.id,
    productType,
    collections: collections.map(c => c.node?.handle),
  });

  const firstImage = product.images?.edges[0]?.node;
  
  // Quality specs data
  const qualitySpecs = {
    paperWeight: '200 g/m²',
    paperType: 'Premium matte',
    finish: 'Matte finish',
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
      {/* Product Images */}
      {firstImage && (
        <ViewportFadeIn>
          <div className='space-y-4'>
            <div className='aspect-[3/4] bg-gradient-to-br from-sage-green/10 to-terracotta/10 rounded-lg overflow-hidden'>
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                width={600}
                height={800}
                className='object-cover w-full h-full'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw'
                priority
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images?.edges && product.images.edges.length > 1 && (
              <div className='flex gap-2'>
                {product.images.edges.slice(1, 4).map((edge, index) => (
                  <div key={index} className='w-16 h-16 bg-sage-green/10 rounded border-2 border-transparent hover:border-sage-green transition-colors cursor-pointer overflow-hidden'>
                    <Image
                      src={edge.node.url}
                      alt={edge.node.altText || ''}
                      width={64}
                      height={64}
                      className='object-cover w-full h-full'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </ViewportFadeIn>
      )}

      {/* Product Information */}
      <ViewportFadeIn delayMs={80}>
        <div className='space-y-6'>
          {/* Product Title and Type Badge */}
          <div>
            <div className='flex items-center gap-3 mb-3'>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                productType === ProductType.MASS_PRODUCED 
                  ? 'bg-sage-green/10 text-sage-green border border-sage-green/20'
                  : 'bg-terracotta/10 text-terracotta border border-terracotta/20'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  productType === ProductType.MASS_PRODUCED ? 'bg-sage-green' : 'bg-terracotta'
                }`} />
                {productType === ProductType.MASS_PRODUCED ? 'Mass Produced' : 'One of a Kind'}
              </div>
            </div>
            
            <h1 className='font-display text-3xl font-semibold text-deep-charcoal mb-4'>
              {product.title}
            </h1>
            
            <p className='text-warm-gray leading-relaxed'>
              {product.description}
            </p>
          </div>

          {/* Type-Specific Product Display */}
          <ProductTypeComponent 
            product={product}
            productType={productType}
            onVariantChange={setSelectedVariant}
          />

          {/* Quality Specifications */}
          <QualitySpecs 
            specs={qualitySpecs} 
            frameIncluded={productType === ProductType.ONE_OF_A_KIND}
          />
        </div>
      </ViewportFadeIn>
    </div>
  );
}

// Separate component for type-specific rendering
function ProductTypeComponent({ 
  product, 
  productType, 
  onVariantChange 
}: {
  product: ShopifyProduct;
  productType: ProductType;
  onVariantChange: (variant: ProductVariant) => void;
}) {
  if (productType === ProductType.MASS_PRODUCED) {
    // Convert to mass-produced format
    const massProducedProduct = {
      id: product.id,
      title: product.title,
      description: product.description || '',
      type: ProductType.MASS_PRODUCED,
      images: product.images?.edges?.map(edge => ({
        id: edge.node.url,
        url: edge.node.url,
        altText: edge.node.altText || '',
        width: edge.node.width || 800,
        height: edge.node.height || 600,
      })) || [],
      inStock: product.variants?.edges?.some(edge => edge.node.availableForSale) || false,
      frameIncluded: false,
      variants: product.variants?.edges?.map((edge, index) => ({
        id: edge.node.id,
        title: edge.node.title || `${extractSizeFromTitle(edge.node.title || '')} ${index + 1}`,
        size: extractSizeFromTitle(edge.node.title || '') || 'Standard',
        dimensions: parseDimensions(edge.node.title || '', index),
        price: {
          amount: parseFloat(edge.node.price?.amount || '0'),
          currency: edge.node.price?.currencyCode || 'USD',
        },
        inStock: edge.node.availableForSale,
        isDefault: index === 0,
      })) || [],
      priceRange: {
        min: parseFloat(product.priceRange.minVariantPrice.amount),
        max: Math.max(...(product.variants?.edges?.map(edge => parseFloat(edge.node.price?.amount || '0')) || [parseFloat(product.priceRange.minVariantPrice.amount)])),
        currency: product.priceRange.minVariantPrice.currencyCode,
      },
      availableSizes: product.variants?.edges?.map(edge => extractSizeFromTitle(edge.node.title || '') || 'Standard') || [],
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

    return (
      <MassProducedVariantSelector
        product={massProducedProduct as any}
        onVariantChange={onVariantChange}
      />
    );
  }

  // One-of-a-kind product
  const firstVariant = product.variants?.edges?.[0]?.node;
  const oneOfAKindProduct = {
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
    frameIncluded: true,
    price: {
      amount: parseFloat(firstVariant?.price?.amount || product.priceRange.minVariantPrice.amount),
      currency: firstVariant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode,
    },
    size: extractSizeFromTitle(firstVariant?.title || '') || '24" x 36"',
    dimensions: parseDimensions(firstVariant?.title || '24" x 36"', 0),
    isUnique: true,
    artist: extractArtistFromTitle(product.title),
    creationDate: new Date().getFullYear().toString(),
    authenticity: {
      certificate: true,
      signature: true,
      edition: 'Original 1/1',
    },
  };

  return <OneOfAKindDisplay product={oneOfAKindProduct as any} />;
}

// Helper functions for parsing product data
function extractSizeFromTitle(title: string): string | null {
  // Try to extract size patterns like "8x12", "8" x 12", "8 x 12 in"
  const patterns = [
    /(\d+["\s]*[x×][\s"]*\d+["\s]*(?:in|inches)?)/i,
    /(\d+["\s]*x[\s"]*\d+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      // Clean up the matched size string
      return match[1]
        .replace(/["\s]/g, ' ')
        .replace(/x/gi, '" x ')
        .replace(/×/g, '" × ')
        .replace(/\s+/g, ' ')
        .trim() + '"';
    }
  }
  
  return null;
}

function parseDimensions(title: string, fallbackIndex: number): { width: number; height: number; unit: 'in' } {
  // Try to extract dimensions from title
  const match = title.match(/(\d+)["\s]*[x×][\s"]*((\d+))/i);
  
  if (match) {
    return {
      width: parseInt(match[1]),
      height: parseInt(match[3]),
      unit: 'in' as const,
    };
  }
  
  // Fallback dimensions based on common sizes
  const fallbackSizes = [
    { width: 8, height: 12 },
    { width: 12, height: 16 },
    { width: 16, height: 20 },
    { width: 20, height: 20 },
    { width: 24, height: 36 },
  ];
  
  return {
    ...fallbackSizes[fallbackIndex % fallbackSizes.length],
    unit: 'in' as const,
  };
}

function extractArtistFromTitle(title: string): string | undefined {
  // Try to extract artist from patterns like:
  // "Sunset Landscape - Maria Rodriguez"
  // "Abstract #47 by John Smith"
  const patterns = [
    / - (.+)$/,           // "Title - Artist"
    / by (.+)$/i,         // "Title by Artist"  
    /\((.+)\)$/           // "Title (Artist)"
  ];
  
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return undefined;
}

export default EnhancedProductDetails;
