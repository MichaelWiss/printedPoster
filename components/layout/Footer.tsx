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

// import Link from 'next/link'
// import { NewsletterSignup } from './NewsletterSignup'

export function Footer() {
  // Use static year to prevent hydration mismatches between server and client
  // Update annually or make dynamic with proper hydration handling
  // const currentYear = 2025

  return (
    // Main footer with dark charcoal background and cream text
    // Using Tailwind classes to prevent hydration issues
  <footer className="mt-16 bg-deep-charcoal text-cream-base py-16">
      
      {/* Main footer content container matching collection page layout */}
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Footer content grid using Tailwind classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Collections section - matching collection page exactly */}
          <div>
            <h3 className="font-display text-xl font-medium mb-4 text-pure-white">
              Collections
            </h3>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Vintage Travel</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Art Deco</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Mid-Century Modern</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Abstract Art</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Photography</a>
          </div>
          
          {/* Customer Service section - matching collection page */}
          <div>
            <h3 className="font-display text-xl font-medium mb-4 text-pure-white">
              Customer Service
            </h3>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Contact Us</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Shipping Info</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Returns</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Size Guide</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Care Instructions</a>
          </div>
          
          {/* About section - matching collection page */}
          <div>
            <h3 className="font-display text-xl font-medium mb-4 text-pure-white">
              About
            </h3>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Our Story</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Artists</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Quality Promise</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Sustainability</a>
            <a href="#" className="block mb-2 text-cream-base hover:text-sage-green transition-colors duration-300">Press</a>
          </div>
          
          {/* Newsletter section - matching collection page */}
          <div>
            <h3 className="font-display text-xl font-medium mb-4 text-pure-white">
              Newsletter
            </h3>
            <p className="mb-4 text-cream-base/80">Get updates on new arrivals and exclusive offers.</p>
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full p-2 mb-4 border border-warm-gray rounded bg-pure-white text-deep-charcoal"
            />
            <button className="bg-sage-green text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-sage-green/90 transition-colors">
              Subscribe
            </button>
          </div>
          
        </div>
        
      </div>
      
    </footer>
  )
}
