import { Metadata } from 'next/';

export const metadata: Metadata = {
  title: 'About - Printed Poster Gallery',
  description: 'Learn about our curated collection of artistic prints and posters',
};

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            About Our Gallery
          </h1>
          <p className='text-lg text-warm-gray max-w-3xl mx-auto leading-relaxed'>
            We curate exceptional prints and posters from talented artists around the world, 
            bringing unique artistic expression to your space.
          </p>
        </div>

        {/* Main Content */}
        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
            {/* Our Story */}
            <div className='bg-pure-white p-8 rounded-lg border border-sage-green/20'>
              <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
                Our Story
              </h2>
              <p className='text-warm-gray leading-relaxed mb-4'>
                Founded with a passion for exceptional art, we believe that beautiful prints 
                should be accessible to everyone. Our journey began with a simple mission: 
                to connect art lovers with carefully selected pieces that transform spaces.
              </p>
              <p className='text-warm-gray leading-relaxed'>
                Each piece in our collection is chosen for its unique artistic merit, 
                quality, and ability to inspire conversation and wonder.
              </p>
            </div>

            {/* Our Mission */}
            <div className='bg-sage-green/5 p-8 rounded-lg border border-sage-green/20'>
              <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
                Our Mission
              </h2>
              <p className='text-warm-gray leading-relaxed mb-4'>
                To make exceptional art accessible through museum-quality prints 
                that bring joy and inspiration to homes and spaces worldwide.
              </p>
              <p className='text-warm-gray leading-relaxed'>
                We partner directly with artists and use premium printing techniques 
                to ensure every piece meets our high standards for quality and longevity.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className='text-center mb-16'>
            <h2 className='font-display text-3xl font-medium text-deep-charcoal mb-8'>
              Our Values
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                  </svg>
                </div>
                <h3 className='font-body text-xl font-medium text-deep-charcoal mb-2'>
                  Passion for Art
                </h3>
                <p className='text-warm-gray'>
                  Every selection reflects our genuine love for artistic expression
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <h3 className='font-body text-xl font-medium text-deep-charcoal mb-2'>
                  Quality First
                </h3>
                <p className='text-warm-gray'>
                  Premium materials and printing processes ensure lasting beauty
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' />
                  </svg>
                </div>
                <h3 className='font-body text-xl font-medium text-deep-charcoal mb-2'>
                  Community Focus
                </h3>
                <p className='text-warm-gray'>
                  Supporting artists and building connections through shared appreciation
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className='text-center bg-pure-white p-12 rounded-lg border border-sage-green/20'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              Start Your Collection Today
            </h2>
            <p className='text-warm-gray mb-6'>
              Discover prints that speak to your style and transform your space
            </p>
            <a
              href='/collections'
              className='inline-block bg-sage-green text-pure-white px-8 py-3 rounded-lg font-medium hover:bg-sage-green/90 transition-colors'
            >
              Explore Collections
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}