import { searchProducts } from '@/lib/shopify/client';
import { ProductGrid } from '@/components/product/ProductGrid';

export const revalidate = 0; // always fresh for dynamic queries

interface SearchPageProps {
  searchParams?: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = (await searchParams) || {};
  const q = (sp.q || '').trim();

  if (!q) {
    return (
      <section className='py-12 container mx-auto px-4'>
        <h1 className='text-2xl font-display mb-4'>Search</h1>
        <p className='text-warm-gray'>
          Type a query in the search bar to find products.
        </p>
      </section>
    );
  }

  const products = await searchProducts(q, 24);

  return (
    <section className='py-12 container mx-auto px-4'>
      <h1 className='text-2xl font-display mb-6'>Results for “{q}”</h1>
      {products.length === 0 ? (
        <div className='text-warm-gray'>
          No results. Try a different term or visit the products page.
        </div>
      ) : (
            <ProductGrid
              products={products}
              enableScrollAnimations={true}
            />
      )}
    </section>
  );
}
