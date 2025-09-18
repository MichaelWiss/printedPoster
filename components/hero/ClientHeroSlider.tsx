/**
 * Client-Side Hero Wrapper
 *
 * Wraps the HeroSlider to prevent hydration issues by ensuring
 * it only renders on the client side after hydration is complete.
 */

'use client';

import { useState, useEffect } from 'react';
import { HeroSlider } from './HeroSlider';

export function ClientHeroSlider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <section className='relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-light-gray animate-pulse'>
        <div className='absolute inset-0 bg-deep-charcoal/20' />
        <div className='relative h-full flex items-center justify-center text-center text-deep-charcoal'>
          <div className='max-w-4xl px-4'>
            <div className='h-16 bg-deep-charcoal/10 rounded mb-4' />
            <div className='h-8 bg-deep-charcoal/10 rounded mb-6 max-w-2xl mx-auto' />
            <div className='h-12 bg-deep-charcoal/10 rounded w-32 mx-auto' />
          </div>
        </div>
      </section>
    );
  }

  return <HeroSlider />;
}
