/**
 * Mobile Menu Component
 *
 * Client-side mobile menu component to prevent Firefox hydration issues.
 * Uses React state instead of CSS-only peer selectors for better browser compatibility.
 *
 * @component
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Only render the interactive menu after client hydration
  if (!isClient) {
    // Return a static placeholder that matches the final render
    return (
      <div className='lg:hidden'>
        <button
          className='flex flex-col gap-1 cursor-pointer p-2 hover:bg-sage-green/10 rounded-md transition-colors'
          aria-label='Toggle mobile menu'
          disabled
        >
          <span className='w-6 h-0.5 bg-deep-charcoal transition-all duration-300' />
          <span className='w-6 h-0.5 bg-deep-charcoal transition-all duration-300' />
          <span className='w-6 h-0.5 bg-deep-charcoal transition-all duration-300' />
        </button>
      </div>
    );
  }

  return (
    <div className='lg:hidden'>
      {/* Hamburger button */}
      <button
        onClick={toggleMenu}
        className='flex flex-col gap-1 cursor-pointer p-2 hover:bg-sage-green/10 rounded-md transition-colors'
        aria-label='Toggle mobile menu'
        aria-expanded={isOpen}
      >
        <span
          className={`w-6 h-0.5 bg-deep-charcoal transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-deep-charcoal transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-deep-charcoal transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className='absolute top-full left-0 right-0 bg-cream-base border-t border-sage-green/10 shadow-lg z-50'>
          <div className='container mx-auto px-4 py-4'>
            <nav className='space-y-3' aria-label='Mobile navigation'>
              <Link
                href='/products'
                className='block py-3 text-body-base text-deep-charcoal hover:text-sage-green transition-colors duration-200'
                onClick={closeMenu}
              >
                Products
              </Link>

              <Link
                href='/collections'
                className='block py-3 text-body-base text-deep-charcoal hover:text-sage-green transition-colors duration-200'
                onClick={closeMenu}
              >
                Collections
              </Link>

              <Link
                href='/about'
                className='block py-3 text-body-base text-deep-charcoal hover:text-sage-green transition-colors duration-200'
                onClick={closeMenu}
              >
                About
              </Link>

              {/* Mobile-specific actions section */}
              <div className='pt-4 border-t border-sage-green/10 space-y-3'>
                <Link
                  href='/search'
                  className='block py-3 text-body-base text-deep-charcoal hover:text-sage-green transition-colors duration-200 flex items-center gap-2'
                  onClick={closeMenu}
                >
                  <span>🔍</span>
                  Search Products
                </Link>
                <Link
                  href='/contact'
                  className='block py-3 text-body-base text-deep-charcoal hover:text-sage-green transition-colors duration-200'
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
