'use client';

import { useState } from 'react';
import { ProductVariant, MassProducedProduct } from '@/types/product-types';
import { AdvancedAddToCartButton } from './AdvancedAddToCartButton';
import type { ShopifyProduct } from '@/types/shopify';

interface MassProducedVariantSelectorProps {
  product: MassProducedProduct;
  onVariantChange: (variant: ProductVariant) => void;
}

export function MassProducedVariantSelector({ 
  product, 
  onVariantChange 
}: MassProducedVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find(v => v.isDefault) || product.variants[0]
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    onVariantChange(variant);
  };

  // Convert MassProducedProduct to ShopifyProduct format for cart integration
  const convertToShopifyProduct = (variant: ProductVariant): ShopifyProduct => {
    return {
      id: product.id,
      handle: product.title.toLowerCase().replace(/\s+/g, '-'),
      title: product.title,
      description: product.description,
      images: {
        edges: product.images.map((img) => ({
          node: {
            url: img.url,
            altText: img.altText || product.title,
            width: img.width,
            height: img.height,
          },
        })),
      },
      priceRange: {
        minVariantPrice: {
          amount: variant.price.amount.toString(),
          currencyCode: variant.price.currency,
        },
      },
      variants: {
        edges: [{
          node: {
            id: variant.id,
            title: variant.title,
            availableForSale: variant.inStock,
            price: {
              amount: variant.price.amount.toString(),
              currencyCode: variant.price.currency,
            },
          },
        }],
      },
    } as ShopifyProduct;
  };

  return (
    <div className='bg-pure-white'>
      {/* Size Selector Header */}
      <div 
        className='flex items-center justify-between p-4 border border-sage-green/20 rounded-lg cursor-pointer hover:border-sage-green transition-colors'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className='flex items-center gap-3'>
          <span className='text-deep-charcoal font-medium'>
            {selectedVariant.size}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <span className='text-deep-charcoal font-semibold'>
            ${selectedVariant.price.amount}
          </span>
          <svg 
            className={`w-5 h-5 text-sage-green transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
      </div>

      {/* Expanded Options */}
      {isExpanded && (
        <div className='border-l border-r border-b border-sage-green/20 rounded-b-lg bg-pure-white'>
          <div className='p-2 space-y-2'>
            {product.variants.map((variant) => (
              <label
                key={variant.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:border-sage-green ${
                  selectedVariant.id === variant.id 
                    ? 'border-sage-green bg-sage-green/5' 
                    : 'border-border-gray hover:bg-sage-green/5'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <input
                    type='radio'
                    name='variant'
                    value={variant.id}
                    checked={selectedVariant.id === variant.id}
                    onChange={() => handleVariantSelect(variant)}
                    className='w-4 h-4 text-sage-green border-border-gray focus:ring-sage-green focus:ring-2'
                  />
                  <div>
                    <div className='text-deep-charcoal font-medium'>
                      {variant.size}
                    </div>
                    <div className='text-sm text-warm-gray'>
                      {variant.dimensions.width}&quot; × {variant.dimensions.height}&quot; {variant.dimensions.unit}
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-deep-charcoal font-semibold'>
                    ${variant.price.amount}
                  </div>
                  {!variant.inStock && (
                    <div className='text-xs text-red-500'>
                      Out of stock
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Information */}
      {product.deliveryInfo && (
        <div className='mt-4 p-4 bg-sage-green/5 rounded-lg border border-sage-green/20'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-sage-green font-medium mb-1'>
                Delivery in {product.deliveryInfo.estimatedDays}
              </div>
              {product.deliveryInfo.freeShippingThreshold && (
                <div className='text-sm text-warm-gray'>
                  Free shipping over ${product.deliveryInfo.freeShippingThreshold}
                </div>
              )}
            </div>
            <div className='flex items-center gap-2'>
              <button 
                className='p-2 border border-border-gray rounded-lg hover:border-sage-green transition-colors'
                title='Size guide'
              >
                <svg className='w-4 h-4 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </button>
              <button 
                className='p-2 border border-border-gray rounded-lg hover:border-sage-green transition-colors'
                title='Add to favorites'
              >
                <svg className='w-4 h-4 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <div className='mt-6'>
        <AdvancedAddToCartButton
          product={convertToShopifyProduct(selectedVariant)}
          initialQty={1}
          className='w-full'
          disabled={!selectedVariant.inStock}
        />
      </div>

      {/* Stock Status */}
      <div className='mt-4 flex items-center gap-2'>
        <div className={`w-3 h-3 rounded-full ${selectedVariant.inStock ? 'bg-sage-green' : 'bg-red-500'}`} />
        <span className={`text-sm font-medium ${selectedVariant.inStock ? 'text-sage-green' : 'text-red-500'}`}>
          {selectedVariant.inStock ? 'In stock' : 'Out of stock'}
        </span>
      </div>
    </div>
  );
}
