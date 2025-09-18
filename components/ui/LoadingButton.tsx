/**
 * LoadingButton Component
 *
 * A button component that shows loading state during async operations.
 * Perfect for cart operations like add to cart, remove item, etc.
 *
 * Features:
 * - Loading spinner integration
 * - Disabled state during loading
 * - Maintains button size to prevent layout shift
 * - Customizable loading text and spinner
 */

import { memo } from 'react';

import { LoadingSpinner } from './LoadingSpinner';
import { buttonUtils } from '@/lib/design-tokens/component-utils';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spinnerColor?: 'primary' | 'secondary' | 'accent' | 'white';
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const LoadingButton = memo(function LoadingButton({
  loading = false,
  loadingText,
  spinnerSize = 'sm',
  spinnerColor = 'white',
  variant = 'primary',
  disabled,
  children,
  className = '',
  ...props
}: LoadingButtonProps) {
  const isDisabled = disabled || loading;
  
  // Get Huncwot button classes if no custom className is provided
  const buttonClasses = className.includes('btn-') 
    ? className 
    : `${buttonUtils.getHuncwotButtonClasses(variant)} ${className}`;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`relative inline-flex items-center justify-center gap-2 transition-all duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${buttonClasses}`}
    >
      {loading && (
        <LoadingSpinner
          size={spinnerSize}
          color={spinnerColor}
          aria-label='Loading'
        />
      )}
      <span className={loading ? 'opacity-75' : ''}>
        {loading && loadingText ? loadingText : children}
      </span>
    </button>
  );
});
