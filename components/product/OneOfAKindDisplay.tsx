'use client';

import { OneOfAKindProduct } from '@/types/product-types';
import { useCartActions, useCartLoading } from '@/stores/cart-store';
import type { ShopifyProduct } from '@/types/shopify';

interface OneOfAKindDisplayProps {
  product: OneOfAKindProduct;
}

export function OneOfAKindDisplay({ product }: OneOfAKindDisplayProps) {
  const { addItem } = useCartActions();
  const isLoading = useCartLoading();

  // Convert OneOfAKindProduct to ShopifyProduct format for cart integration
  const convertToShopifyProduct = (): ShopifyProduct => {
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
          amount: product.price.amount.toString(),
          currencyCode: product.price.currency,
        },
      },
      variants: {
        edges: [{
          node: {
            id: `${product.id}-unique`,
            title: 'One of a Kind',
            availableForSale: product.inStock,
            price: {
              amount: product.price.amount.toString(),
              currencyCode: product.price.currency,
            },
          },
        }],
      },
    } as ShopifyProduct;
  };

  const handleAddToCart = async () => {
    try {
      await addItem(convertToShopifyProduct(), 1);
    } catch {
      // Error is handled by the cart store
      // Failed to add item to cart
    }
  };

  return (
    <div className='bg-pure-white'>
      {/* Unique Item Badge */}
      <div className='mb-4 inline-flex items-center gap-2 px-3 py-1 bg-terracotta/10 border border-terracotta/20 rounded-full'>
        <div className='w-2 h-2 bg-terracotta rounded-full' />
        <span className='text-terracotta text-sm font-medium'>One of a Kind</span>
      </div>

      {/* Price Display */}
      <div className='p-4 border border-terracotta/20 rounded-lg bg-terracotta/5 mb-4'>
        <div className='flex items-center justify-between'>
          <div>
            <div className='text-sm text-warm-gray mb-1'>Unique Artwork</div>
            <div className='text-2xl font-semibold text-deep-charcoal'>
              ${product.price.amount}
            </div>
          </div>
          <div className='text-right'>
            <div className='text-sm text-warm-gray'>Size</div>
            <div className='text-deep-charcoal font-medium'>
              {product.size}
            </div>
            <div className='text-xs text-warm-gray'>
              {product.dimensions.width}&quot; × {product.dimensions.height}&quot; {product.dimensions.unit}
            </div>
          </div>
        </div>
      </div>

      {/* Artist Information */}
      {product.artist && (
        <div className='mb-4 p-3 bg-sage-green/5 border border-sage-green/20 rounded-lg'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center'>
              <svg className='w-4 h-4 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <div>
              <div className='text-sm text-warm-gray'>Artist</div>
              <div className='text-deep-charcoal font-medium'>{product.artist}</div>
            </div>
            {product.creationDate && (
              <div className='ml-auto text-right'>
                <div className='text-sm text-warm-gray'>Created</div>
                <div className='text-deep-charcoal text-sm'>{product.creationDate}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Authenticity Information */}
      {product.authenticity && (
        <div className='mb-4 p-3 border border-sage-green/20 rounded-lg'>
          <h4 className='text-deep-charcoal font-medium mb-2'>Authenticity</h4>
          <div className='grid grid-cols-2 gap-3'>
            {product.authenticity.certificate && (
              <div className='flex items-center gap-2'>
                <svg className='w-4 h-4 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='text-sm text-warm-gray'>Certificate included</span>
              </div>
            )}
            {product.authenticity.signature && (
              <div className='flex items-center gap-2'>
                <svg className='w-4 h-4 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                </svg>
                <span className='text-sm text-warm-gray'>Hand signed</span>
              </div>
            )}
          </div>
          {product.authenticity.edition && (
            <div className='mt-2 pt-2 border-t border-sage-green/10'>
              <span className='text-sm text-warm-gray'>Edition: </span>
              <span className='text-sm text-deep-charcoal font-medium'>{product.authenticity.edition}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex gap-3'>
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          className='flex-1 bg-terracotta text-pure-white px-6 py-3 rounded-lg font-medium hover:bg-terracotta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Adding...' : (product.inStock ? 'Add to Cart' : 'Sold Out')}
        </button>
        <button 
          className='p-3 border border-border-gray rounded-lg hover:border-sage-green transition-colors'
          title='Add to favorites'
        >
          <svg className='w-5 h-5 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
          </svg>
        </button>
      </div>

      {/* Stock Status for Unique Item */}
      <div className='mt-4 flex items-center gap-2'>
        <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-terracotta' : 'bg-red-500'}`} />
        <span className={`text-sm font-medium ${product.inStock ? 'text-terracotta' : 'text-red-500'}`}>
          Unique • {product.inStock ? 'Available' : 'Sold'}
        </span>
      </div>

      {/* Urgency Message */}
      <div className='mt-3 p-3 bg-terracotta/5 border border-terracotta/20 rounded-lg'>
        <div className='flex items-center gap-2'>
          <svg className='w-4 h-4 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <span className='text-sm text-terracotta font-medium'>
            This is a one-time opportunity – once sold, it&apos;s gone forever
          </span>
        </div>
      </div>
    </div>
  );
}