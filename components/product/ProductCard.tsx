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
import { AdvancedAddToCartButton } from './AdvancedAddToCartButton';

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
    // Card container with separate clickable areas to prevent navigation conflicts
    <div className={`${cardClasses} group cursor-pointer`}>
      {/* Product image section with gradient background - clickable for navigation */}
      <Link 
        href={`/products/${product.handle}`}
        prefetch={true}
        className='block'
        aria-label={`View details for ${product.title}`}
      >
        <div className='relative overflow-hidden'>
          <div className={`${gradientClass} w-full aspect-[3/4] flex items-center justify-center p-6 sm:p-8`}>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                width={200}
                height={200}
                className='object-contain transition-transform duration-300 group-hover:scale-105'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                loading="lazy"
              />
            ) : (
              <span className='text-white font-display text-5xl'>1</span>
            )}
          </div>
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300' />
        </div>
      </Link>
      {/* Product information section */}
      <div className='p-4 md:p-6'>
        {/* Title and description - clickable for navigation */}
        <Link 
          href={`/products/${product.handle}`}
          prefetch={true}
          className='block mb-3 md:mb-4'
        >
          <h4 className='text-lg md:text-hierarchy-h3 mb-2 md:mb-3 line-clamp-2 hover:text-terracotta transition-colors'>{product.title}</h4>
          <p className='text-sm md:text-body-small line-clamp-2'>{product.description}</p>
        </Link>
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
        {/* Add to cart button - functional, non-navigating */}
        <AdvancedAddToCartButton
          product={product}
          className='w-full max-w-xs'
        />
      </div>
    </div>
  );
});
