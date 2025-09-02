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

import { LoadingSpinner } from './LoadingSpinner'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  spinnerColor?: 'primary' | 'secondary' | 'accent' | 'white'
  children: React.ReactNode
}

export function LoadingButton({
  loading = false,
  loadingText,
  spinnerSize = 'sm',
  spinnerColor = 'white',
  disabled,
  children,
  className = '',
  ...props
}: LoadingButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`relative inline-flex items-center justify-center gap-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading && (
        <LoadingSpinner
          size={spinnerSize}
          color={spinnerColor}
          aria-label="Loading"
        />
      )}
      <span className={loading ? 'opacity-75' : ''}>
        {loading && loadingText ? loadingText : children}
      </span>
    </button>
  )
}
