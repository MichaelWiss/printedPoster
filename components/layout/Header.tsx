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

import Link from 'next/link'
import { ClientMobileMenu } from './ClientMobileMenu'
import { CartCounter } from '@/components/cart/CartCounter'

export function Header() {
  return (
    <header className="bg-cream-base/95 backdrop-blur-sm border-b border-sage-green/10 sticky top-0 z-50">
      
      {/* Container with design system max-width and responsive padding */}
      {/* Responsive padding: px-4 (mobile), lg:px-6 (desktop) */}
      <div className="container mx-auto px-4 lg:px-6 py-4">
        
        {/* Primary navigation with improved spacing and alignment */}
        <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
          
          {/* Left section: Brand and desktop navigation */}
          <div className="flex items-center gap-8">
            
            {/* Brand logo with design system typography */}
            {/* Uses font-display (Playfair Display) for elegant brand presentation */}
            <Link 
              href="/" 
              className="text-display-sm font-display font-semibold text-deep-charcoal hover:text-sage-green transition-colors duration-200"
            >
              Printed Poster
            </Link>
            
            {/* Desktop navigation - hidden on mobile, visible on large screens */}
            {/* Uses text-body-sm with proper hierarchy and spacing */}
            <div className="hidden lg:flex items-center gap-8">
              
                            {/* Products navigation - primary category */}
              <Link 
                href="/products" 
                className="nav-link text-body-sm text-deep-charcoal/80 hover:text-sage-green transition-colors duration-200"
              >
                Products
              </Link>
              
              {/* Collections navigation - curated content */}
              <Link 
                href="/collections" 
                className="nav-link text-body-sm text-deep-charcoal/80 hover:text-sage-green transition-colors duration-200"
              >
                Collections
              </Link>
              
              {/* About page - brand story */}
              <Link 
                href="/about" 
                className="nav-link text-body-sm text-deep-charcoal/80 hover:text-sage-green transition-colors duration-200"
              >
                About
              </Link>
              
            </div>
          </div>

          {/* Right section: Actions and mobile menu */}
          <div className="flex items-center gap-4">
            
            {/* Search functionality - always visible */}
            {/* Uses icon + text pattern for clarity */}
            <Link 
              href="/search" 
              className="text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200 flex items-center gap-2"
              aria-label="Search products"
            >
              <span className="sr-only lg:not-sr-only">Search</span>
              {/* Search icon placeholder - would use actual icon */}
              <span className="text-lg">🔍</span>
            </Link>
            
            {/* Cart with item count - primary conversion action */}
            {/* Uses btn-primary from design system with accent styling */}
            <Link 
              href="/cart" 
              className="text-body-sm font-medium px-3 py-2 relative flex items-center"
              aria-label="Shopping cart"
            >
              {/* Shopping cart emoji */}
              <span className="text-lg">🛒</span>
              {/* Dynamic cart item count badge using Zustand */}
              <CartCounter />
            </Link>

            {/* Mobile menu - loaded client-side to reduce initial bundle */}
            <ClientMobileMenu />
            
          </div>
        </nav>
        
      </div>
    </header>
  )
}

