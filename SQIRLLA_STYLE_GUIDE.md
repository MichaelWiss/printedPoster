# Sqirlla-Inspired UX/UI Style Guide

## E-commerce Design System for Printed Poster Site

Based on the vibrant, playful, and artisanal aesthetic of Sqirlla.com, this style guide creates a warm, community-driven design system perfect for an art-focused e-commerce experience.

---

## Color Palette

### Primary Colors

```css
--cream-base: #faf7f2; /* Warm cream background */
--deep-black: #1a1a1a; /* Rich black for text */
--warm-white: #ffffff; /* Pure white for cards */
--sage-green: #9fb8a8; /* Muted sage green accent */
--terracotta: #d4a574; /* Warm terracotta accent */
--dusty-blue: #7a9cc6; /* Soft blue accent */
```

### Secondary Colors

```css
--coral-pink: #e8a598; /* Soft coral for highlights */
--mustard: #d4b655; /* Mustard yellow accent */
--lavender: #c8b5d1; /* Light lavender */
--warm-gray: #8b8680; /* Warm neutral gray */
--light-sage: #e8f0ea; /* Very light sage for backgrounds */
--cream-shadow: #f0ebe3; /* Subtle shadow color */
```

### Functional Colors

```css
--success: var(--sage-green); /* Use sage green for success */
--warning: var(--mustard); /* Mustard for warnings */
--error: var(--coral-pink); /* Coral for errors (soft approach) */
--info: var(--dusty-blue); /* Blue for information */
```

---

## Typography

### Font Stack

```css
--font-primary: 'Georgia', 'Times New Roman', serif;
--font-secondary: 'Helvetica Neue', 'Arial', sans-serif;
--font-display: 'Georgia', serif;
--font-body: 'Helvetica Neue', Arial, sans-serif;
```

### Font Sizes & Hierarchy

```css
/* Display & Headers */
--text-display: 2.5rem; /* 40px - Hero text */
--text-h1: 2rem; /* 32px - Page titles */
--text-h2: 1.5rem; /* 24px - Section headers */
--text-h3: 1.25rem; /* 20px - Subsections */
--text-h4: 1.125rem; /* 18px - Card titles */

/* Body Text */
--text-large: 1.125rem; /* 18px - Large body */
--text-base: 1rem; /* 16px - Standard body */
--text-small: 0.875rem; /* 14px - Small text */
--text-tiny: 0.75rem; /* 12px - Captions */

/* Line Heights */
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.7;
--leading-loose: 2;
```

### Font Weights

```css
--weight-light: 300;
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

---

## Spacing & Layout

### Spacing Scale (4px base unit)

```css
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
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1200px;
--container-2xl: 1400px;
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
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 2px;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--deep-black);
  color: var(--warm-white);
  border-color: var(--deep-black);
}

.btn-primary:hover {
  background-color: var(--warm-gray);
  border-color: var(--warm-gray);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--sage-green);
  color: var(--warm-white);
  border-color: var(--sage-green);
}

.btn-secondary:hover {
  background-color: var(--dusty-blue);
  border-color: var(--dusty-blue);
}

.btn-outline {
  background-color: transparent;
  color: var(--deep-black);
  border-color: var(--deep-black);
}

.btn-outline:hover {
  background-color: var(--deep-black);
  color: var(--warm-white);
}

.btn-soft {
  background-color: var(--light-sage);
  color: var(--deep-black);
  border-color: var(--light-sage);
}

.btn-soft:hover {
  background-color: var(--sage-green);
  color: var(--warm-white);
}
```

### Product Cards

```css
.product-card {
  background-color: var(--warm-white);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(26, 26, 26, 0.08);
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(26, 26, 26, 0.15);
}

.product-image {
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  position: relative;
  background-color: var(--cream-shadow);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: var(--space-6);
}

.product-title {
  font-family: var(--font-display);
  font-size: var(--text-h4);
  font-weight: var(--weight-medium);
  color: var(--deep-black);
  margin-bottom: var(--space-2);
  line-height: var(--leading-tight);
}

.product-description {
  font-family: var(--font-body);
  font-size: var(--text-small);
  color: var(--warm-gray);
  margin-bottom: var(--space-4);
  line-height: var(--leading-relaxed);
}

.product-price {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--deep-black);
  margin-bottom: var(--space-4);
}

.product-badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  background-color: var(--coral-pink);
  color: var(--warm-white);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-tiny);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 12px;
}

.product-badge.sold-out {
  background-color: var(--warm-gray);
}

.product-badge.new {
  background-color: var(--sage-green);
}
```

### Navigation

```css
.header {
  background-color: var(--cream-base);
  border-bottom: 1px solid var(--cream-shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
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
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--deep-black);
  text-decoration: none;
  letter-spacing: -0.5px;
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
  font-family: var(--font-body);
  color: var(--deep-black);
  text-decoration: none;
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--sage-green);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--sage-green);
}
```

### Forms

```css
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  color: var(--deep-black);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: var(--space-4);
  border: 1px solid var(--cream-shadow);
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  background-color: var(--warm-white);
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--sage-green);
  box-shadow: 0 0 0 3px rgba(159, 184, 168, 0.1);
}

.form-input::placeholder {
  color: var(--warm-gray);
  font-style: italic;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b8680' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--space-4) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--space-12);
}
```

---

## Layout Patterns

### Product Grid

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-8);
  margin: var(--space-12) 0;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-10);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-12);
  }
}

@media (min-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Section Headers

```css
.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.section-title {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-medium);
  color: var(--deep-black);
  margin-bottom: var(--space-4);
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-large);
  color: var(--warm-gray);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--leading-relaxed);
}

.section-divider {
  width: 60px;
  height: 2px;
  background-color: var(--sage-green);
  margin: var(--space-8) auto;
  border: none;
}
```

---

## Animation & Interactions

### Hover Effects

```css
.hover-lift {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(26, 26, 26, 0.15);
}

.hover-scale {
  transition: transform 0.4s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-color {
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}
```

### Loading States

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--cream-shadow) 25%,
    var(--light-sage) 50%,
    var(--cream-shadow) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-wave 1.5s infinite;
}

@keyframes skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.fade-in {
  animation: fade-in 0.6s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Category Organization

### Category Headers

```css
.category-section {
  margin-bottom: var(--space-20);
}

.category-title {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-medium);
  color: var(--deep-black);
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--cream-shadow);
  letter-spacing: -0.3px;
}

.category-description {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--warm-gray);
  margin-bottom: var(--space-8);
  line-height: var(--leading-relaxed);
  max-width: 800px;
}
```

### Filter & Sort

```css
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-12);
  padding: var(--space-6);
  background-color: var(--light-sage);
  border-radius: 4px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.filter-label {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  color: var(--deep-black);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.view-toggle {
  display: flex;
  border: 1px solid var(--cream-shadow);
  border-radius: 2px;
  overflow: hidden;
}

.view-toggle button {
  padding: var(--space-2) var(--space-4);
  border: none;
  background-color: var(--warm-white);
  color: var(--warm-gray);
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-toggle button.active {
  background-color: var(--sage-green);
  color: var(--warm-white);
}
```

---

## Newsletter & Footer

### Newsletter Signup

```css
.newsletter {
  background-color: var(--light-sage);
  padding: var(--space-16) var(--space-6);
  margin: var(--space-24) 0;
  text-align: center;
  border-radius: 8px;
}

.newsletter-title {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-medium);
  color: var(--deep-black);
  margin-bottom: var(--space-4);
}

.newsletter-description {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--warm-gray);
  margin-bottom: var(--space-8);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.newsletter-form {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: var(--space-3);
}

.newsletter-input {
  flex: 1;
  padding: var(--space-4);
  border: 1px solid var(--sage-green);
  border-radius: 2px;
  font-family: var(--font-body);
}
```

---

## UX Principles

### Artisanal Feel

- **Handcrafted aesthetic** with organic, warm colors
- **Personal touch** through storytelling and product descriptions
- **Community focus** with emphasis on collaboration and local sourcing

### Intuitive Navigation

- **Clear categorization** (Merch, Jams, Collaborations, etc.)
- **Visual hierarchy** with distinct section headers
- **Product discovery** through curated collections

### Emotional Connection

- **Warm, inviting color palette** that feels approachable
- **Storytelling elements** that connect users to the brand
- **Social proof** through collaborations and community features

### Accessibility Features

- **High contrast ratios** for text readability
- **Clear focus states** for keyboard navigation
- **Descriptive alt text** for all images
- **Semantic HTML structure** for screen readers

This style guide captures Sqirlla's warm, artisanal, community-driven aesthetic while maintaining the functionality needed for an effective e-commerce experience. The design emphasizes craftsmanship, creativity, and personal connection - perfect for a printed poster marketplace.
