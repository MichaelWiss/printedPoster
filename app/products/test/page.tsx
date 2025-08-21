// Import the getProducts function from our Shopify client
import { getProducts } from '@/lib/shopify/client';

// This is a Server Component that will fetch and display products
// Using 'async' allows us to fetch data directly in the component
export default async function ProductsPage() {
  try {
    // Attempt to fetch the first 5 products from Shopify
    // This is a small number suitable for testing
    const products = await getProducts(5);
    
    // If products are successfully fetched, render them
    return (
      <div className="p-4">
        {/* Page title */}
        <h1 className="text-2xl font-bold mb-4">Products Test Page</h1>
        
        {/* 
          Display raw product data in a preformatted block
          - Using pre tag keeps formatting
          - JSON.stringify with parameters:
            - products: the data to stringify
            - null: no replacer function
            - 2: number of spaces for indentation
        */}
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    // If an error occurs during fetch, show error message
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        {/* 
          Display error message
          - Check if error is an Error instance for proper typing
          - Fallback to generic message if not
        */}
        <p className="text-red-500">
          {error instanceof Error ? error.message : 'Failed to load products'}
        </p>
      </div>
    );
  }
}
