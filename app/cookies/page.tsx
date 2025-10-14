import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - Printed Poster Gallery',
  description: 'Cookie Policy for Printed Poster Gallery - How we use cookies and similar technologies',
};

export default function CookiesPage() {
  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16 max-w-4xl'>
        <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-8'>
          Cookie Policy
        </h1>
        <div className='prose prose-lg max-w-none'>
          <p className='text-warm-gray mb-6'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              1. What Are Cookies
            </h2>
            <p className='text-warm-gray mb-4'>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              2. How We Use Cookies
            </h2>
            <p className='text-warm-gray mb-4'>
              We use cookies to enhance your browsing experience, analyze website traffic, and for marketing purposes. This includes:
            </p>
            <ul className='text-warm-gray mb-4 ml-6'>
              <li className='mb-2'>Essential cookies for website functionality</li>
              <li className='mb-2'>Analytics cookies to understand usage patterns</li>
              <li className='mb-2'>Marketing cookies for personalized advertising</li>
              <li className='mb-2'>Preference cookies to remember your settings</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              3. Managing Cookies
            </h2>
            <p className='text-warm-gray mb-4'>
              You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              4. Third-Party Cookies
            </h2>
            <p className='text-warm-gray mb-4'>
              We may use third-party services like Google Analytics that set their own cookies. These services have their own privacy policies and cookie practices.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              5. Contact Us
            </h2>
            <p className='text-warm-gray mb-4'>
              If you have any questions about our use of cookies, please contact us at{' '}
              <a href='mailto:hello@printedpostergallery.com' className='text-sage-green hover:text-terracotta transition-colors'>
                hello@printedpostergallery.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}