#Huncwot-Inspired Style Guide 

## Printed Poster E-commerce Design System

Based on the clean, modern aesthetic of Huncwot.com, this style guide establishes a sophisticated design system for the printed poster e-commerce site.

---

## Color Palette

### Primary Colors

```css
--primary-black: #000000; /* Pure black for text and key elements */
--primary-white: #ffffff; /* Clean white for backgrounds */
--primary-red: #ff0000; /* Bright red for accents and highlights */
--accent-gray: #f5f5f5; /* Light gray for subtle backgrounds */
--border-gray: #e5e5e5; /* Light border color */
--text-gray: #666666; /* Secondary text color */
--hover-gray: #f0f0f0; /* Hover states */
```

### Semantic Colors

```css
--success: #22c55e; /* Green for success states */
--warning: #f59e0b; /* Orange for warnings */
--error: var(--primary-red); /* Use primary red for errors */
--info: #3b82f6; /* Blue for information */
```

---

## Typography

### Font Stack

```css
--font-primary:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
  Arial, sans-serif;
--font-mono:
  'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New',
  monospace;
```

### Font Sizes & Line Heights

```css
/* Display */
--text-6xl: 3.75rem; /* 60px */
--text-5xl: 3rem; /* 48px */
--text-4xl: 2.25rem; /* 36px */
--text-3xl: 1.875rem; /* 30px */

/* Headings */
--text-2xl: 1.5rem; /* 24px */
--text-xl: 1.25rem; /* 20px */
--text-lg: 1.125rem; /* 18px */

/* Body */
--text-base: 1rem; /* 16px */
--text-sm: 0.875rem; /* 14px */
--text-xs: 0.75rem; /* 12px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### Font Weights

```css
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Spacing System

### Spacing Scale (8px base unit)

```css
--space-0: 0;
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
--space-32: 8rem; /* 128px */
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

---

## Layout Components

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

/* Responsive grid */
@media (min-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .lg\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
```

### Flexbox Utilities

```css
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}
.items-center {
  align-items: center;
}
.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
```

---

## Component Styles

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border: 1px solid transparent;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-none);
  border-radius: 0;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
}

.btn-primary {
  background-color: var(--primary-black);
  color: var(--primary-white);
  border-color: var(--primary-black);
}

.btn-primary:hover {
  background-color: var(--text-gray);
  border-color: var(--text-gray);
}

.btn-accent {
  background-color: var(--primary-red);
  color: var(--primary-white);
  border-color: var(--primary-red);
}

.btn-accent:hover {
  background-color: #cc0000;
  border-color: #cc0000;
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-black);
  border-color: var(--primary-black);
}

.btn-secondary:hover {
  background-color: var(--primary-black);
  color: var(--primary-white);
}

.btn-ghost {
  background-color: transparent;
  color: var(--primary-black);
  border-color: transparent;
}

.btn-ghost:hover {
  background-color: var(--hover-gray);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}
```

### Cards

```css
.card {
  background-color: var(--primary-white);
  border: 1px solid var(--border-gray);
  border-radius: 0;
  overflow: hidden;
  transition: all 0.15s ease-in-out;
}

.card:hover {
  border-color: var(--primary-black);
  transform: translateY(-1px);
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-gray);
}

.card-body {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border-gray);
  background-color: var(--accent-gray);
}
```

### Form Elements

```css
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-gray);
  border-radius: 0;
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  transition: border-color 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-black);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--primary-black);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--space-3) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--space-10);
}
```

---

## Navigation

### Header Navigation

```css
.header {
  background-color: var(--primary-white);
  border-bottom: 1px solid var(--border-gray);
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  max-width: var(--container-xl);
  margin: 0 auto;
}

.nav-logo {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--primary-black);
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--primary-black);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: color 0.15s ease-in-out;
}

.nav-link:hover {
  color: var(--text-gray);
}
```

### Breadcrumbs

```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-gray);
  margin-bottom: var(--space-6);
}

.breadcrumb-separator {
  color: var(--border-gray);
}

.breadcrumb-link {
  color: var(--text-gray);
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: var(--primary-black);
}
```

---

## Product Components

### Product Grid

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
  margin: var(--space-8) 0;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Product Card

```css
.product-card {
  background-color: var(--primary-white);
  border: 1px solid var(--border-gray);
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

.product-card:hover {
  border-color: var(--primary-black);
  transform: translateY(-2px);
}

.product-image {
  width: 100%;
  aspect-ratio: 4/5;
  overflow: hidden;
  background-color: var(--accent-gray);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.15s ease-in-out;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: var(--space-6);
}

.product-title {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--primary-black);
  margin-bottom: var(--space-2);
  line-height: var(--leading-tight);
}

.product-description {
  font-size: var(--text-sm);
  color: var(--text-gray);
  margin-bottom: var(--space-4);
  line-height: var(--leading-relaxed);
}

.product-price {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--primary-black);
}
```

---

## Animation & Transitions

### Hover Effects

```css
.hover-lift {
  transition: transform 0.15s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale {
  transition: transform 0.15s ease-in-out;
}

.hover-scale:hover {
  transform: scale(1.02);
}

.hover-fade {
  transition: opacity 0.15s ease-in-out;
}

.hover-fade:hover {
  opacity: 0.8;
}
```

### Loading States

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--accent-gray) 25%,
    var(--hover-gray) 50%,
    var(--accent-gray) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.fade-in {
  animation: fade-in 0.3s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
@media (min-width: 1536px) {
  /* 2xl */
}
```

### Container

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
```

---

## Usage Guidelines

### Design Principles

1. **Minimalism**: Clean, uncluttered layouts with plenty of white space
2. **Consistency**: Uniform spacing, typography, and interaction patterns
3. **Accessibility**: High contrast ratios, keyboard navigation, screen reader support
4. **Performance**: Optimized images, minimal animations, fast loading times

### Typography Hierarchy

- **Display**: Hero sections, major announcements
- **H1**: Page titles
- **H2**: Section headers
- **H3**: Subsection headers
- **Body**: Main content, descriptions
- **Small**: Captions, metadata, fine print

### Color Usage

- **Black**: Primary text, important UI elements
- **Red**: Call-to-action buttons, highlights, brand accents
- **Gray**: Secondary text, borders, subtle backgrounds
- **White**: Main backgrounds, card surfaces
- **Hover states**: Subtle gray backgrounds, red highlights

### Spacing Consistency

- Use the 8px grid system for all spacing
- Maintain consistent margins and padding
- Ensure adequate white space between elements
- Align elements to the baseline grid

This style guide provides a foundation for building a clean, modern e-commerce experience inspired by Huncwot's minimalist aesthetic while maintaining the sophisticated design principles suitable for a printed poster marketplace.
