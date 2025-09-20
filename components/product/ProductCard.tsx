/**
 * ProductCard Component
 *
 * Displays a single product in a card format with image, title, description, and price.
 * Links to the product detail page and includes hover effects.
 */

'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ShopifyProduct } from '@/types/shopify';

// Define the props interface for type safety
interface ProductCardProps {
  /** The product data to display */
  product: ShopifyProduct;
  /** Animation direction: 'left' or 'right' */
  animationDirection?: 'left' | 'right';
}

export const ProductCard = memo(function ProductCard({
  product,
  animationDirection = 'left',
}: ProductCardProps) {
  // Extract the first image from the product's images array
  const firstImage = product.images?.edges[0]?.node;
  // Get the price information
  const price = product.priceRange?.minVariantPrice;

  // Generate a gradient class based on product ID for variety
  const gradientClasses = [
    'gradient-sage',
    'gradient-terracotta', 
    'gradient-dusty',
    'gradient-coral',
    'gradient-mustard',
    'gradient-lavender'
  ];
  const gradientClass = gradientClasses[product.id.length % gradientClasses.length];

  // Simple animation class - just add 'right' for right side cards
  const cardClasses = animationDirection === 'right' ? 'card right' : 'card';

  return (
    // Card container with Next.js Link for fast navigation
    <Link 
      href={`/products/${product.handle}`}
      prefetch={true}
      className={`${cardClasses} group cursor-pointer block`}
      aria-label={`View details for ${product.title}`}
    >
      {/* Product image section with gradient background */}
      <div className='relative overflow-hidden'>
        <div className={`${gradientClass} w-full h-64 flex items-center justify-center`}>
          {firstImage ? (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              width={200}
              height={200}
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              loading="lazy"
            />
          ) : (
            <span className='text-white font-display text-5xl'>1</span>
          )}
        </div>
        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300' />
      </div>
      {/* Product information section */}
      <div className='p-4 md:p-6'>
        <h4 className='text-lg md:text-hierarchy-h3 mb-2 md:mb-3'>{product.title}</h4>
        <p className='text-sm md:text-body-small mb-3 md:mb-4 line-clamp-2'>{product.description}</p>
        <div className='flex items-center justify-between mb-3 md:mb-4'>
          <span className='text-base md:text-price font-semibold'>
            {price
              ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currencyCode || 'USD',
                }).format(parseFloat(price.amount))
              : '—'}
          </span>
          <span className='text-xs md:text-caption bg-light-sage px-2 py-1 rounded-full'>Free shipping</span>
        </div>
        <div className='add-to-cart-btn min-h-[44px]'>
          <div className='quantity-section'>
            <span className='quantity-btn min-h-[32px] min-w-[32px]'>−</span>
            <span className='quantity-display'>1</span>
            <span className='quantity-btn min-h-[32px] min-w-[32px]'>+</span>
          </div>
          <div className='divider' />
          <div className='add-to-cart-section min-h-[32px] flex items-center justify-center'>Add to Cart</div>
        </div>
      </div>
    </Link>
  );
});
