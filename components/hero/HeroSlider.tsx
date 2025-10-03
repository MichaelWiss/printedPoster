'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  ctaText: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Curated Art Prints',
    subtitle:
      'Discover our collection of premium printed posters and artistic prints',
    src: '/hero/slide-1.jpg',
    ctaText: 'Shop Collection',
    ctaLink: '/products',
  },
  {
    id: '2',
    title: 'Gallery Quality',
    subtitle: 'Museum-grade printing on premium paper for lasting beauty',
    src: '/hero/slide-2.jpg',
    ctaText: 'Shop Collection',
    ctaLink: '/about',
  },
  {
    id: '3',
    title: 'Limited Editions',
    subtitle: 'Exclusive prints from emerging and established artists',
    src: '/hero/slide-3.jpg',
    ctaText: 'View Limited',
    ctaLink: '/limited',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className='relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-light-gray'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src={currentSlideData.src}
          alt={currentSlideData.title}
          fill
          className='object-cover transition-opacity duration-1000'
          priority
          fetchPriority='high'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-black/30' />
      </div>

      {/* Content */}
      <div className='relative h-full flex items-center justify-center text-center text-white'>
        <div className='max-w-4xl px-4'>
          <h1 className='text-hero text-white mb-4 animate-fade-in'>
            {currentSlideData.title}
          </h1>
          <p className='text-white/90 mb-8 max-w-2xl mx-auto'>
            {currentSlideData.subtitle}
          </p>
          <a
            href={currentSlideData.ctaLink}
            className='inline-block bg-pure-white text-deep-charcoal px-8 py-3 font-medium hover:bg-light-gray transition-colors duration-200'
          >
            {currentSlideData.ctaText}
          </a>
        </div>
      </div>

      {/* Slide Indicators - Only render when hydrated to prevent Firefox issues */}
      {isClient && (
        <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2'>
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}

      {/* Navigation Arrows - Only render when hydrated to prevent Firefox issues */}
      {isClient && (
        <>
          <button
            onClick={() =>
              goToSlide(
                (currentSlide - 1 + heroSlides.length) % heroSlides.length
              )
            }
            className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200'
            aria-label='Previous slide'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200'
            aria-label='Next slide'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
