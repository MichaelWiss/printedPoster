# Product Types System - Implementation Guide

## Overview

This system provides a clear distinction between two types of products in your e-commerce platform:

1. **Mass-Produced Products** - Items with multiple size variants and pricing tiers
2. **One-of-a-Kind Products** - Unique artworks with artist information and authenticity details

## Quick Start

Visit `/demo-product-types` to see both product types in action with interactive examples.

## Architecture

### Type System
- `ProductType` enum distinguishes between product types
- TypeScript interfaces ensure type safety
- Type guards (`isMassProduced()`, `isOneOfAKind()`) for runtime checks

### Components

#### Mass-Produced Products
- `MassProducedVariantSelector` - Expandable size/price selector
- Features: Radio button selection, delivery info, stock status
- Matches the design pattern from your reference screenshot

#### One-of-a-Kind Products
- `OneOfAKindDisplay` - Unique item presentation
- Features: Artist info, authenticity details, urgency messaging
- Distinct visual styling with terracotta accent color

#### Shared Components
- `QualitySpecs` - Paper quality and frame information
- Consistent across both product types

## Implementation Steps

### 1. Categorize Your Products
```typescript
import { ProductType } from '@/types/product-types';

// For mass-produced items
const product = {
  type: ProductType.MASS_PRODUCED,
  variants: [...], // Multiple size/price options
  // ...
};

// For unique items
const uniqueProduct = {
  type: ProductType.ONE_OF_A_KIND,
  artist: "Artist Name",
  authenticity: { certificate: true, signature: true },
  // ...
};
```

### 2. Conditional Rendering
```typescript
import { isMassProduced, isOneOfAKind } from '@/types/product-types';
import { MassProducedVariantSelector } from '@/components/product/MassProducedVariantSelector';
import { OneOfAKindDisplay } from '@/components/product/OneOfAKindDisplay';

function ProductDisplay({ product }) {
  if (isMassProduced(product)) {
    return (
      <MassProducedVariantSelector 
        product={product}
        onVariantChange={(variant) => console.log(variant)}
      />
    );
  }
  
  if (isOneOfAKind(product)) {
    return <OneOfAKindDisplay product={product} />;
  }
  
  return null;
}
```

### 3. Data Structure Examples

#### Mass-Produced Product
```typescript
const massProducedExample: MassProducedProduct = {
  id: 'mp-001',
  type: ProductType.MASS_PRODUCED,
  title: 'Architectural Print',
  variants: [
    {
      id: 'var-1',
      size: '8" x 12"',
      price: { amount: 17.45, currency: 'USD' },
      dimensions: { width: 8, height: 12, unit: 'in' },
      inStock: true,
    },
    // ... more variants
  ],
  deliveryInfo: {
    estimatedDays: '2-4 business days',
    freeShippingThreshold: 59,
  },
  // ...
};
```

#### One-of-a-Kind Product
```typescript
const uniqueExample: OneOfAKindProduct = {
  id: 'oak-001',
  type: ProductType.ONE_OF_A_KIND,
  title: 'Original Canvas Painting',
  price: { amount: 2850.00, currency: 'USD' },
  size: '24" x 36"',
  artist: 'Maria Rodriguez',
  authenticity: {
    certificate: true,
    signature: true,
    edition: 'Original 1/1',
  },
  // ...
};
```

## Visual Distinctions

### Mass-Produced Products
- **Color Scheme**: Sage green accents
- **Layout**: Expandable selector matching your reference
- **Features**: Multiple variants, delivery info, stock status
- **CTA**: Standard "Add to Cart" styling

### One-of-a-Kind Products  
- **Color Scheme**: Terracotta accents for uniqueness
- **Layout**: Single price display with artist information
- **Features**: Authenticity details, urgency messaging
- **CTA**: "Purchase Unique Piece" with distinct styling

## Integration with Shopify

### Product Metafields
Add custom metafields to distinguish product types:

```json
{
  "namespace": "custom",
  "key": "product_type",
  "value": "mass_produced" | "one_of_a_kind"
}
```

### GraphQL Queries
```graphql
query ProductDetails($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    variants(first: 10) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
        }
      }
    }
    metafield(namespace: "custom", key: "product_type") {
      value
    }
    # Add artist info, authenticity fields as needed
  }
}
```

## Styling Guidelines

Both components use the existing design system:
- Typography: `font-display` for headings, standard text classes
- Colors: `sage-green` for mass-produced, `terracotta` for unique
- Spacing: Consistent with 8px grid system
- Borders: `border-sage-green/20` for subtle outlines

## Best Practices

1. **Type Safety**: Always use TypeScript interfaces and type guards
2. **Consistent Styling**: Both components share design tokens
3. **Clear Distinction**: Visual cues immediately show product type
4. **User Experience**: Different flows optimize for each product type
5. **Accessibility**: Proper ARIA labels and semantic HTML

## Testing

The demo page at `/demo-product-types` includes:
- Interactive toggle between product types
- Real data examples
- Implementation notes
- Visual comparison

## Future Enhancements

- **Limited Editions**: Hybrid type for small-batch productions
- **Custom Framing**: Enhanced frame selection for both types
- **Artist Collections**: Grouping unique works by artist
- **Authenticity Blockchain**: NFT-style verification for unique pieces

## Support

For questions or customization needs, refer to the demo page or component documentation in the respective files.