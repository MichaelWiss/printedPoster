/**
 * Footer Component
 * 
 * Comprehensive site footer for the Printed Poster e-commerce site.
 * Features a multi-column layout with brand information, navigation links,
 * social media integration, and legal compliance elements.
 * 
 * Design System Integration:
 * - Uses new typography hierarchy (font-display for brand, text-body-sm for content)
 * - Implements semantic color system (charcoal, sage-green, warm-white)
 * - Integrates custom spacing tokens and responsive design patterns
 * - Follows 8px grid system with consistent padding and margins
 * - Supports dark mode with CSS custom properties
 * 
 * Features:
 * - Responsive multi-column layout (1 col mobile, 4 cols desktop)
 * - Brand section with company information
 * - Quick navigation links for key pages
 * - Customer service and legal links
 * - Social media integration placeholder
 * - Newsletter signup integration ready
 * - Accessibility-compliant structure
 * 
 * @component
 * @example
 * import { Footer } from '@/components/layout/Footer'
 * 
 * function Layout({ children }) {
 *   return (
 *     <>
 *       <main>{children}</main>
 *       <Footer />
 *     </>
 *   )
 * }
 */

import Link from 'next/link'
import { NewsletterSignup } from './NewsletterSignup'

export function Footer() {
  // Use static year to prevent hydration mismatches between server and client
  // Update annually or make dynamic with proper hydration handling
  const currentYear = 2025

  return (
    // Main footer with design system background and top border
    // Uses cream-base background with sage-green accent border
    // mt-16 provides generous spacing from main content
    <footer className="bg-cream-base border-t border-sage-green/20 mt-16">
      
      {/* Main footer content container */}
      {/* Responsive padding: px-4 (mobile), lg:px-6 (desktop) */}
      {/* py-12 provides generous vertical spacing */}
      <div className="container mx-auto px-4 lg:px-6 py-12">
        
        {/* Responsive grid layout: 1 column mobile, 4 columns desktop */}
        {/* gap-8 provides consistent spacing between sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand section - company information and description */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Brand logo/title using display font */}
            {/* Uses font-display (Playfair Display) for brand consistency */}
            <h3 className="text-display-sm font-display font-semibold text-deep-charcoal">
              Printed Poster
            </h3>
            
            {/* Company description with design system typography */}
            {/* Uses text-body-sm for readable body text */}
            <p className="text-body-sm text-deep-charcoal/80 max-w-md leading-relaxed">
              Discover unique art prints and posters that transform your space. 
              From vintage designs to contemporary artwork, find the perfect piece 
              to express your style.
            </p>
            
            {/* Contact information section */}
            <div className="space-y-2">
              <p className="text-body-sm text-deep-charcoal/70">
                <span className="font-medium">Email:</span> hello@printedposter.com
              </p>
              <p className="text-body-sm text-deep-charcoal/70">
                <span className="font-medium">Phone:</span> 1-800-POSTERS
              </p>
            </div>
            
            {/* Social media links section */}
            {/* Ready for social media integration */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-body-sm font-medium text-deep-charcoal/70">Follow us:</span>
              
              {/* Social media icons - would use actual icons/logos */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://instagram.com" 
                  className="text-deep-charcoal/60 hover:text-sage-green transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  📷
                </a>
                <a 
                  href="https://pinterest.com" 
                  className="text-deep-charcoal/60 hover:text-sage-green transition-colors duration-200"
                  aria-label="Follow us on Pinterest"
                >
                  📌
                </a>
                <a 
                  href="https://facebook.com" 
                  className="text-deep-charcoal/60 hover:text-sage-green transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                >
                  📘
                </a>
              </div>
            </div>
            
          </div>
          
          {/* Quick Links section - main navigation */}
          <div className="space-y-4">
            
            {/* Section heading with consistent typography */}
            <h4 className="text-body-base font-semibold text-deep-charcoal">
              Quick Links
            </h4>
            
            {/* Navigation links with proper spacing and hover states */}
            {/* space-y-3 provides consistent vertical rhythm */}
            <nav className="space-y-3" aria-label="Footer navigation">
              
              <Link 
                href="/products" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                All Products
              </Link>
              
              <Link 
                href="/collections" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                Collections
              </Link>
              
              <Link 
                href="/about" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                About Us
              </Link>
              
              <Link 
                href="/contact" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                Contact
              </Link>
              
              <Link 
                href="/blog" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                Blog
              </Link>
              
            </nav>
          </div>
          
          {/* Customer Service section - support and help */}
          <div className="space-y-4">
            
            {/* Section heading */}
            <h4 className="text-body-base font-semibold text-deep-charcoal">
              Customer Service
            </h4>
            
            {/* Customer service links */}
            <nav className="space-y-3" aria-label="Customer service">
              
              <Link 
                href="/shipping" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                Shipping Info
              </Link>
              
              <Link 
                href="/returns" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                Returns & Exchanges
              </Link>
              
              <Link 
                href="/sizing" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                Size Guide
              </Link>
              
              <Link 
                href="/faq" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                FAQ
              </Link>
              
              <Link 
                href="/support" 
                className="block text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200"
              >
                Support Center
              </Link>
              
            </nav>
          </div>
          
        </div>
        
        {/* Newsletter signup section */}
        {/* Full width section for email capture */}
        <div className="mt-12 pt-8 border-t border-sage-green/20">
          <div className="max-w-md">
            
            {/* Newsletter heading and description */}
            <h4 className="text-body-base font-semibold text-deep-charcoal mb-2">
              Stay Updated
            </h4>
            <p className="text-body-sm text-deep-charcoal/70 mb-4">
              Get the latest designs and exclusive offers delivered to your inbox.
            </p>
            
            {/* Newsletter signup form */}
            {/* Ready for email capture integration */}
                        {/* Newsletter signup form */}
            {/* Client-side component to prevent hydration issues */}
            <NewsletterSignup />
            
          </div>
        </div>
        
      </div>
      
      {/* Bottom footer bar - copyright and legal links */}
      {/* Separate section with darker background for legal information */}
      <div className="bg-deep-charcoal/5 border-t border-sage-green/10">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          
          {/* Responsive layout: stacked mobile, side-by-side desktop */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Copyright notice */}
            <div className="text-body-sm text-deep-charcoal/60">
              © {currentYear} Printed Poster. All rights reserved.
            </div>
            
            {/* Legal links */}
            {/* Horizontal list with proper spacing */}
            <nav className="flex items-center gap-6" aria-label="Legal links">
              
              <Link 
                href="/privacy" 
                className="text-body-sm text-deep-charcoal/60 hover:text-sage-green transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              
              <Link 
                href="/terms" 
                className="text-body-sm text-deep-charcoal/60 hover:text-sage-green transition-colors duration-200"
              >
                Terms of Service
              </Link>
              
              <Link 
                href="/cookies" 
                className="text-body-sm text-deep-charcoal/60 hover:text-sage-green transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              
            </nav>
            
          </div>
        </div>
      </div>
      
    </footer>
  )
}
