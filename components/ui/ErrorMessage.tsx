/**
 * ErrorMessage Component
 *
 * A reusable error message component for displaying cart operation errors.
 * Includes dismiss functionality and proper styling.
 *
 * Features:
 * - Dismissible error messages
 * - Different error types (error, warning, info)
 * - Accessible design with proper ARIA attributes
 * - Smooth animations
 */

import { useState } from 'react'

interface ErrorMessageProps {
  message: string
  type?: 'error' | 'warning' | 'info'
  onDismiss?: () => void
  className?: string
}

const typeStyles = {
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

export function ErrorMessage({
  message,
  type = 'error',
  onDismiss,
  className = ''
}: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg ${typeStyles[type]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>

      {onDismiss && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-current hover:opacity-75 transition-opacity"
          aria-label="Dismiss error"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
