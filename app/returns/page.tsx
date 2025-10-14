import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns - Printed Poster Gallery',
  description: 'Learn about our return policy and process for art prints and posters',
};

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: 'Contact Us',
      description: 'Email us within 30 days of delivery with your order number and reason for return',
      icon: '📧',
    },
    {
      step: 2,
      title: 'Get Authorization',
      description: 'We\'ll provide a return authorization number and prepaid shipping label',
      icon: '✅',
    },
    {
      step: 3,
      title: 'Pack Securely',
      description: 'Repack your prints using original packaging or similar protective materials',
      icon: '📦',
    },
    {
      step: 4,
      title: 'Ship Back',
      description: 'Attach the prepaid label and drop off at any authorized shipping location',
      icon: '🚚',
    },
    {
      step: 5,
      title: 'Get Refund',
      description: 'Once we receive and inspect your return, we\'ll process your refund within 5-7 days',
      icon: '💰',
    },
  ];

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Returns & Exchanges
          </h1>
          <p className='text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed'>
            We want you to love your prints. If you're not completely satisfied, 
            we'll make it right with our hassle-free return process.
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className='bg-sage-green/10 p-12 rounded-lg border border-sage-green/20 mb-16 text-center'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <div className='text-4xl mb-4'>📅</div>
              <h3 className='font-display text-xl font-medium text-deep-charcoal mb-3'>
                30-Day Window
              </h3>
              <p className='text-warm-gray'>
                Returns accepted within 30 days of delivery for unused items in original condition
              </p>
            </div>
            <div>
              <div className='text-4xl mb-4'>🆓</div>
              <h3 className='font-display text-xl font-medium text-deep-charcoal mb-3'>
                Free Return Shipping
              </h3>
              <p className='text-warm-gray'>
                We provide prepaid shipping labels for all approved returns within the US
              </p>
            </div>
            <div>
              <div className='text-4xl mb-4'>💯</div>
              <h3 className='font-display text-xl font-medium text-deep-charcoal mb-3'>
                Full Refund
              </h3>
              <p className='text-warm-gray'>
                Complete refund of purchase price once we receive and approve your return
              </p>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className='mb-16'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-12'>
            How to Return Your Order
          </h2>
          <div className='max-w-4xl mx-auto'>
            {returnSteps.map((step, index) => (
              <div key={index} className='flex items-start mb-8 last:mb-0'>
                <div className='flex-shrink-0 w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mr-6'>
                  <div className='text-2xl'>{step.icon}</div>
                </div>
                <div className='flex-grow bg-pure-white p-6 rounded-lg border border-sage-green/20'>
                  <div className='flex items-center mb-3'>
                    <div className='w-8 h-8 bg-sage-green text-pure-white rounded-full flex items-center justify-center text-sm font-bold mr-4'>
                      {step.step}
                    </div>
                    <h3 className='font-display text-xl font-medium text-deep-charcoal'>
                      {step.title}
                    </h3>
                  </div>
                  <p className='text-warm-gray leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Conditions */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          <div className='bg-pure-white p-8 rounded-lg border border-sage-green/20'>
            <h3 className='font-display text-2xl font-medium text-deep-charcoal mb-6 text-center'>
              ✅ Eligible for Return
            </h3>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-success' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Unused Prints</h4>
                  <p className='text-warm-gray text-sm'>Items in original condition, unframed and undamaged</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-success' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Standard Size Prints</h4>
                  <p className='text-warm-gray text-sm'>All standard catalog items available for return</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-success' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Quality Issues</h4>
                  <p className='text-warm-gray text-sm'>Defective or damaged items (we\'ll also cover shipping)</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-success' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Original Packaging</h4>
                  <p className='text-warm-gray text-sm'>Items returned in protective packaging</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-error/5 p-8 rounded-lg border border-error/20'>
            <h3 className='font-display text-2xl font-medium text-deep-charcoal mb-6 text-center'>
              ❌ Not Eligible for Return
            </h3>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-error' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Custom Orders</h4>
                  <p className='text-warm-gray text-sm'>Personalized or custom-sized prints (unless defective)</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-error' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Digital Downloads</h4>
                  <p className='text-warm-gray text-sm'>Digital files cannot be returned once downloaded</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-error' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>Damaged by Customer</h4>
                  <p className='text-warm-gray text-sm'>Items damaged during framing or handling</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <svg className='w-3 h-3 text-error' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-medium text-deep-charcoal mb-1'>After 30 Days</h4>
                  <p className='text-warm-gray text-sm'>Returns must be initiated within 30 days of delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className='bg-terracotta/5 p-12 rounded-lg border border-terracotta/20 mb-16'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal text-center mb-8'>
            Exchanges
          </h2>
          <div className='max-w-3xl mx-auto text-center'>
            <p className='text-warm-gray leading-relaxed mb-6'>
              While we don't offer direct exchanges, you can return your original item and place a new order for the item you prefer. 
              This ensures you get exactly what you want and helps us process your request faster.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-pure-white p-6 rounded-lg border border-terracotta/20'>
                <h4 className='font-medium text-deep-charcoal mb-2'>Different Size?</h4>
                <p className='text-warm-gray text-sm'>Return your current print and order the size you need</p>
              </div>
              <div className='bg-pure-white p-6 rounded-lg border border-terracotta/20'>
                <h4 className='font-medium text-deep-charcoal mb-2'>Different Design?</h4>
                <p className='text-warm-gray text-sm'>Return and choose from our full collection of prints</p>
              </div>
            </div>
          </div>
        </div>

        {/* International Returns */}
        <div className='bg-pure-white p-12 rounded-lg border border-sage-green/20 mb-16'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal text-center mb-8'>
            International Returns
          </h2>
          <div className='max-w-3xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-center'>
              <div>
                <div className='text-3xl mb-4'>🌍</div>
                <h4 className='font-medium text-deep-charcoal mb-3'>Return Process</h4>
                <p className='text-warm-gray text-sm'>
                  Same 30-day return policy applies. Contact us for return authorization and instructions.
                </p>
              </div>
              <div>
                <div className='text-3xl mb-4'>💸</div>
                <h4 className='font-medium text-deep-charcoal mb-3'>Return Shipping</h4>
                <p className='text-warm-gray text-sm'>
                  International customers are responsible for return shipping costs unless item is defective.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className='bg-pure-white p-12 rounded-lg border border-sage-green/20 mb-16'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal text-center mb-8'>
            Return FAQ
          </h2>
          <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h4 className='font-medium text-deep-charcoal mb-3'>How long does the refund take?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                Once we receive and inspect your return, refunds are processed within 5-7 business days. 
                It may take an additional 3-5 days for the refund to appear in your account.
              </p>

              <h4 className='font-medium text-deep-charcoal mb-3'>Can I return a framed print?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                We can only accept returns of unframed prints in original condition. 
                Please remove prints from frames before returning.
              </p>
            </div>
            <div>
              <h4 className='font-medium text-deep-charcoal mb-3'>What if I lost the packaging?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                That's okay! Use any protective packaging like cardboard tubes or rigid mailers. 
                The key is ensuring the print arrives safely back to us.
              </p>

              <h4 className='font-medium text-deep-charcoal mb-3'>Do you offer store credit?</h4>
              <p className='text-warm-gray text-sm mb-6'>
                Currently, we only process refunds to the original payment method. 
                However, you're always welcome to place a new order for different items.
              </p>
            </div>
          </div>
        </div>

        {/* Contact for Returns */}
        <div className='text-center bg-sage-green/5 p-12 rounded-lg border border-sage-green/20'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
            Ready to Start a Return?
          </h2>
          <p className='text-warm-gray mb-8 max-w-2xl mx-auto'>
            Contact our customer service team to begin your return process. 
            We're here to help make it as smooth as possible.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='mailto:returns@printedpostergallery.com'
              className='inline-flex items-center justify-center bg-sage-green text-pure-white px-8 py-3 rounded-lg font-medium hover:bg-sage-green/90 transition-colors'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              Email Us
            </a>
            <a
              href='/help-center'
              className='inline-flex items-center justify-center bg-pure-white border-2 border-sage-green text-sage-green px-8 py-3 rounded-lg font-medium hover:bg-sage-green hover:text-pure-white transition-colors'
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              Visit Help Center
            </a>
          </div>
          
          <div className='mt-8 text-sm text-warm-gray'>
            <p>Email: returns@printedpostergallery.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Response time: Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}