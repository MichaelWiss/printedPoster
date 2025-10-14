import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Sellers - Printed Poster Gallery',
  description: 'Our most popular prints and posters, loved by customers worldwide',
};

export default function BestSellersPage() {
  // Placeholder product data with bestseller indicators
  const placeholderProducts = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    title: `Best Seller ${i + 1}`,
    price: `$${(Math.random() * 60 + 25).toFixed(2)}`,
    originalPrice: i < 4 ? `$${(Math.random() * 20 + 80).toFixed(2)}` : null,
    image: `https://picsum.photos/400/600?random=${i + 50}`,
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    reviews: Math.floor(Math.random() * 200) + 50,
    rank: i + 1,
  }));

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Best Sellers
          </h1>
          <p className='text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed'>
            Our most beloved prints, chosen by art enthusiasts worldwide. 
            These customer favorites have earned their place through quality and beauty.
          </p>
        </div>

        {/* Bestseller Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          <div className='text-center bg-pure-white p-8 rounded-lg border border-sage-green/20'>
            <div className='text-3xl font-bold text-sage-green mb-2'>10K+</div>
            <div className='text-warm-gray'>Happy Customers</div>
          </div>
          <div className='text-center bg-pure-white p-8 rounded-lg border border-sage-green/20'>
            <div className='text-3xl font-bold text-sage-green mb-2'>4.8★</div>
            <div className='text-warm-gray'>Average Rating</div>
          </div>
          <div className='text-center bg-pure-white p-8 rounded-lg border border-sage-green/20'>
            <div className='text-3xl font-bold text-sage-green mb-2'>50+</div>
            <div className='text-warm-gray'>Countries Shipped</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12'>
          <div className='flex items-center space-x-4'>
            <span className='text-warm-gray'>Sort by:</span>
            <select className='px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none bg-pure-white'>
              <option>Best Selling</option>
              <option>Highest Rated</option>
              <option>Most Reviews</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className='text-sm text-warm-gray'>
            {placeholderProducts.length} bestselling products
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
                
                {/* Bestseller Badge */}
                <div className='absolute top-3 left-3'>
                  {product.rank <= 3 ? (
                    <div className='bg-highlight-orange text-pure-white px-2 py-1 rounded text-xs font-medium flex items-center'>
                      <svg className='w-3 h-3 mr-1' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                      </svg>
                      #{product.rank}
                    </div>
                  ) : (
                    <div className='bg-terracotta text-pure-white px-2 py-1 rounded text-xs font-medium'>
                      BESTSELLER
                    </div>
                  )}
                </div>

                {/* Sale Badge */}
                {product.originalPrice && (
                  <div className='absolute top-3 right-3 bg-error text-pure-white px-2 py-1 rounded text-xs font-medium'>
                    SALE
                  </div>
                )}

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
                
                {/* Rating */}
                <div className='flex items-center gap-2 mb-3'>
                  <div className='flex text-terracotta'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? 'fill-current' : 'fill-current opacity-30'}`}
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                      </svg>
                    ))}
                  </div>
                  <span className='text-sm text-warm-gray'>({product.reviews})</span>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-price text-deep-charcoal'>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className='text-sm text-warm-gray line-through'>
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
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
            Load More Bestsellers
          </button>
        </div>

        {/* Customer Reviews Section */}
        <div className='mt-24 bg-pure-white p-12 rounded-lg border border-sage-green/20'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-12'>
            What Our Customers Say
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                name: 'Sarah M.',
                rating: 5,
                text: 'Absolutely love my prints! The quality is exceptional and shipping was fast.',
              },
              {
                name: 'Michael R.',
                rating: 5,
                text: 'These bestsellers are bestsellers for a reason. Every piece I\'ve bought has been perfect.',
              },
              {
                name: 'Emma L.',
                rating: 4,
                text: 'Great selection and customer service. Will definitely order again!',
              },
            ].map((review, i) => (
              <div key={i} className='text-center'>
                <div className='flex justify-center text-terracotta mb-4'>
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className={`w-5 h-5 ${j < review.rating ? 'fill-current' : 'fill-current opacity-30'}`}
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                  ))}
                </div>
                <p className='text-warm-gray italic mb-4'>"{review.text}"</p>
                <p className='font-medium text-deep-charcoal'>— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}