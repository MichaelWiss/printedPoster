/**
 * Store Loading Component
 * 
 * Displays a loading skeleton UI while the store page data is being fetched.
 * Uses Tailwind's animate-pulse for loading animations.
 * Matches the layout of the actual store page for a smooth transition.
 */

export default function StoreLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Loading skeleton for the page title */}
      <div className="h-8 w-48 bg-light-gray rounded animate-pulse mb-8" />

      {/* Grid container matching the product grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Generate 6 placeholder cards */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            {/* Placeholder for product image */}
            <div className="h-64 bg-light-gray animate-pulse" />
            
            {/* Placeholder for product details */}
            <div className="p-4">
              {/* Placeholder for product title */}
              <div className="h-6 w-3/4 bg-light-gray rounded animate-pulse mb-2" />
              {/* Placeholder for product description */}
              <div className="h-4 bg-light-gray rounded animate-pulse mb-4" />
              
              {/* Placeholders for price and button */}
              <div className="flex justify-between items-center">
                <div className="h-6 w-20 bg-light-gray rounded animate-pulse" />
                <div className="h-10 w-24 bg-light-gray rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
