import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center - Printed Poster Gallery',
  description: 'Find answers to frequently asked questions about our prints, orders, and services',
};

export default function HelpCenterPage() {
  const faqCategories = [
    {
      title: 'Orders & Payment',
      icon: '💳',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for your convenience.',
        },
        {
          question: 'Can I modify or cancel my order after placing it?',
          answer: 'Orders can be modified or cancelled within 2 hours of placement. After this time, your order enters production and changes may not be possible.',
        },
        {
          question: 'Do you offer bulk discounts?',
          answer: 'Yes! We offer discounts for orders of 10+ prints. Contact us at hello@gallery.com for custom pricing.',
        },
      ],
    },
    {
      title: 'Shipping & Delivery',
      icon: '📦',
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days within the US. International shipping takes 10-15 business days. Express options are available.',
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination.',
        },
        {
          question: 'How do you package the prints?',
          answer: 'All prints are carefully rolled in protective tubes or flat-packed between rigid boards, depending on size, to ensure they arrive in perfect condition.',
        },
      ],
    },
    {
      title: 'Product Information',
      icon: '🖼️',
      faqs: [
        {
          question: 'What materials do you use for printing?',
          answer: 'We use museum-quality, acid-free paper and archival inks that resist fading for 100+ years when properly cared for.',
        },
        {
          question: 'What sizes are available?',
          answer: 'We offer sizes from 8x10" to 36x48". Custom sizes may be available upon request - please contact us for details.',
        },
        {
          question: 'Are the prints ready to frame?',
          answer: 'Yes, all prints come with a small white border and are ready to frame. We also offer framing services for select prints.',
        },
      ],
    },
    {
      title: 'Returns & Exchanges',
      icon: '🔄',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unused prints in original condition. Custom orders are non-returnable unless defective.',
        },
        {
          question: 'How do I return an item?',
          answer: 'Contact our support team to initiate a return. We\'ll provide a prepaid shipping label and instructions for secure packaging.',
        },
        {
          question: 'What if my print arrives damaged?',
          answer: 'We\'ll replace any damaged prints free of charge. Please contact us within 7 days of delivery with photos of the damage.',
        },
      ],
    },
  ];

  const quickLinks = [
    { title: 'Track Your Order', href: '#', icon: '📍' },
    { title: 'Size Guide', href: '/size-guide', icon: '📏' },
    { title: 'Shipping Info', href: '/shipping-info', icon: '🚚' },
    { title: 'Returns', href: '/returns', icon: '🔄' },
    { title: 'Contact Us', href: '/contact', icon: '💬' },
  ];

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Help Center
          </h1>
          <p className='text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed'>
            Find quick answers to your questions about orders, shipping, products, and more
          </p>
        </div>

        {/* Search Bar */}
        <div className='max-w-2xl mx-auto mb-16'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for answers...'
              className='w-full px-6 py-4 pl-12 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none text-lg'
            />
            <svg
              className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
        </div>

        {/* Quick Links */}
        <div className='mb-16'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal text-center mb-8'>
            Quick Links
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className='bg-pure-white p-6 rounded-lg border border-sage-green/20 text-center hover:shadow-md hover:border-sage-green transition-all duration-300 group'
              >
                <div className='text-3xl mb-3'>{link.icon}</div>
                <div className='font-medium text-deep-charcoal group-hover:text-sage-green transition-colors'>
                  {link.title}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className='max-w-6xl mx-auto'>
          <h2 className='font-display text-3xl font-medium text-deep-charcoal text-center mb-12'>
            Frequently Asked Questions
          </h2>
          
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className='bg-pure-white p-8 rounded-lg border border-sage-green/20'>
                <div className='flex items-center mb-6'>
                  <span className='text-3xl mr-4'>{category.icon}</span>
                  <h3 className='font-display text-2xl font-medium text-deep-charcoal'>
                    {category.title}
                  </h3>
                </div>
                
                <div className='space-y-6'>
                  {category.faqs.map((faq, faqIndex) => (
                    <div key={faqIndex}>
                      <h4 className='font-body text-lg font-medium text-deep-charcoal mb-3'>
                        {faq.question}
                      </h4>
                      <p className='text-warm-gray leading-relaxed'>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className='mt-16 bg-sage-green/5 p-12 rounded-lg border border-sage-green/20 text-center'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
            Still Need Help?
          </h2>
          <p className='text-warm-gray mb-8 max-w-2xl mx-auto'>
            Can't find what you're looking for? Our friendly support team is here to help you with any questions or concerns.
          </p>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            <div className='bg-pure-white p-6 rounded-lg border border-sage-green/20'>
              <div className='w-12 h-12 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-6 h-6 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Email Support</h3>
              <p className='text-sm text-warm-gray mb-4'>Get detailed help via email</p>
              <a
                href='mailto:hello@printedpostergallery.com'
                className='text-sage-green hover:text-sage-green/80 font-medium'
              >
                Send Message
              </a>
            </div>

            <div className='bg-pure-white p-6 rounded-lg border border-sage-green/20'>
              <div className='w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-6 h-6 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Live Chat</h3>
              <p className='text-sm text-warm-gray mb-4'>Chat with us in real-time</p>
              <button className='text-terracotta hover:text-terracotta/80 font-medium'>
                Start Chat
              </button>
            </div>

            <div className='bg-pure-white p-6 rounded-lg border border-sage-green/20'>
              <div className='w-12 h-12 bg-deep-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-6 h-6 text-deep-charcoal' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
              </div>
              <h3 className='font-medium text-deep-charcoal mb-2'>Phone Support</h3>
              <p className='text-sm text-warm-gray mb-4'>Speak directly with our team</p>
              <a
                href='tel:+15551234567'
                className='text-deep-charcoal hover:text-deep-charcoal/80 font-medium'
              >
                Call Now
              </a>
            </div>
          </div>

          <div className='mt-8 text-sm text-warm-gray'>
            <p>Support Hours: Monday-Friday 9AM-6PM EST, Saturday 10AM-4PM EST</p>
            <p>Average response time: Under 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}