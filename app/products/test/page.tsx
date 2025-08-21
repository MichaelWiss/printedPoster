import { getProducts } from '@/lib/shopify/client';

export default async function ProductsPage() {
  try {
    // Fetch first 5 products as a test
    const products = await getProducts(5);
    
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Products Test Page</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">
          {error instanceof Error ? error.message : 'Failed to load products'}
        </p>
      </div>
    );
  }
}
