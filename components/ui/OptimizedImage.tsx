/**
 * OptimizedImage Component
 * 
 * Enhanced image component with progressive loading, blur placeholders,
 * and WebP support. Provides better performance and user experience.
 */

'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Fill container instead of fixed dimensions */
  fill?: boolean;
  /** CSS classes to apply */
  className?: string;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Optional blur placeholder */
  blurDataURL?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  if (hasError) {
    return (
      <div 
        className={`bg-light-gray flex items-center justify-center ${className}`}
        role="img"
        aria-label={`Failed to load: ${alt}`}
      >
        <div className="text-warm-gray text-sm text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <div>Image unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading state with blur placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-light-gray animate-pulse">
          <Image
            src={defaultBlurDataURL}
            alt=""
            fill
            className="object-cover blur-sm"
            unoptimized
          />
        </div>
      )}
      
      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        placeholder="blur"
        blurDataURL={defaultBlurDataURL}
      />
    </div>
  );
});

/**
 * Product image with optimized settings for product cards
 */
export const ProductImage = memo(function ProductImage({
  src,
  alt,
  className = '',
  priority = false,
}: Pick<OptimizedImageProps, 'src' | 'alt' | 'className' | 'priority'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={`aspect-square ${className}`}
      priority={priority}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
});

/**
 * Hero image with optimized settings for hero sections
 */
export const HeroImage = memo(function HeroImage({
  src,
  alt,
  className = '',
}: Pick<OptimizedImageProps, 'src' | 'alt' | 'className'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      priority={true}
      sizes="100vw"
    />
  );
});
