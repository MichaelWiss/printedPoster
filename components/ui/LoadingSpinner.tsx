/**
 * LoadingSpinner Component
 *
 * A reusable loading spinner component with different sizes and colors.
 * Uses Tailwind CSS animations for smooth loading effects.
 *
 * Features:
 * - Multiple sizes (xs, sm, md, lg, xl)
 * - Customizable colors
 * - Accessible with proper ARIA labels
 * - Smooth CSS animations
 */

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'white'
  className?: string
  'aria-label'?: string
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const colorClasses = {
  primary: 'border-terracotta',
  secondary: 'border-sage-green',
  accent: 'border-warm-taupe',
  white: 'border-white'
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
  'aria-label': ariaLabel = 'Loading...'
}: LoadingSpinnerProps) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}
