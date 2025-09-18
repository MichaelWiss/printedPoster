/**
 * LazyLoadingFallback Component
 * 
 * Provides a consistent loading state for lazy-loaded components.
 * Includes skeleton loaders and proper accessibility attributes.
 */

import { memo } from 'react';

import { LoadingSpinner } from './LoadingSpinner';

interface LazyLoadingFallbackProps {
  /** Optional message to display while loading */
  message?: string;
  /** Size of the loading spinner */
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

export const LazyLoadingFallback = memo(function LazyLoadingFallback({
  message = 'Loading...',
  spinnerSize = 'md',
  className = '',
}: LazyLoadingFallbackProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner size={spinnerSize} color="primary" />
      <p className="mt-4 text-sm text-warm-gray">{message}</p>
    </div>
  );
});

/**
 * Skeleton loader for product cards
 */
export const ProductCardSkeleton = memo(function ProductCardSkeleton() {
  return (
    <div className="card group animate-pulse">
      <div className="relative bg-light-gray aspect-square overflow-hidden rounded-t-lg">
        <div className="w-full h-full bg-sage-green/20" />
      </div>
      <div className="p-4">
        <div className="h-6 bg-sage-green/20 rounded mb-2" />
        <div className="h-4 bg-sage-green/20 rounded mb-3" />
        <div className="h-4 bg-sage-green/20 rounded w-3/4 mb-3" />
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 bg-sage-green/20 rounded w-20" />
          <div className="h-4 bg-sage-green/20 rounded w-24" />
        </div>
        <div className="h-10 bg-sage-green/20 rounded" />
      </div>
    </div>
  );
});

/**
 * Skeleton loader for cart drawer
 */
export const CartDrawerSkeleton = memo(function CartDrawerSkeleton() {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-cream-base shadow-medium p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-sage-green/20 rounded w-24" />
        <div className="h-4 bg-sage-green/20 rounded w-16" />
      </div>
      
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-3 p-3 border border-sage-green/20 rounded">
            <div className="w-16 h-16 bg-sage-green/20 rounded" />
            <div className="flex-1">
              <div className="h-4 bg-sage-green/20 rounded mb-2" />
              <div className="h-3 bg-sage-green/20 rounded w-3/4 mb-2" />
              <div className="h-4 bg-sage-green/20 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Skeleton loader for product details
 */
export const ProductDetailsSkeleton = memo(function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="aspect-square bg-light-gray rounded-lg animate-pulse">
          <div className="w-full h-full bg-sage-green/20 rounded-lg" />
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-sage-green/20 rounded w-3/4" />
          <div className="h-6 bg-sage-green/20 rounded w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-sage-green/20 rounded" />
            <div className="h-4 bg-sage-green/20 rounded w-5/6" />
            <div className="h-4 bg-sage-green/20 rounded w-4/6" />
          </div>
          <div className="h-12 bg-sage-green/20 rounded w-full" />
        </div>
      </div>
    </div>
  );
});
