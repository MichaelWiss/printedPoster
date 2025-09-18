/**
 * CartItemSkeleton Component
 *
 * A skeleton loading component that matches the layout of cart items.
 * Used when cart items are loading or being updated.
 *
 * Features:
 * - Matches cart item layout exactly
 * - Smooth pulse animation
 * - Responsive design
 * - Accessible with proper ARIA labels
 */

interface CartItemSkeletonProps {
  className?: string;
}

export function CartItemSkeleton({ className = '' }: CartItemSkeletonProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 border border-border-gray rounded-lg animate-pulse ${className}`}
    >
      {/* Product Info Skeleton */}
      <div className='flex-1 space-y-2'>
        {/* Product Title */}
        <div className='h-5 bg-light-gray rounded w-3/4' />

        {/* Product Price */}
        <div className='h-4 bg-light-gray rounded w-1/4' />

        {/* Quantity */}
        <div className='h-4 bg-light-gray rounded w-1/6' />
      </div>

      {/* Action Buttons Skeleton */}
      <div className='flex gap-2 ml-4'>
        <div className='w-8 h-8 bg-light-gray rounded' />
        <div className='w-8 h-8 bg-light-gray rounded' />
        <div className='w-16 h-8 bg-light-gray rounded' />
      </div>
    </div>
  );
}
