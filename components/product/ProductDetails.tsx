'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ShopifyProduct } from '@/types/shopify';
import {
  useCartActions,
  useCartLoading,
  useIsAuthenticated,
} from '@/stores/cart-store';
import ViewportFadeIn from '@/components/ui/ViewportFadeIn';

interface Props {
  product: ShopifyProduct;
}

export function ProductDetails({ product }: Props) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCartActions();
  const isLoading = useCartLoading();
  const isAuthenticated = useIsAuthenticated();

  const handleAddToCart = async () => {
    try {
      await addItem(product, qty);
    } catch {
      // Failed to add item to cart
    }
  };

  const firstImage = product.images?.edges[0]?.node;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {firstImage && (
        <ViewportFadeIn>
          <div className='relative w-full'>
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              width={600}
              height={800}
              className='object-contain w-full h-auto rounded-lg bg-pure-white'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw'
              priority
            />
          </div>
        </ViewportFadeIn>
      )}
      <ViewportFadeIn delayMs={80}>
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold text-deep-charcoal mb-4 line-clamp-2'>
              {product.title}
            </h1>
            <p className='text-warm-gray text-lg leading-relaxed'>
              {product.description}
            </p>
          </div>

          {/* Price */}
          {product.priceRange?.minVariantPrice && (
            <div>
              <p className='text-3xl font-bold text-terracotta'>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency:
                    product.priceRange.minVariantPrice.currencyCode || 'USD',
                }).format(
                  parseFloat(product.priceRange.minVariantPrice.amount)
                )}
              </p>
              <p className='text-sm text-warm-gray mt-1'>Free shipping</p>
            </div>
          )}

          {/* Advanced Add to Cart Button */}
          <div className='pt-4'>
            <div className='relative flex justify-start'>
                     <button
                       className='add-to-cart-btn scale-75 origin-left'
                       onClick={e => {
                         e.preventDefault();
                         handleAddToCart();
                       }}
                       disabled={isLoading}
                     >
                <div className='quantity-section'>
                  <span
                    className='quantity-btn'
                    onClick={e => {
                      e.stopPropagation();
                      setQty(Math.max(1, qty - 1));
                    }}
                  >
                    −
                  </span>
                  <span className='quantity-display'>{qty}</span>
                  <span
                    className='quantity-btn'
                    onClick={e => {
                      e.stopPropagation();
                      setQty(qty + 1);
                    }}
                  >
                    +
                  </span>
                </div>
                <div className='divider' />
                <div className='add-to-cart-section'>
                  {isLoading ? 'Adding...' : 'Add to Cart'}
                </div>
              </button>
            </div>

            {isAuthenticated && (
              <p className='text-xs text-sage-green mt-2 text-center'>
                ✓ Cart will sync across your devices
              </p>
            )}
          </div>

          {/* Product Features */}
          <div className='border-t border-border-gray pt-6'>
            <h3 className='text-lg font-semibold text-deep-charcoal mb-4'>
              Product Details
            </h3>
            <ul className='space-y-2 text-warm-gray'>
              <li className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4 text-sage-green'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                High-quality materials
              </li>
              <li className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4 text-sage-green'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                Free shipping worldwide
              </li>
              <li className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4 text-sage-green'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                30-day return policy
              </li>
            </ul>
          </div>
        </div>
      </ViewportFadeIn>
    </div>
  );
}

export default ProductDetails;
