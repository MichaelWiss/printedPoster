import Image from 'next/image';

// Note: Place optimized JPG/WEBP assets at public/hero/hero-1.jpg (or .webp) for best performance
// e.g., /public/hero/hero-1.jpg (recommended ~1600x800, ~150-300KB WEBP)
// You can swap the filename below without code changes elsewhere.
export function HeroAboveFold() {
  const slide = {
    title: 'Curated Art Prints',
    subtitle:
      'Discover our collection of premium printed posters and artistic prints',
    imageUrl: '/hero/hero-1.svg',
    ctaText: 'Shop Collection',
    ctaLink: '/products',
  };

  return (
    <section className='relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-light-gray'>
      <div className='absolute inset-0'>
        <Image
          src={slide.imageUrl}
          alt={slide.title}
          fill
          className='object-cover'
          priority
          fetchPriority='high'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-black/30' />
      </div>
      <div className='relative h-full flex items-center justify-center text-center text-white'>
        <div className='max-w-4xl px-4'>
          <h1 className='text-hero text-white mb-4'>{slide.title}</h1>
          <p className='text-white/90 mb-8 max-w-2xl mx-auto'>
            {slide.subtitle}
          </p>
          <a
            href={slide.ctaLink}
            className='inline-block bg-pure-white text-deep-charcoal px-8 py-3 font-medium hover:bg-light-gray transition-colors duration-200'
          >
            {slide.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
