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
    <div className='bg-pure-white border border-warm-gray/15 shadow-sm'>
      <div className='p-5 sm:p-6 space-y-6'>
        {/* Size Selector */}
        <div className='rounded-xl border border-sage-green/15 bg-pure-white overflow-hidden'>
          <button
            type='button'
            className='flex w-full items-center justify-between px-4 py-3 sm:px-5 sm:py-4 hover:bg-sage-green/5 transition-colors'
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
          </button>

          {isExpanded && (
            <div className='border-t border-sage-green/10 p-2 sm:p-3 space-y-2 bg-pure-white'>
              {product.variants.map((variant) => (
                <label
                  key={variant.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedVariant.id === variant.id 
                      ? 'border-sage-green bg-sage-green/5' 
                      : 'border-warm-gray/15 hover:border-sage-green hover:bg-sage-green/5'
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
          )}
        </div>

        {/* Delivery Information */}
        {product.deliveryInfo && (
          <div className='p-4 sm:p-5 bg-sage-green/5 rounded-xl border border-sage-green/15'>
            <div className='flex items-start justify-between gap-4'>
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
                  type='button'
                >
                  <svg className='w-4 h-4 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </button>
                <button 
                  className='p-2 border border-border-gray rounded-lg hover:border-sage-green transition-colors'
                  title='Add to favorites'
                  type='button'
                >
                  <svg className='w-4 h-4 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Purchase Section */}
        <div className='p-4 sm:p-5 border border-warm-gray/12 rounded-xl bg-pure-white space-y-4'>
          <AdvancedAddToCartButton
            product={convertToShopifyProduct(selectedVariant)}
            initialQty={1}
            className='w-full sm:max-w-sm'
            disabled={!selectedVariant.inStock}
          />

          <div className='flex items-center gap-2'>
            <div className={`w-3 h-3 rounded-full ${selectedVariant.inStock ? 'bg-sage-green' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${selectedVariant.inStock ? 'text-sage-green' : 'text-red-500'}`}>
              {selectedVariant.inStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
