// Incremental Static Regeneration for home page
export const revalidate = 300; // 5 minutes - longer cache for better performance
import { HeroAboveFold } from '@/components/hero/HeroAboveFold';
import { FeaturedProductsLite } from '@/components/sections/FeaturedProductsLite';

export default function Home() {
  return (
    <div className='min-h-screen bg-cream-base text-deep-charcoal'>
      {/* Hero Section: server-rendered for fast LCP */}
      <HeroAboveFold />

      {/* Featured Products (server-only lightweight cards) */}
      <FeaturedProductsLite />

      {/* Additional content sections can be added here */}
      <section className='py-16 bg-pure-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='font-display text-3xl lg:text-4xl font-normal text-deep-charcoal mb-4'>
            Why Choose Our Prints?
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-sage-green'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='font-body text-xl font-medium mb-2'>
                Premium Quality
              </h3>
              <p className='text-warm-gray'>
                Museum-grade printing on archival paper
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-sage-green'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z'
                  />
                </svg>
              </div>
              <h3 className='font-body text-xl font-medium mb-2'>
                Curated Collection
              </h3>
              <p className='text-warm-gray'>
                Hand-picked designs from talented artists
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-sage-green'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10'
                  />
                </svg>
              </div>
              <h3 className='font-body text-xl font-medium mb-2'>
                Fast Delivery
              </h3>
              <p className='text-warm-gray'>
                Carefully packaged and shipped worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
