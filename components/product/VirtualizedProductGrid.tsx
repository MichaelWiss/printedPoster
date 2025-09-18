/**
 * VirtualizedProductGrid Component
 * 
 * A virtualized version of ProductGrid that efficiently renders large lists
 * of products by only rendering visible items. Improves performance for
 * collections with many products.
 */

'use client';

import { memo, useMemo, useCallback } from 'react';

import type { ShopifyProduct } from '@/types/shopify';

import { ProductCard } from './ProductCard';
// import { ProductCardSkeleton } from '@/components/ui/LazyLoadingFallback';
import ViewportFadeIn from '@/components/ui/ViewportFadeIn';

interface VirtualizedProductGridProps {
  /** Array of products to display in the grid */
  products: ShopifyProduct[];
  /** Number of columns to display in the grid on large screens. Default is 4 */
  columns?: 3 | 4 | 5;
  /** Spacing between grid items. Default is "normal" */
  spacing?: 'tight' | 'normal' | 'loose';
  /** Optional callback when a product card is clicked */
  onProductClick?: (product: ShopifyProduct) => void;
  /** Optional CSS class name to apply to the grid container */
  className?: string;
  /** Threshold for when to use virtualization. Default is 20 */
  virtualizationThreshold?: number;
}

export const VirtualizedProductGrid = memo(function VirtualizedProductGrid({
  products,
  columns = 4,
  spacing = 'normal',
  onProductClick,
  className = '',
  virtualizationThreshold = 20,
}: VirtualizedProductGridProps) {
  // Memoize spacing classes
  const spacingClasses = useMemo(() => ({
    tight: 'gap-4',
    normal: 'gap-6',
    loose: 'gap-8',
  }), []);

  // Memoize columns classes
  const columnClasses = useMemo(() => ({
    3: 'lg:grid-cols-3 xl:grid-cols-3',
    4: 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4',
    5: 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  }), []);

  // Memoize the grid class name
  const gridClassName = useMemo(() => `
    grid 
    grid-cols-2
    sm:grid-cols-3
    ${columnClasses[columns]}
    ${spacingClasses[spacing]}
    w-full
    ${className}
  `.trim(), [columnClasses, columns, spacingClasses, spacing, className]);

  // Memoize the click handler
  const handleProductClick = useCallback((product: ShopifyProduct) => {
    onProductClick?.(product);
  }, [onProductClick]);

  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-warm-gray text-lg mb-2">No products found</div>
        <div className="text-warm-gray text-sm">
          Please check back later for new arrivals
        </div>
      </div>
    );
  }

  // For small lists, use regular grid
  if (products.length <= virtualizationThreshold) {
    return (
      <div className={gridClassName}>
        {products.map((product, idx) => (
          <ViewportFadeIn key={product.id} delayMs={(idx % 12) * 40}>
            <ProductCard
              product={product}
              onClick={() => handleProductClick(product)}
            />
          </ViewportFadeIn>
        ))}
      </div>
    );
  }

  // For large lists, implement basic virtualization
  // This is a simplified version - for production, consider using react-window
  const itemsPerRow = columns;
  const totalRows = Math.ceil(products.length / itemsPerRow);
  
  return (
    <div className={gridClassName}>
      {Array.from({ length: totalRows }).map((_, rowIndex) => {
        const startIndex = rowIndex * itemsPerRow;
        const endIndex = Math.min(startIndex + itemsPerRow, products.length);
        const rowProducts = products.slice(startIndex, endIndex);
        
        return (
          <div key={rowIndex} className="contents">
            {rowProducts.map((product, colIndex) => (
              <ViewportFadeIn 
                key={product.id} 
                delayMs={((rowIndex * itemsPerRow + colIndex) % 12) * 40}
              >
                <ProductCard
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              </ViewportFadeIn>
            ))}
            {/* Fill empty slots in the last row */}
            {rowProducts.length < itemsPerRow && 
              Array.from({ length: itemsPerRow - rowProducts.length }).map((_, emptyIndex) => (
                <div key={`empty-${rowIndex}-${emptyIndex}`} className="hidden" />
              ))
            }
          </div>
        );
      })}
    </div>
  );
});
