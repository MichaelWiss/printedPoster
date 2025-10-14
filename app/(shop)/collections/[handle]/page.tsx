import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionByHandle, mapCollectionSort } from '@/lib/shopify/client';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { Metadata } from 'next';

// Optimize with dynamic imports for better performance
import dynamic from 'next/dynamic';
const CollectionFiltersDynamic = dynamic(
  () =>
    import('@/components/collections/CollectionFilters').then(mod => ({
      default: mod.CollectionFilters,
    })),
  {
    loading: () => <div className='h-16 bg-light-gray animate-pulse rounded' />,
  }
);
import TopControls from '@/components/collections/TopControls';
const CollectionSortDynamic = dynamic<{
  selected?: string;
}>(() => import('../../../../components/collections/CollectionSort'), {
  loading: () => (
    <div className='h-10 w-40 bg-light-gray animate-pulse rounded' />
  ),
});

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
  searchParams?: Promise<{
    tags?: string;
    sort?: string;
    after?: string;
    priceMin?: string;
    priceMax?: string;
  }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: 'Collection Not Found - Printed Poster',
    };
  }

  return {
    title: `${collection.title} - Printed Poster`,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { handle } = await params;
  const sp = (await searchParams) || {};
  const selectedTags = (sp.tags || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const { sortKey, reverse } = mapCollectionSort(sp.sort);
  const filters = selectedTags.length
    ? selectedTags.map(tag => ({ tag }))
    : undefined;
  const first = 24;
  const collection = await getCollectionByHandle(handle, {
    first,
    filters,
    sortKey,
    reverse,
    after: sp.after || null,
  });

  if (!collection) {
    notFound();
  }

  const productConnection = collection.products;
  let products = productConnection.edges.map(edge => edge.node);
  const min = sp.priceMin ? parseFloat(sp.priceMin) : undefined;
  const max = sp.priceMax ? parseFloat(sp.priceMax) : undefined;
  if (!Number.isNaN(min) || !Number.isNaN(max)) {
    products = products.filter(p => {
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      if (Number.isNaN(price)) return false;
      if (min !== undefined && price < (min as number)) return false;
      if (max !== undefined && price > (max as number)) return false;
      return true;
    });
  }

  // Build available tags from collection products (first 200 distinct)
  const availableTags = Array.from(
    new Set(products.flatMap(p => p.tags || []))
  ).slice(0, 200);

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumbs */}
      <nav className='mb-6'>
        <div className='text-sm text-warm-gray'>
          <Link href='/' className='hover:text-sage-green transition-colors'>
            Home
          </Link>
          <span className='mx-2'>/</span>
          <Link
            href='/collections'
            className='hover:text-sage-green transition-colors'
          >
            Collections
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-deep-charcoal'>{collection.title}</span>
        </div>
      </nav>

      {/* Collection Header */}
      <div className='text-center mb-12 border-b border-sage-green/20 pb-8'>
        <h1 className='text-4xl font-display font-semibold text-deep-charcoal mb-4'>
          {collection.title}
        </h1>
        <p className='text-lg text-warm-gray max-w-3xl mx-auto leading-relaxed'>
          {collection.description}
        </p>

      </div>

      {/* Top controls: Filter (left) + Sort (right) */}
      {/* Mobile: keep existing filters UI + sort on right */}
      <div className='md:hidden flex items-center justify-between gap-4 mb-6'>
        <CollectionFiltersDynamic
          availableTags={availableTags}
          selectedTags={selectedTags}
        />
        <CollectionSortDynamic selected={sp.sort || ''} />
      </div>

      {/* Desktop: show visual TopControls (Filter left + Sort right) per mock */}
      <TopControls
        sortSelected={sp.sort || ''}
        availableTags={availableTags}
        selectedTags={selectedTags}
      />

      {/* Grid only (keeping sidebar out for visual pass) */}
      <div className='flex-1'>
        <ProductGrid 
          products={products} 
          columns={4} 
          spacing='normal' 
          enableScrollAnimations={true}
        />
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className='text-center py-16'>
          <div className='text-warm-gray text-lg mb-2'>
            No products in this collection
          </div>
          <div className='text-warm-gray text-sm'>
            Please check back later for new arrivals
          </div>
        </div>
      )}

      {/* Pagination */}
      {productConnection.pageInfo?.hasNextPage && (
        <div className='mt-8 flex justify-center'>
          <Link
            href={{
              pathname: `/collections/${handle}`,
              query: {
                ...(sp.tags ? { tags: sp.tags } : {}),
                ...(sp.sort ? { sort: sp.sort } : {}),
                after: productConnection.pageInfo?.endCursor || '',
              },
            }}
            className='px-4 py-2 border border-sage-green/30 rounded hover:bg-sage-green/5'
          >
            Next Page
          </Link>
        </div>
      )}

      {/* Related Collections */}
      {products.length > 0 && (
        <div className='mt-16 border-t border-sage-green/20 pt-12'>
          <h2 className='text-2xl font-display font-medium text-deep-charcoal text-center mb-8'>
            Explore More Collections
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Link
              href='/collections/abstract-art'
              className='group p-6 bg-white border border-sage-green/20 rounded-lg hover:shadow-md transition-all duration-300 hover:border-sage-green'
            >
              <h3 className='font-medium text-deep-charcoal mb-2 group-hover:text-sage-green transition-colors'>
                Abstract Art
              </h3>
              <p className='text-sm text-warm-gray'>
                Contemporary abstract compositions
              </p>
            </Link>
            <Link
              href='/collections/typography'
              className='group p-6 bg-white border border-sage-green/20 rounded-lg hover:shadow-md transition-all duration-300 hover:border-sage-green'
            >
              <h3 className='font-medium text-deep-charcoal mb-2 group-hover:text-sage-green transition-colors'>
                Typography
              </h3>
              <p className='text-sm text-warm-gray'>
                Letterforms and typographic art
              </p>
            </Link>
            <Link
              href='/collections/architecture'
              className='group p-6 bg-white border border-sage-green/20 rounded-lg hover:shadow-md transition-all duration-300 hover:border-sage-green'
            >
              <h3 className='font-medium text-deep-charcoal mb-2 group-hover:text-sage-green transition-colors'>
                Architecture
              </h3>
              <p className='text-sm text-warm-gray'>
                Architectural studies and blueprints
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

//
