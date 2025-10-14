import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Arrivals - Printed Poster Gallery',
  description: 'Discover our latest collection of artistic prints and posters',
};

export default function NewArrivalsPage() {
  // Placeholder product data
  const placeholderProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `New Arrival ${i + 1}`,
    price: `$${(Math.random() * 80 + 20).toFixed(2)}`,
    image: `https://picsum.photos/400/600?random=${i + 1}`,
  }));

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            New Arrivals
          </h1>
          <p className='text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed'>
            Fresh additions to our curated collection. Be the first to discover 
            these latest artistic prints and limited edition pieces.
          </p>
        </div>

        {/* Filter Bar */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12'>
          <div className='flex items-center space-x-4'>
            <span className='text-warm-gray'>Sort by:</span>
            <select className='px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none bg-pure-white'>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Alphabetical</option>
            </select>
          </div>
          <div className='text-sm text-warm-gray'>
            {placeholderProducts.length} products
          </div>
        </div>

        {/* New Badge */}
        <div className='flex justify-center mb-8'>
          <div className='inline-flex items-center px-4 py-2 bg-highlight-orange text-pure-white rounded-full text-sm font-medium'>
            <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 3l14 9-14 9V3z' />
            </svg>
            Just Added This Week
          </div>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {placeholderProducts.map((product) => (
            <div
              key={product.id}
              className='group bg-pure-white rounded-lg border border-sage-green/20 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
            >
              {/* Product Image */}
              <div className='relative h-80 bg-light-gray overflow-hidden'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
                {/* New Badge */}
                <div className='absolute top-3 left-3 bg-highlight-orange text-pure-white px-2 py-1 rounded text-xs font-medium'>
                  NEW
                </div>
                {/* Quick View Button */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
                  <button className='bg-sage-green text-pure-white px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className='p-6'>
                <h3 className='font-body text-lg font-medium text-deep-charcoal mb-2 group-hover:text-sage-green transition-colors'>
                  {product.title}
                </h3>
                <p className='text-warm-gray text-sm mb-3'>
                  Limited Edition Print
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-price text-deep-charcoal'>
                    {product.price}
                  </span>
                  <button className='text-sage-green hover:text-sage-green/80 transition-colors'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className='text-center mt-16'>
          <button className='bg-sage-green text-pure-white px-8 py-3 rounded-lg font-medium hover:bg-sage-green/90 transition-colors'>
            Load More Products
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className='mt-24 text-center bg-pure-white p-12 rounded-lg border border-sage-green/20'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
            Stay Updated on New Arrivals
          </h2>
          <p className='text-warm-gray mb-6 max-w-md mx-auto'>
            Be the first to know about our latest prints and exclusive collections
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-4 py-3 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none'
            />
            <button className='bg-sage-green text-pure-white px-6 py-3 rounded-lg font-medium hover:bg-sage-green/90 transition-colors'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}