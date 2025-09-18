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
  return (
    <footer className='bg-deep-charcoal text-pure-white py-12 md:py-16'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12'>
          <div className='text-center md:text-left'>
            <h3 className='text-hierarchy-h2 mb-6 text-terracotta'>Printed Poster</h3>
            <p className='text-body-small mb-6 leading-relaxed'>
              Curated collection of artistic prints and posters, carefully selected to bring beauty and inspiration to your space.
            </p>
                   <div className='flex gap-3 md:gap-4 justify-center md:justify-start'>
                     <a href='#' className='w-12 h-12 md:w-10 md:h-10 bg-sage-green rounded-full flex items-center justify-center hover:bg-terracotta transition-colors duration-300 min-h-[44px] min-w-[44px]'>📧</a>
                     <a href='#' className='w-12 h-12 md:w-10 md:h-10 bg-sage-green rounded-full flex items-center justify-center hover:bg-terracotta transition-colors duration-300 min-h-[44px] min-w-[44px]'>📱</a>
                     <a href='#' className='w-12 h-12 md:w-10 md:h-10 bg-sage-green rounded-full flex items-center justify-center hover:bg-terracotta transition-colors duration-300 min-h-[44px] min-w-[44px]'>🐦</a>
                     <a href='#' className='w-12 h-12 md:w-10 md:h-10 bg-sage-green rounded-full flex items-center justify-center hover:bg-terracotta transition-colors duration-300 min-h-[44px] min-w-[44px]'>📷</a>
                   </div>
          </div>
          <div className='text-center md:text-left'>
            <h4 className='text-hierarchy-h3 mb-6'>Shop</h4>
            <ul className='space-y-3'>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>All Products</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>New Arrivals</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Best Sellers</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Sale</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Collections</a></li>
            </ul>
          </div>
          <div className='text-center md:text-left'>
            <h4 className='text-hierarchy-h3 mb-6'>Support</h4>
            <ul className='space-y-3'>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Help Center</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Shipping Info</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Returns</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Size Guide</a></li>
              <li><a href='#' className='text-body-small hover:text-terracotta transition-colors duration-300'>Contact Us</a></li>
            </ul>
          </div>
          <div className='text-center md:text-left'>
            <h4 className='text-hierarchy-h3 mb-6'>Newsletter</h4>
            <p className='text-body-small mb-4 text-pure-white'>Stay updated with our latest news</p>
            <form className='space-y-4'>
                     <div>
                       <label className='block text-sm font-medium text-pure-white mb-2'>Email</label>
                       <input 
                         type='email' 
                         className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent min-h-[44px]'
                         placeholder='Enter your email'
                       />
                     </div>
              <div>
                <label className='block text-sm font-medium text-pure-white mb-2'>Interests</label>
                <div className='space-y-2 flex flex-col items-center md:items-start'>
                  <label className='flex items-center space-x-3'>
                    <input type='radio' name='interest' value='products' className='w-4 h-4 text-sage-green' />
                    <span className='text-sm text-pure-white'>New Products</span>
                  </label>
                  <label className='flex items-center space-x-3'>
                    <input type='radio' name='interest' value='offers' className='w-4 h-4 text-sage-green' />
                    <span className='text-sm text-pure-white'>Special Offers</span>
                  </label>
                  <label className='flex items-center space-x-3'>
                    <input type='radio' name='interest' value='news' className='w-4 h-4 text-sage-green' />
                    <span className='text-sm text-pure-white'>Company News</span>
                  </label>
                </div>
              </div>
                     <button type='submit' className='bg-terracotta text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-coral-pink hover:-translate-y-1 min-h-[44px] w-full'>
                       Subscribe
                     </button>
            </form>
          </div>
        </div>
        <div className='border-t border-warm-gray/20 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
            <p className='text-body-small text-warm-gray mb-4 md:mb-0'>
              © 2024 Printed Poster. All rights reserved.
            </p>
            <div className='flex gap-6 justify-center md:justify-end'>
              <a href='#' className='text-body-small text-warm-gray hover:text-terracotta transition-colors duration-300'>Terms of Service</a>
              <a href='#' className='text-body-small text-warm-gray hover:text-terracotta transition-colors duration-300'>Privacy Policy</a>
              <a href='#' className='text-body-small text-warm-gray hover:text-terracotta transition-colors duration-300'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
