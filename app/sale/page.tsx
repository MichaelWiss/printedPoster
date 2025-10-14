import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sale - Printed Poster Gallery',
  description: 'Amazing deals on premium prints and posters - limited time offers',
};

export default function SalePage() {
  // Placeholder sale product data
  const saleProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Sale Print ${i + 1}`,
    price: `$${(Math.random() * 40 + 15).toFixed(2)}`,
    originalPrice: `$${(Math.random() * 30 + 50).toFixed(2)}`,
    discount: Math.floor(Math.random() * 40) + 20, // 20-60% off
    image: `https://picsum.photos/400/600?random=${i + 100}`,
    category: ['Abstract', 'Nature', 'Vintage', 'Modern'][Math.floor(Math.random() * 4)],
    endDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within 7 days
  }));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className='min-h-screen bg-cream-base'>
      {/* Hero Banner */}
      <div className='bg-gradient-to-r from-highlight-orange to-terracotta text-pure-white py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='font-display text-5xl lg:text-6xl font-bold mb-6'>
            MEGA SALE
          </h1>
          <p className='text-xl lg:text-2xl mb-8 opacity-90'>
            Up to 60% OFF Premium Prints
          </p>
          <div className='inline-flex items-center bg-pure-white text-highlight-orange px-6 py-3 rounded-full font-medium text-lg'>
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            Limited Time Offer
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        {/* Sale Categories */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-16'>
          {['All Items', 'Abstract', 'Nature', 'Vintage', 'Modern'].map((category) => (
            <button
              key={category}
              className='bg-pure-white border-2 border-sage-green/20 text-deep-charcoal py-3 px-4 rounded-lg font-medium hover:border-sage-green hover:bg-sage-green hover:text-pure-white transition-all duration-300'
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sale Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-16'>
          <div className='text-center bg-highlight-orange/10 p-6 rounded-lg border border-highlight-orange/20'>
            <div className='text-3xl font-bold text-highlight-orange mb-2'>60%</div>
            <div className='text-warm-gray'>Max Discount</div>
          </div>
          <div className='text-center bg-terracotta/10 p-6 rounded-lg border border-terracotta/20'>
            <div className='text-3xl font-bold text-terracotta mb-2'>200+</div>
            <div className='text-warm-gray'>Items on Sale</div>
          </div>
          <div className='text-center bg-sage-green/10 p-6 rounded-lg border border-sage-green/20'>
            <div className='text-3xl font-bold text-sage-green mb-2'>3</div>
            <div className='text-warm-gray'>Days Left</div>
          </div>
          <div className='text-center bg-deep-charcoal/10 p-6 rounded-lg border border-deep-charcoal/20'>
            <div className='text-3xl font-bold text-deep-charcoal mb-2'>FREE</div>
            <div className='text-warm-gray'>Shipping Over $50</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12'>
          <div className='flex items-center space-x-4'>
            <span className='text-warm-gray'>Sort by:</span>
            <select className='px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-highlight-orange focus:border-highlight-orange outline-none bg-pure-white'>
              <option>Biggest Discount</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Ending Soon</option>
              <option>Newest</option>
            </select>
          </div>
          <div className='text-sm text-warm-gray'>
            {saleProducts.length} items on sale
          </div>
        </div>

        {/* Flash Sale Banner */}
        <div className='bg-gradient-to-r from-error to-highlight-orange text-pure-white p-6 rounded-lg mb-12 text-center'>
          <h2 className='font-display text-2xl font-bold mb-2'>⚡ FLASH SALE ⚡</h2>
          <p className='text-lg'>Extra 20% OFF when you buy 3+ items | Use code: <strong>FLASH20</strong></p>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {saleProducts.map((product) => (
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
                
                {/* Sale Badge */}
                <div className='absolute top-3 left-3 bg-error text-pure-white px-2 py-1 rounded text-xs font-medium'>
                  -{product.discount}%
                </div>

                {/* Category Badge */}
                <div className='absolute top-3 right-3 bg-sage-green text-pure-white px-2 py-1 rounded text-xs font-medium'>
                  {product.category}
                </div>

                {/* Countdown Timer for some items */}
                {product.id <= 5 && (
                  <div className='absolute bottom-3 left-3 right-3 bg-black/80 text-pure-white px-2 py-1 rounded text-xs text-center'>
                    Ends: {formatDate(product.endDate)}
                  </div>
                )}

                {/* Quick View Button */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
                  <button className='bg-highlight-orange text-pure-white px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
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
                  {product.category} Print
                </p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-price text-highlight-orange font-bold'>
                      {product.price}
                    </span>
                    <span className='text-sm text-warm-gray line-through'>
                      {product.originalPrice}
                    </span>
                  </div>
                  <div className='text-xs bg-success/10 text-success px-2 py-1 rounded'>
                    Save ${(parseFloat(product.originalPrice.slice(1)) - parseFloat(product.price.slice(1))).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className='text-center mt-16'>
          <button className='bg-highlight-orange text-pure-white px-8 py-3 rounded-lg font-medium hover:bg-highlight-orange/90 transition-colors'>
            Load More Sale Items
          </button>
        </div>

        {/* Sale Terms */}
        <div className='mt-16 bg-pure-white p-8 rounded-lg border border-sage-green/20'>
          <h3 className='font-display text-xl font-medium text-deep-charcoal mb-4'>
            Sale Terms & Conditions
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-warm-gray'>
            <div>
              <ul className='space-y-2'>
                <li>• Sale prices valid until stock lasts</li>
                <li>• Limited quantities available</li>
                <li>• Free shipping on orders over $50</li>
                <li>• Cannot be combined with other offers</li>
              </ul>
            </div>
            <div>
              <ul className='space-y-2'>
                <li>• Standard return policy applies</li>
                <li>• Digital downloads excluded</li>
                <li>• Bulk order discounts may apply</li>
                <li>• Customer service: hello@gallery.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}