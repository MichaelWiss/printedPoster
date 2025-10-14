import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Printed Poster Gallery',
  description: 'Get in touch with us about our prints, custom orders, or any questions',
};

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Contact Us
          </h1>
          <p className='text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed'>
            Have a question about our prints or need help with your order? 
            We'd love to hear from you.
          </p>
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div className='bg-pure-white p-8 rounded-lg border border-sage-green/20'>
              <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
                Send us a Message
              </h2>
              
              <form className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor='firstName' className='block text-sm font-medium text-deep-charcoal mb-2'>
                      First Name
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      className='w-full px-4 py-3 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition-colors'
                      placeholder='John'
                    />
                  </div>
                  <div>
                    <label htmlFor='lastName' className='block text-sm font-medium text-deep-charcoal mb-2'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      className='w-full px-4 py-3 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition-colors'
                      placeholder='Doe'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-deep-charcoal mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='w-full px-4 py-3 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition-colors'
                    placeholder='john@example.com'
                  />
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm font-medium text-deep-charcoal mb-2'>
                    Subject
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    className='w-full px-4 py-3 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition-colors'
                    placeholder='How can we help you?'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-deep-charcoal mb-2'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={6}
                    required
                    className='w-full px-4 py-3 border border-border-gray rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition-colors resize-vertical'
                    placeholder='Tell us more about your inquiry...'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-sage-green text-pure-white px-8 py-3 rounded-lg font-medium hover:bg-sage-green/90 transition-colors focus:ring-2 focus:ring-sage-green focus:ring-offset-2 outline-none'
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className='space-y-8'>
              {/* Get in Touch */}
              <div className='bg-sage-green/5 p-8 rounded-lg border border-sage-green/20'>
                <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
                  Get in Touch
                </h2>
                <div className='space-y-6'>
                  <div className='flex items-start space-x-4'>
                    <div className='w-10 h-10 bg-sage-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                      <svg className='w-5 h-5 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-body text-lg font-medium text-deep-charcoal mb-1'>
                        Email
                      </h3>
                      <p className='text-warm-gray'>
                        hello@printedpostergallery.com
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-4'>
                    <div className='w-10 h-10 bg-sage-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                      <svg className='w-5 h-5 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-body text-lg font-medium text-deep-charcoal mb-1'>
                        Phone
                      </h3>
                      <p className='text-warm-gray'>
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-4'>
                    <div className='w-10 h-10 bg-sage-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                      <svg className='w-5 h-5 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-body text-lg font-medium text-deep-charcoal mb-1'>
                        Address
                      </h3>
                      <p className='text-warm-gray'>
                        123 Art Gallery Lane<br />
                        Creative District, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className='bg-pure-white p-8 rounded-lg border border-sage-green/20'>
                <h3 className='font-display text-xl font-medium text-deep-charcoal mb-4'>
                  Response Time
                </h3>
                <p className='text-warm-gray leading-relaxed mb-4'>
                  We aim to respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
                <p className='text-sm text-warm-gray'>
                  <strong>Business Hours:</strong><br />
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST
                </p>
              </div>

              {/* FAQ Link */}
              <div className='bg-terracotta/5 p-8 rounded-lg border border-terracotta/20'>
                <h3 className='font-display text-xl font-medium text-deep-charcoal mb-4'>
                  Need Quick Answers?
                </h3>
                <p className='text-warm-gray leading-relaxed mb-4'>
                  Check out our Help Center for answers to frequently asked questions 
                  about orders, shipping, and our products.
                </p>
                <a
                  href='/help-center'
                  className='inline-block bg-terracotta text-pure-white px-6 py-2 rounded-lg font-medium hover:bg-terracotta/90 transition-colors'
                >
                  Visit Help Center
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}