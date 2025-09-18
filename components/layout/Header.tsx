/**
 * Header Component
 *
 * Main navigation header for the Printed Poster e-commerce site.
 * Features a responsive design with CSS-only mobile navigation to prevent hydration issues.
 *
 * Design System Integration:
 * - Uses new typography hierarchy (font-display for brand, text-body-sm for nav)
 * - Implements semantic color system (sage-green accent, warm-white backgrounds)
 * - Integrates custom component utilities (btn-primary, nav-link)
 * - Follows 8px grid spacing system with design tokens
 * - Supports dark mode with CSS custom properties
 *
 * Features:
 * - CSS-only mobile menu (no JavaScript state)
 * - Responsive typography scaling
 * - Accessibility-first navigation patterns
 * - Cart item count display
 * - Search functionality integration
 *
 * @component
 * @example
 * import { Header } from '@/components/layout/Header'
 *
 * function Layout({ children }) {
 *   return (
 *     <>
 *       <Header />
 *       <main>{children}</main>
 *     </>
 *   )
 * }
 */

import Link from 'next/link';
import { ClientMobileMenu } from './ClientMobileMenu';
import { CartCounter } from '@/components/cart/CartCounter';
import { SearchBar } from '@/components/layout/SearchBar';

export function Header() {
  return (
    <header className='bg-cream-base/98 backdrop-blur-md border-b-2 border-sage-green/20 sticky top-0 z-50 shadow-soft'>
      {/* Container with design system max-width and responsive padding */}
      {/* Responsive padding: px-4 (mobile), lg:px-6 (desktop) */}
      <div className='container mx-auto px-4 lg:px-8 py-3 lg:py-4'>
        {/* Primary navigation with improved spacing and alignment */}
        <nav
          className='flex items-center justify-between'
          role='navigation'
          aria-label='Main navigation'
        >
          {/* Left section: Brand and desktop navigation */}
          <div className='flex items-center gap-4 lg:gap-12'>
            {/* Brand logo with design system typography */}
            {/* Uses font-display (Playfair Display) for elegant brand presentation */}
            <Link
              href='/'
              className='text-xl lg:text-hierarchy-h1 hover:text-sage-green transition-all duration-300 hover:scale-105'
            >
              Printed Poster
            </Link>

            {/* Desktop navigation - hidden on mobile, visible on large screens */}
            {/* Uses text-body-sm with proper hierarchy and spacing */}
            <div className='hidden lg:flex items-center gap-8'>
              {/* Products navigation - primary category */}
              <Link
                href='/products'
                className='text-body font-medium text-deep-charcoal/80 hover:text-sage-green transition-all duration-300 hover:-translate-y-1'
              >
                Products
              </Link>

              {/* Collections navigation - curated content */}
              <Link
                href='/collections'
                className='text-body font-medium text-deep-charcoal/80 hover:text-sage-green transition-all duration-300 hover:-translate-y-1'
              >
                Collections
              </Link>

              {/* About page - brand story */}
              <Link
                href='/about'
                className='text-body font-medium text-deep-charcoal/80 hover:text-sage-green transition-all duration-300 hover:-translate-y-1'
              >
                About
              </Link>

              {/* Contact page */}
              <Link
                href='/contact'
                className='text-body font-medium text-deep-charcoal/80 hover:text-sage-green transition-all duration-300 hover:-translate-y-1'
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right section: Actions and mobile menu */}
          <div className='flex items-center gap-2 lg:gap-6'>
            {/* Search functionality - hidden on mobile, visible on desktop */}
            <div className='hidden lg:block'>
              <SearchBar />
            </div>

            {/* Cart with item count - primary conversion action */}
            {/* Uses btn-primary from design system with accent styling */}
            <div className='relative group'>
              <Link
                href='/cart'
                className='text-body font-medium px-2 lg:px-4 py-2 relative flex items-center hover:text-sage-green transition-all duration-300'
                aria-label='Shopping cart'
              >
                {/* Shopping cart emoji */}
                <span className='text-xl lg:text-2xl'>🛒</span>
                {/* Dynamic cart item count badge using Zustand */}
                <CartCounter />
              </Link>
            </div>

            {/* Mobile menu - loaded client-side to reduce initial bundle */}
            <ClientMobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
