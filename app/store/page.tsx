import Image from 'next/image'
import { getProducts } from '@/lib/shopify/services'

export default async function StorePage() {
  try {
    console.log('Fetching products...');
    const products = await getProducts(12)
    console.log('Products fetched:', products);
    
    if (!products?.edges) {
      throw new Error('No products found in the response');
    }
    
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.edges.map(({ node: product }) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
              {product.images?.edges?.[0] && (
                <div className="relative h-64">
                  <Image
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText || product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">
                    {product.priceRange?.minVariantPrice ? (
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: product.priceRange.minVariantPrice.currencyCode || 'USD'
                      }).format(parseFloat(product.priceRange.minVariantPrice.amount))
                    ) : (
                      'Price not available'
                    )}
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error in StorePage:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <p className="text-red-600">Error loading products. Please try again later.</p>
          <pre className="mt-2 text-sm text-red-500">{error instanceof Error ? error.message : 'Unknown error'}</pre>
        </div>
      </main>
    )
  }
}
