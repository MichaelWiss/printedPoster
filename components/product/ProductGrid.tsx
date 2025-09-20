/**
 * ProductGrid Component
 *
 * Displays a responsive grid of product cards with mobile-first responsive breakpoints.
 * Layout: 1 col (mobile) → 2 cols (tablet) → 3-5 cols (desktop/ultra-wide)
 * Handles the layout, spacing, and empty states of ProductCard components.
 */

'use client';

import { memo, useMemo, useEffect, useRef } from 'react';

import type { ShopifyProduct } from '@/types/shopify';

import { ProductCard } from './ProductCard';

/**
 * Props interface for the ProductGrid component
 *
 * @interface ProductGridProps
 * @example
 * // Basic usage
 * <ProductGrid products={products} />
 *
 * // With optional props
 * <ProductGrid
 *   products={products}
 *   columns={5}
 *   spacing="loose"
 *   onProductClick={(product) => console.log(product)}
 * />
 */
interface ProductGridProps {
  /** Array of products to display in the grid */
  products: ShopifyProduct[];

  /** Number of columns to display in the grid on large screens. Default is 4 */
  columns?: 3 | 4 | 5;

  /** Spacing between grid items. Default is "normal" */
  spacing?: 'tight' | 'normal' | 'loose';


  /** Optional CSS class name to apply to the grid container */
  className?: string;

  /** Enable scroll animations. Default is true */
  enableScrollAnimations?: boolean;
}

export const ProductGrid = memo(function ProductGrid({
  products,
  columns = 4,
  spacing = 'normal',
  className = '',
  enableScrollAnimations = true,
}: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Memoize spacing classes based on the spacing prop
  const spacingClasses = useMemo(
    () => ({
      tight: 'gap-4',
      normal: 'gap-6',
      loose: 'gap-8',
    }),
    []
  );

  // Memoize columns classes based on the columns prop with enhanced responsive breakpoints
  const columnClasses = useMemo(
    () => ({
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    }),
    []
  );

  // Memoize the grid class name to prevent unnecessary recalculations
  const gridClassName = useMemo(
    () =>
      `
    grid 
    ${columnClasses[columns]}
    ${spacingClasses[spacing]}
    w-full
    ${className}
  `.trim(),
    [columnClasses, columns, spacingClasses, spacing, className]
  );


  // Simple scroll animation initialization
  useEffect(() => {
    if (!enableScrollAnimations || !gridRef.current) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe only cards within this specific grid
    const cards = gridRef.current.querySelectorAll('.card');
    cards.forEach(card => {
      observer.observe(card);
    });

    // Cleanup
    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [enableScrollAnimations, products]);

  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='text-warm-gray text-lg mb-2'>No products found</div>
        <div className='text-warm-gray text-sm'>
          Please check back later for new arrivals
        </div>
      </div>
    );
  }

  // Helper function to determine animation direction
  const getAnimationDirection = (index: number): 'left' | 'right' | undefined => {
    if (!enableScrollAnimations) return undefined;
    
    const row = Math.floor(index / columns);
    return row % 2 === 0 ? 'left' : 'right';
  };

  return (
    <div ref={gridRef} className={gridClassName}>
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          animationDirection={getAnimationDirection(idx)}
        />
      ))}
    </div>
  );
});
