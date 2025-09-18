# Code Style Guide & Efficiency Standards

## Printed Poster E-commerce Project

### Table of Contents

1. [General Principles](#general-principles)
2. [TypeScript Standards](#typescript-standards)
3. [React Component Guidelines](#react-component-guidelines)
4. [Performance Optimization](#performance-optimization)
5. [Styling Standards](#styling-standards)
6. [File Organization](#file-organization)
7. [Error Handling](#error-handling)
8. [API & Service Layer](#api--service-layer)
9. [State Management](#state-management)
10. [Code Quality](#code-quality)

---

## General Principles

### 1. Consistency First

- Use consistent patterns across the entire codebase
- Follow established conventions even if alternatives exist
- Document deviations with clear reasoning

### 2. Performance by Default

- Optimize for performance from the start, not as an afterthought
- Use React.memo, useMemo, and useCallback strategically
- Implement code splitting for large components

### 3. Maintainability

- Write self-documenting code with clear naming
- Keep functions small and focused (max 50 lines)
- Prefer composition over inheritance

### 4. Type Safety

- Use TypeScript strictly - no `any` types
- Define interfaces for all data structures
- Use generic types where appropriate

---

## TypeScript Standards

### File Naming

```typescript
// ✅ Good
ProductCard.tsx;
CartService.ts;
useCartSync.ts;

// ❌ Bad
productCard.tsx;
cart - service.ts;
use - cart - sync.ts;
```

### Import Organization

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from 'next/server';

// 2. Third-party libraries
import { create } from 'zustand';
import { GraphQLClient } from 'graphql-request';

// 3. Internal imports (absolute paths)
import { ProductCard } from '@/components/product/ProductCard';
import { cartService } from '@/lib/services/cart-service';

// 4. Relative imports
import './ProductCard.css';
```

### Type Definitions

```typescript
// ✅ Good - Use interfaces for object shapes
interface ProductCardProps {
  product: ShopifyProduct;
  onAddToCart?: (product: ShopifyProduct) => void;
  className?: string;
}

// ✅ Good - Use types for unions and computed types
type CartStatus = 'loading' | 'success' | 'error';
type CartAction = 'add' | 'remove' | 'update' | 'clear';

// ✅ Good - Generic types for reusable patterns
interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}
```

### Function Signatures

```typescript
// ✅ Good - Clear parameter types and return types
async function fetchProducts(
  limit: number = 10,
  filters?: ProductFilters
): Promise<ShopifyProduct[]> {
  // implementation
}

// ✅ Good - Destructured parameters for complex objects
function updateCartItem({
  itemId,
  quantity,
  userId,
}: {
  itemId: string;
  quantity: number;
  userId: string;
}): Promise<void> {
  // implementation
}
```

---

## React Component Guidelines

### Component Structure

```typescript
// ✅ Standard component structure
'use client' // Only when needed

import React, { memo, useMemo, useCallback } from 'react'
import type { ComponentProps } from './types'

interface ComponentNameProps {
  // Props definition
}

export function ComponentName({
  prop1,
  prop2,
  ...rest
}: ComponentNameProps) {
  // Hooks
  // Event handlers
  // Render logic

  return (
    // JSX
  )
}

// Export as default for single-purpose components
export default ComponentName
```

### Performance Optimization

```typescript
// ✅ Memoize expensive components
export const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  // Component logic
});

// ✅ Memoize expensive calculations
const totalPrice = useMemo(() => {
  return items.reduce((total, item) => total + item.price, 0);
}, [items]);

// ✅ Memoize event handlers
const handleAddToCart = useCallback(
  (product: ShopifyProduct) => {
    onAddToCart?.(product);
  },
  [onAddToCart]
);
```

### Props Interface Naming

```typescript
// ✅ Good - Component name + Props suffix
interface ProductCardProps {}
interface CartDrawerProps {}
interface LoadingButtonProps {}

// ❌ Bad - Generic or unclear names
interface Props {}
interface ComponentProps {}
interface ProductCardComponentProps {}
```

### Component Documentation

```typescript
/**
 * ProductCard - Displays product information in a card format
 *
 * @param product - Shopify product data
 * @param onAddToCart - Optional callback when add to cart is clicked
 * @param className - Additional CSS classes
 *
 * @example
 * <ProductCard
 *   product={product}
 *   onAddToCart={handleAddToCart}
 *   className="mb-4"
 * />
 */
export function ProductCard({
  product,
  onAddToCart,
  className,
}: ProductCardProps) {
  // Implementation
}
```

---

## Performance Optimization

### React Optimization Patterns

```typescript
// ✅ Use React.memo for expensive components
export const ProductGrid = memo(function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid-products">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
})

// ✅ Memoize selectors in Zustand
export const useCartItemCount = () =>
  useCartStore(state => state.getTotalItems())

// ✅ Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### Bundle Optimization

```typescript
// ✅ Dynamic imports for code splitting
const ProductDetails = dynamic(() => import('./ProductDetails'), {
  loading: () => <ProductSkeleton />,
  ssr: false
})

// ✅ Tree shaking friendly imports
import { debounce } from 'lodash/debounce' // ✅
import _ from 'lodash' // ❌
```

### Image Optimization

```typescript
// ✅ Next.js Image component with proper sizing
<Image
  src={product.image.url}
  alt={product.image.altText || product.title}
  width={400}
  height={500}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold}
/>
```

---

## Styling Standards

### Tailwind CSS Usage

```typescript
// ✅ Use design system classes
<div className="container-responsive">
  <h1 className="text-hierarchy-h1">Product Title</h1>
  <p className="text-body">Product description</p>
  <button className="btn-primary">Add to Cart</button>
</div>

// ✅ Consistent spacing using 8px grid
<div className="p-4 mb-6"> {/* 16px, 24px */}
  <div className="space-y-4"> {/* 16px between children */}
    <div className="flex gap-3"> {/* 12px gap */}
      {/* content */}
    </div>
  </div>
</div>
```

### CSS Custom Properties

```css
/* ✅ Use design tokens consistently */
.product-card {
  background-color: var(--pure-white);
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-sm);
  padding: var(--space-4);
}

/* ❌ Avoid hardcoded values */
.product-card {
  background-color: #ffffff;
  border: 1px solid #e8e5e0;
  border-radius: 4px;
  padding: 16px;
}
```

### Component-Specific Styles

```typescript
// ✅ Use CSS modules for component-specific styles
import styles from './ProductCard.module.css'

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={`${styles.card} hover-lift`}>
      {/* content */}
    </div>
  )
}
```

---

## File Organization

### Directory Structure

```
components/
  ui/                    # Reusable UI components
    Button.tsx
    LoadingSpinner.tsx
    ErrorMessage.tsx
  product/               # Product-related components
    ProductCard.tsx
    ProductGrid.tsx
    ProductDetails.tsx
  cart/                  # Cart-related components
    CartDrawer.tsx
    CartItem.tsx
  layout/                # Layout components
    Header.tsx
    Footer.tsx
    Navigation.tsx
```

### File Naming Conventions

```
// Components: PascalCase
ProductCard.tsx
CartDrawer.tsx
LoadingButton.tsx

// Hooks: camelCase with 'use' prefix
useCartSync.ts
useProductData.ts
useLocalStorage.ts

// Services: camelCase
cartService.ts
productService.ts
authService.ts

// Types: camelCase
shopify.ts
cart.ts
api.ts

// Utilities: camelCase
formatPrice.ts
validateEmail.ts
debounce.ts
```

### Export Patterns

```typescript
// ✅ Named exports for multiple exports
export { ProductCard } from './ProductCard';
export { ProductGrid } from './ProductGrid';
export { ProductDetails } from './ProductDetails';

// ✅ Default export for single-purpose files
export { default as ProductCard } from './ProductCard';

// ✅ Re-export types
export type { ProductCardProps } from './ProductCard';
```

---

## Error Handling

### API Error Handling

```typescript
// ✅ Consistent error handling pattern
export async function fetchProducts(): Promise<ApiResponse<ShopifyProduct[]>> {
  try {
    const products = await storefrontClient.request(GET_PRODUCTS_QUERY);
    return { data: products, status: 200 };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    };
  }
}
```

### Component Error Boundaries

```typescript
// ✅ Error boundary for component trees
export function ProductErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorMessage message="Failed to load product" />}
      onError={(error) => console.error('Product error:', error)}
    >
      {children}
    </ErrorBoundary>
  )
}
```

### Form Validation

```typescript
// ✅ Consistent validation patterns
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};
```

---

## API & Service Layer

### Service Class Structure

```typescript
// ✅ Service class with clear methods
export class CartService {
  private baseUrl: string;
  private client: GraphQLClient;

  constructor(baseUrl: string, client: GraphQLClient) {
    this.baseUrl = baseUrl;
    this.client = client;
  }

  async addItem(item: CartItemData): Promise<CartItem> {
    try {
      const response = await this.client.request(ADD_ITEM_MUTATION, { item });
      return response.addItem;
    } catch (error) {
      throw new CartServiceError('Failed to add item to cart', error);
    }
  }
}
```

### API Route Structure

```typescript
// ✅ Consistent API route pattern
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await service.getData(session.user.email);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## State Management

### Zustand Store Structure

```typescript
// ✅ Clean store structure
interface StoreState {
  // State
  items: CartItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearError: () => void;

  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useStore = create<StoreState>()((set, get) => ({
  // Implementation
}));
```

### Selector Hooks

```typescript
// ✅ Specific selector hooks
export const useCartItems = () => useStore(state => state.items);
export const useCartLoading = () => useStore(state => state.isLoading);
export const useCartActions = () =>
  useStore(state => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    clearError: state.clearError,
  }));
```

---

## Code Quality

### ESLint Configuration

```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md}": ["prettier --write"]
  }
}
```

### Testing Standards

```typescript
// ✅ Component testing
describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
  })

  it('calls onAddToCart when button is clicked', () => {
    const onAddToCart = jest.fn()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)

    fireEvent.click(screen.getByText('Add to Cart'))
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
  })
})
```

---

## Migration Checklist

### Phase 1: Foundation

- [ ] Set up ESLint with TypeScript rules
- [ ] Configure Prettier for consistent formatting
- [ ] Establish file naming conventions
- [ ] Create component template

### Phase 2: Component Refactoring

- [ ] Convert to consistent export patterns
- [ ] Add React.memo where appropriate
- [ ] Standardize prop interfaces
- [ ] Implement error boundaries

### Phase 3: Performance

- [ ] Add code splitting for large components
- [ ] Optimize images with Next.js Image
- [ ] Implement proper memoization
- [ ] Add loading states

### Phase 4: Styling

- [ ] Migrate to design system classes
- [ ] Remove hardcoded styles
- [ ] Implement consistent spacing
- [ ] Add responsive design patterns

### Phase 5: Code Quality

- [ ] Remove duplicate code
- [ ] Consolidate similar functions
- [ ] Add comprehensive error handling
- [ ] Implement proper TypeScript types

---

## Tools & Automation

### Recommended VS Code Extensions

- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

### Scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

This style guide ensures consistency, performance, and maintainability across the entire codebase.
