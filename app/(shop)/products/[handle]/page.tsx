import { notFound } from 'next/navigation';

import { getCachedProductWithRevalidation } from '@/lib/cache/data-cache';
import { LazyProductDetails } from '@/components/product/LazyProductDetails';
import { searchProducts } from '@/lib/shopify/client';

function normalizeHandle(rawHandle: string): string {
  if (!rawHandle) {
    return '';
  }

  let decoded = rawHandle;
  try {
    decoded = decodeURIComponent(rawHandle);
  } catch {
    decoded = rawHandle;
  }

  const symbolReplacements: Record<string, string> = {
    '©': 'c',
    '®': 'r',
    '™': 'tm',
    '&': 'and',
    '⁄': '/',
  };

  const replaced = decoded.replace(
    /[©®™&⁄]/g,
    match => symbolReplacements[match] ?? ''
  );

  return replaced
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateHandleCandidates(rawHandle: string): string[] {
  if (!rawHandle) return [];

  const candidates = new Set<string>();

  let decoded = rawHandle;
  try {
    decoded = decodeURIComponent(rawHandle);
  } catch {
    decoded = rawHandle;
  }

  candidates.add(rawHandle);
  candidates.add(decoded);

  const normalized = normalizeHandle(decoded);
  if (normalized) candidates.add(normalized);

  const copyrightAsC = normalizeHandle(decoded.replace(/©/g, 'c'));
  if (copyrightAsC) candidates.add(copyrightAsC);

  const copyrightRemoved = normalizeHandle(decoded.replace(/©/g, ''));
  if (copyrightRemoved) candidates.add(copyrightRemoved);

  const ampersandAsAnd = normalizeHandle(decoded.replace(/&/g, 'and'));
  if (ampersandAsAnd) candidates.add(ampersandAsAnd);

  return Array.from(candidates).filter(Boolean);
}

// Generate metadata for SEO
async function fetchProductByPossibleHandles(rawHandle: string) {
  const handlesToTry = generateHandleCandidates(rawHandle);

  for (const handle of handlesToTry) {
    try {
      const product = await getCachedProductWithRevalidation(handle);
      if (product) {
        return { product, handle };
      }
    } catch {
      // Continue trying other handles
    }
  }

  const fallbackNormalized = normalizeHandle(rawHandle);

  try {
    const searchQuery = fallbackNormalized.replace(/-/g, ' ').trim();
    if (searchQuery) {
      const results = await searchProducts(searchQuery, 1);
      if (results?.[0]) {
        return { product: results[0], handle: results[0].handle };
      }
    }
  } catch {
    // ignore search errors
  }

  return { product: null, handle: fallbackNormalized };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { product } = await fetchProductByPossibleHandles(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title} | Printed Poster`,
    description: product.description || `Buy ${product.title} online`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images?.edges[0]?.node?.url
        ? [product.images.edges[0].node.url]
        : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const { product } = await fetchProductByPossibleHandles(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <LazyProductDetails product={product} />
      </div>
    </div>
  );
}
