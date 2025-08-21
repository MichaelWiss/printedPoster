import { graphqlClient } from '@/lib/graphql/client';
import { GetProductsDocument } from '@/lib/graphql/generated/graphql';

export default async function ProductsPage() {
  const { products } = await graphqlClient.request(GetProductsDocument, {
    first: 10,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.edges.map(({ node: product }) => (
        <div key={product.id} className="border rounded-lg p-4">
          {product.images.edges[0] && (
            <img
              src={product.images.edges[0].node.url}
              alt={product.images.edges[0].node.altText || product.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          <h2 className="text-xl font-bold mt-2">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold mt-2">
            {product.priceRange.minVariantPrice.amount}{' '}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
        </div>
      ))}
    </div>
  );
}
