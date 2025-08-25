'use client'

/**
 * Store Error Component
 * 
 * Client-side error boundary component for the store page.
 * Displays when an error occurs while loading the store or its products.
 * Provides a way to retry the operation through a reset button.
 * 
 * @param {Object} props - Component props
 * @param {Error} props.error - The error object containing the error details
 * @param {Function} props.reset - Function to reset the error boundary and retry the operation
 */
export default function StoreError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Error message container */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        {/* Error heading */}
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        
        {/* Error message display */}
        <p className="text-warm-gray mb-4">{error.message}</p>
        
        {/* Reset button to retry the operation */}
        <button
          onClick={() => reset()}
          className="bg-sage-green text-cream-base px-4 py-2 rounded hover:bg-sage-green/80 transition-colors"
          aria-label="Try loading the store again"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
