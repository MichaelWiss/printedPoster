import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Info - Printed Poster Gallery',
  description: 'Learn about our shipping options, delivery times, and policies for art prints',
};

export default function ShippingInfoPage() {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      price: 'FREE on orders $50+',
      deliveryTime: '5-7 business days',
      description: 'Reliable delivery with tracking included',
      icon: '📦',
    },
    {
      name: 'Express Shipping',
      price: '$12.99',
      deliveryTime: '2-3 business days',
      description: 'Faster delivery for urgent orders',
      icon: '⚡',
    },
    {
      name: 'Priority Overnight',
      price: '$24.99',
      deliveryTime: '1 business day',
      description: 'Next-day delivery for time-sensitive orders',
      icon: '🚀',
    },
  ];

  const internationalShipping = [
    { region: 'Canada', time: '7-10 business days', cost: '$15.99' },
    { region: 'Europe', time: '10-15 business days', cost: '$19.99' },
    { region: 'Australia & New Zealand', time: '12-18 business days', cost: '$22.99' },
    { region: 'Asia', time: '10-15 business days', cost: '$19.99' },
    { region: 'Rest of World', time: '15-25 business days', cost: '$24.99' },
  ];

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Shipping Information
          </h1>
          <p className='text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed'>
            We're committed to getting your beautiful prints to you safely and efficiently
          </p>
        </div>

        {/* Shipping Promise */}
        <div className='bg-sage-green/10 p-8 rounded-lg border border-sage-green/20 mb-16 text-center'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
            Our Shipping Promise
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mb-4'>
                <svg className='w-8 h-8 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Secure Packaging</h3>
              <p className='text-warm-gray text-center'>Every print is carefully protected</p>
            </div>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mb-4'>
                <svg className='w-8 h-8 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Fast Processing</h3>
              <p className='text-warm-gray text-center'>Orders ship within 1-2 business days</p>
            </div>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 bg-highlight-orange/20 rounded-full flex items-center justify-center mb-4'>
                <svg className='w-8 h-8 text-highlight-orange' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Full Tracking</h3>
              <p className='text-warm-gray text-center'>Track your order every step of the way</p>
            </div>
          </div>
        </div>

        {/* Domestic Shipping Options */}
        <div className='mb-16'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-12'>
            US Shipping Options
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {shippingOptions.map((option, index) => (
              <div key={index} className='bg-pure-white p-8 rounded-lg border border-sage-green/20 text-center hover:shadow-md transition-shadow'>
                <div className='text-4xl mb-4'>{option.icon}</div>
                <h3 className='font-display text-xl font-medium text-deep-charcoal mb-3'>
                  {option.name}
                </h3>
                <div className='text-2xl font-bold text-sage-green mb-2'>
                  {option.price}
                </div>
                <div className='text-lg text-deep-charcoal mb-3'>
                  {option.deliveryTime}
                </div>
                <p className='text-warm-gray text-sm'>
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* International Shipping */}
        <div className='mb-16'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-12'>
            International Shipping
          </h2>
          <div className='bg-pure-white rounded-lg border border-sage-green/20 overflow-hidden'>
            <div className='p-6 bg-sage-green/5 border-b border-sage-green/20'>
              <p className='text-deep-charcoal font-medium text-center'>
                We ship to over 50 countries worldwide
              </p>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-sage-green/20'>
                    <th className='text-left p-4 font-medium text-deep-charcoal'>Region</th>
                    <th className='text-left p-4 font-medium text-deep-charcoal'>Delivery Time</th>
                    <th className='text-left p-4 font-medium text-deep-charcoal'>Shipping Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {internationalShipping.map((region, index) => (
                    <tr key={index} className='border-b border-sage-green/10 hover:bg-sage-green/5'>
                      <td className='p-4 font-medium text-deep-charcoal'>{region.region}</td>
                      <td className='p-4 text-warm-gray'>{region.time}</td>
                      <td className='p-4 text-sage-green font-medium'>{region.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='mt-6 text-center text-sm text-warm-gray'>
            * International orders may be subject to customs duties and taxes, which are the responsibility of the recipient
          </div>
        </div>

        {/* Packaging Information */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          <div className='bg-pure-white p-8 rounded-lg border border-sage-green/20'>
            <h3 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
              How We Package Your Prints
            </h3>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <div className='w-2 h-2 bg-sage-green rounded-full'></div>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Protective Materials</h4>
                  <p className='text-warm-gray text-sm'>Acid-free tissue paper and protective backing boards</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <div className='w-2 h-2 bg-sage-green rounded-full'></div>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Rigid Tubes or Flat Packs</h4>
                  <p className='text-warm-gray text-sm'>Size-appropriate packaging to prevent bending or damage</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <div className='w-2 h-2 bg-sage-green rounded-full'></div>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Weather Protection</h4>
                  <p className='text-warm-gray text-sm'>Waterproof outer packaging for all weather conditions</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-terracotta/5 p-8 rounded-lg border border-terracotta/20'>
            <h3 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
              Order Processing & Tracking
            </h3>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='text-xs font-bold text-terracotta'>1</span>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Order Confirmation</h4>
                  <p className='text-warm-gray text-sm'>Immediate email confirmation with order details</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='text-xs font-bold text-terracotta'>2</span>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Processing</h4>
                  <p className='text-warm-gray text-sm'>1-2 business days for quality printing and packaging</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='text-xs font-bold text-terracotta'>3</span>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Shipping Notification</h4>
                  <p className='text-warm-gray text-sm'>Tracking number sent via email when shipped</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='bg-pure-white p-12 rounded-lg border border-sage-green/20'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal text-center mb-8'>
            Shipping FAQ
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h4 className='font-medium text-deep-charcoal mb-3'>Can I change my shipping address?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                Address changes are possible within 2 hours of placing your order. Contact us immediately if you need to make changes.
              </p>

              <h4 className='font-medium text-deep-charcoal mb-3'>What if my package is damaged?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                We'll replace any damaged prints free of charge. Please contact us within 7 days of delivery with photos.
              </p>
            </div>
            <div>
              <h4 className='font-medium text-deep-charcoal mb-3'>Do you ship to P.O. Boxes?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                Yes, we can ship to P.O. Boxes for smaller prints. Large prints may require a physical address.
              </p>

              <h4 className='font-medium text-deep-charcoal mb-3'>What about customs and duties?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                International customers are responsible for any customs duties, taxes, or fees imposed by their country.
              </p>
            </div>
          </div>

          <div className='text-center mt-8'>
            <p className='text-warm-gray mb-4'>Have more questions about shipping?</p>
            <a
              href='/help-center'
              className='inline-block bg-sage-green text-pure-white px-6 py-3 rounded-lg font-medium hover:bg-sage-green/90 transition-colors'
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}