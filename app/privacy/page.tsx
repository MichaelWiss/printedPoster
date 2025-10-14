import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Printed Poster Gallery',
  description: 'Privacy Policy for Printed Poster Gallery - How we collect, use, and protect your information',
};

export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16 max-w-4xl'>
        <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-8'>
          Privacy Policy
        </h1>
        <div className='prose prose-lg max-w-none'>
          <p className='text-warm-gray mb-6'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              1. Information We Collect
            </h2>
            <p className='text-warm-gray mb-4'>
              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              2. How We Use Your Information
            </h2>
            <p className='text-warm-gray mb-4'>
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              3. Information Sharing
            </h2>
            <p className='text-warm-gray mb-4'>
              We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as described in this policy.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              4. Data Security
            </h2>
            <p className='text-warm-gray mb-4'>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              5. Contact Us
            </h2>
            <p className='text-warm-gray mb-4'>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href='mailto:privacy@printedpostergallery.com' className='text-sage-green hover:text-terracotta transition-colors'>
                privacy@printedpostergallery.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}