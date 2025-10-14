// Collection-based product type detection (no metafields needed)
import { ProductType } from '@/types/product-types';

// Collection handles for product types
const COLLECTION_HANDLES = {
  MASS_PRODUCED: 'mass-produced-items',
  ONE_OF_A_KIND: 'one-of-a-kind-artworks'
} as const;

export function detectProductTypeFromCollections(collections: { handle?: string; node?: { handle?: string } }[]): ProductType {
  const collectionHandles = collections.map(c => c.handle || c.node?.handle).filter(Boolean);
  
  // Check for one-of-a-kind first (more specific)
  if (collectionHandles.includes(COLLECTION_HANDLES.ONE_OF_A_KIND)) {
    return ProductType.ONE_OF_A_KIND;
  }
  
  // Check for mass-produced
  if (collectionHandles.includes(COLLECTION_HANDLES.MASS_PRODUCED)) {
    return ProductType.MASS_PRODUCED;
  }
  
  // Default fallback for existing products not yet categorized
  return ProductType.MASS_PRODUCED;
}

export function getProductTypeCollectionQuery() {
  return `
    collections(first: 10) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  `;
}

// Enhanced product data based on collection membership
export function enrichProductFromCollections(product: { collections?: { edges: { node: { handle: string } }[] }; title: string; [key: string]: unknown }) {
  const collections = product.collections?.edges || [];
  const productType = detectProductTypeFromCollections(collections);
  
  // Base enriched product
  const enriched = {
    ...product,
    type: productType,
    collections: collections.map(edge => edge.node)
  };
  
  // For one-of-a-kind products, you can still add manual data
  // or extract from product title/description using heuristics
  if (productType === ProductType.ONE_OF_A_KIND) {
    return {
      ...enriched,
      // Extract artist from title if follows pattern: "Artwork Title - Artist Name"
      artist: extractArtistFromTitle(product.title),
      // Mark as unique
      isUnique: true,
      // Default authenticity (can be overridden with metafields later)
      authenticity: {
        certificate: true, // Assume one-of-a-kind items have certificates
        signature: true,
        edition: "Original 1/1"
      }
    };
  }
  
  return enriched;
}

function extractArtistFromTitle(title: string): string | undefined {
  // Try to extract artist from patterns like:
  // "Sunset Landscape - Maria Rodriguez"
  // "Abstract #47 by John Smith"
  const patterns = [
    / - (.+)$/,           // "Title - Artist"
    / by (.+)$/i,         // "Title by Artist"  
    /\((.+)\)$/           // "Title (Artist)"
  ];
  
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return undefined;
}

// Helper for adding products to appropriate collections
export function getCollectionIdForProductType(productType: ProductType): string {
  switch (productType) {
    case ProductType.ONE_OF_A_KIND:
      return COLLECTION_HANDLES.ONE_OF_A_KIND;
    case ProductType.MASS_PRODUCED:
      return COLLECTION_HANDLES.MASS_PRODUCED;
    default:
      return COLLECTION_HANDLES.MASS_PRODUCED;
  }
}