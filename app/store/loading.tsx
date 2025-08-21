export default function StoreLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="h-64 bg-gray-200 animate-pulse" />
            <div className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex justify-between items-center">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
