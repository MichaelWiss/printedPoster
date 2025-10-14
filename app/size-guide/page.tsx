import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide - Printed Poster Gallery',
  description: 'Choose the perfect size for your space with our comprehensive print size guide',
};

export default function SizeGuidePage() {
  const printSizes = [
    {
      name: 'Small Prints',
      sizes: [
        { dimensions: '8" × 10"', cm: '20 × 25 cm', description: 'Perfect for desks, shelves, and small wall spaces', popular: false },
        { dimensions: '11" × 14"', cm: '28 × 36 cm', description: 'Great for bathrooms, kitchens, and office spaces', popular: true },
        { dimensions: '12" × 16"', cm: '30 × 41 cm', description: 'Ideal for gallery walls and bedroom accents', popular: false },
      ],
    },
    {
      name: 'Medium Prints',
      sizes: [
        { dimensions: '16" × 20"', cm: '41 × 51 cm', description: 'Popular choice for living rooms and dining areas', popular: true },
        { dimensions: '18" × 24"', cm: '46 × 61 cm', description: 'Statement piece perfect for above furniture', popular: true },
        { dimensions: '20" × 24"', cm: '51 × 61 cm', description: 'Bold presence for modern interiors', popular: false },
      ],
    },
    {
      name: 'Large Prints',
      sizes: [
        { dimensions: '24" × 30"', cm: '61 × 76 cm', description: 'Commanding focal point for any room', popular: false },
        { dimensions: '24" × 36"', cm: '61 × 91 cm', description: 'Dramatic impact for spacious walls', popular: true },
        { dimensions: '30" × 40"', cm: '76 × 102 cm', description: 'Gallery-style statement piece', popular: false },
      ],
    },
    {
      name: 'Extra Large Prints',
      sizes: [
        { dimensions: '36" × 48"', cm: '91 × 122 cm', description: 'Museum-quality centerpiece for grand spaces', popular: false },
      ],
    },
  ];

  const frameSizes = [
    { printSize: '8" × 10"', standardFrame: '11" × 14"', matted: true },
    { printSize: '11" × 14"', standardFrame: '16" × 20"', matted: true },
    { printSize: '16" × 20"', standardFrame: '20" × 24"', matted: true },
    { printSize: '18" × 24"', standardFrame: '24" × 30"', matted: true },
    { printSize: '24" × 36"', standardFrame: '30" × 40"', matted: true },
  ];

  const roomSuggestions = [
    {
      room: 'Living Room',
      icon: '🛋️',
      suggestions: [
        'Above sofa: 24" × 36" or 30" × 40"',
        'Gallery wall: Mix of 11" × 14" and 16" × 20"',
        'Corner accent: 18" × 24"',
      ],
    },
    {
      room: 'Bedroom',
      icon: '🛏️',
      suggestions: [
        'Above headboard: 24" × 30" or 24" × 36"',
        'Bedside walls: 11" × 14" or 16" × 20"',
        'Dresser accent: 8" × 10" or 11" × 14"',
      ],
    },
    {
      room: 'Kitchen',
      icon: '🍳',
      suggestions: [
        'Above sink: 11" × 14" or 12" × 16"',
        'Breakfast nook: 16" × 20"',
        'Open shelves: 8" × 10"',
      ],
    },
    {
      room: 'Home Office',
      icon: '💻',
      suggestions: [
        'Above desk: 16" × 20" or 18" × 24"',
        'Inspiration wall: 11" × 14"',
        'Desk display: 8" × 10"',
      ],
    },
    {
      room: 'Bathroom',
      icon: '🛁',
      suggestions: [
        'Above vanity: 11" × 14"',
        'Powder room: 8" × 10"',
        'Large bathroom: 16" × 20"',
      ],
    },
    {
      room: 'Hallway',
      icon: '🚪',
      suggestions: [
        'Gallery series: 11" × 14" multiples',
        'Statement piece: 16" × 20" or 18" × 24"',
        'Narrow spaces: 12" × 16"',
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Size Guide
          </h1>
          <p className='text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed'>
            Find the perfect size for your space. From intimate accent pieces to 
            bold statement prints, we'll help you choose the right dimensions.
          </p>
        </div>

        {/* Quick Tips */}
        <div className='bg-sage-green/10 p-8 rounded-lg border border-sage-green/20 mb-16'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal text-center mb-8'>
            Quick Sizing Tips
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0h4a2 2 0 012 2v2a1 1 0 01-1 1h-1v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9H2a1 1 0 01-1-1V6a2 2 0 012-2h4z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Wall Space Rule</h3>
              <p className='text-warm-gray text-sm'>
                Print should cover 60-75% of the wall space above furniture
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Eye Level Height</h3>
              <p className='text-warm-gray text-sm'>
                Center of print should be 57-60 inches from floor
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-highlight-orange/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-highlight-orange' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 8V4a1 1 0 011-1h4m12 4V4a1 1 0 00-1-1h-4m4 12v4a1 1 0 01-1 1h-4M4 16v4a1 1 0 001 1h4' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Viewing Distance</h3>
              <p className='text-warm-gray text-sm'>
                Stand back 1.5x the width of the print for optimal viewing
              </p>
            </div>
          </div>
        </div>

        {/* Print Sizes */}
        <div className='mb-16'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-12'>
            Available Print Sizes
          </h2>
          <div className='space-y-8'>
            {printSizes.map((category, index) => (
              <div key={index} className='bg-pure-white p-8 rounded-lg border border-sage-green/20'>
                <h3 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
                  {category.name}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {category.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className={`p-6 rounded-lg border-2 ${size.popular ? 'border-sage-green bg-sage-green/5' : 'border-sage-green/20 bg-cream-base/50'} relative`}>
                      {size.popular && (
                        <div className='absolute -top-3 left-4 bg-sage-green text-pure-white px-3 py-1 rounded-full text-xs font-medium'>
                          Popular
                        </div>
                      )}
                      <div className='text-center mb-4'>
                        <h4 className='font-bold text-xl text-deep-charcoal mb-2'>
                          {size.dimensions}
                        </h4>
                        <p className='text-warm-gray text-sm'>
                          {size.cm}
                        </p>
                      </div>
                      <p className='text-warm-gray text-sm text-center'>
                        {size.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frame Size Chart */}
        <div className='mb-16'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-8'>
            Framing Guide
          </h2>
          <p className='text-center text-warm-gray mb-8 max-w-2xl mx-auto'>
            Our prints include a small white border, making them perfect for framing. 
            Here are the recommended frame sizes with matting for a professional look.
          </p>
          <div className='bg-pure-white rounded-lg border border-sage-green/20 overflow-hidden max-w-4xl mx-auto'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-sage-green/5 border-b border-sage-green/20'>
                    <th className='text-left p-4 font-medium text-deep-charcoal'>Print Size</th>
                    <th className='text-left p-4 font-medium text-deep-charcoal'>Recommended Frame Size</th>
                    <th className='text-left p-4 font-medium text-deep-charcoal'>With Matting</th>
                  </tr>
                </thead>
                <tbody>
                  {frameSizes.map((item, index) => (
                    <tr key={index} className='border-b border-sage-green/10 hover:bg-sage-green/5'>
                      <td className='p-4 font-medium text-deep-charcoal'>{item.printSize}</td>
                      <td className='p-4 text-warm-gray'>{item.standardFrame}</td>
                      <td className='p-4'>
                        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success'>
                          <svg className='w-3 h-3 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                          </svg>
                          Recommended
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Room-by-Room Guide */}
        <div className='mb-16'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-12'>
            Size Suggestions by Room
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {roomSuggestions.map((room, index) => (
              <div key={index} className='bg-pure-white p-8 rounded-lg border border-sage-green/20 text-center'>
                <div className='text-4xl mb-4'>{room.icon}</div>
                <h3 className='font-display text-xl font-medium text-deep-charcoal mb-6'>
                  {room.room}
                </h3>
                <div className='space-y-3 text-left'>
                  {room.suggestions.map((suggestion, suggestionIndex) => (
                    <div key={suggestionIndex} className='flex items-start space-x-2'>
                      <div className='w-2 h-2 bg-sage-green rounded-full flex-shrink-0 mt-2'></div>
                      <p className='text-warm-gray text-sm'>
                        {suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Size Comparison */}
        <div className='bg-pure-white p-12 rounded-lg border border-sage-green/20 mb-16'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal text-center mb-8'>
            Visual Size Comparison
          </h2>
          <p className='text-center text-warm-gray mb-8 max-w-2xl mx-auto'>
            Use everyday objects to visualize print sizes in your space
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='text-center'>
              <div className='bg-sage-green/10 p-6 rounded-lg mb-4'>
                <div className='text-2xl mb-2'>📱</div>
                <div className='text-sm font-medium text-deep-charcoal'>8" × 10"</div>
              </div>
              <p className='text-xs text-warm-gray'>About the size of a tablet</p>
            </div>
            <div className='text-center'>
              <div className='bg-sage-green/10 p-6 rounded-lg mb-4'>
                <div className='text-2xl mb-2'>💻</div>
                <div className='text-sm font-medium text-deep-charcoal'>16" × 20"</div>
              </div>
              <p className='text-xs text-warm-gray'>Similar to a laptop screen</p>
            </div>
            <div className='text-center'>
              <div className='bg-sage-green/10 p-6 rounded-lg mb-4'>
                <div className='text-2xl mb-2'>🖥️</div>
                <div className='text-sm font-medium text-deep-charcoal'>24" × 36"</div>
              </div>
              <p className='text-xs text-warm-gray'>Like a large monitor</p>
            </div>
            <div className='text-center'>
              <div className='bg-sage-green/10 p-6 rounded-lg mb-4'>
                <div className='text-2xl mb-2'>📺</div>
                <div className='text-sm font-medium text-deep-charcoal'>36" × 48"</div>
              </div>
              <p className='text-xs text-warm-gray'>Similar to a large TV</p>
            </div>
          </div>
        </div>

        {/* Custom Sizes */}
        <div className='text-center bg-terracotta/5 p-12 rounded-lg border border-terracotta/20'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
            Need a Custom Size?
          </h2>
          <p className='text-warm-gray mb-8 max-w-2xl mx-auto'>
            Don't see the perfect size for your space? We offer custom sizing for most of our prints. 
            Contact us with your specific dimensions and we'll help bring your vision to life.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='/contact'
              className='inline-flex items-center justify-center bg-terracotta text-pure-white px-8 py-3 rounded-lg font-medium hover:bg-terracotta/90 transition-colors'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
              </svg>
              Request Custom Size
            </a>
            <a
              href='/help-center'
              className='inline-flex items-center justify-center bg-pure-white border-2 border-terracotta text-terracotta px-8 py-3 rounded-lg font-medium hover:bg-terracotta hover:text-pure-white transition-colors'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              Need Help Choosing?
            </a>
          </div>
          
          <div className='mt-8 text-sm text-warm-gray'>
            <p>Custom sizing available for orders over $100</p>
            <p>Lead time: 7-10 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}