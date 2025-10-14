import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Printed Poster Gallery',
  description: 'Terms of Service and conditions for using Printed Poster Gallery',
};

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16 max-w-4xl'>
        <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-8'>
          Terms of Service
        </h1>
        <div className='prose prose-lg max-w-none'>
          <p className='text-warm-gray mb-6'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              1. Acceptance of Terms
            </h2>
            <p className='text-warm-gray mb-4'>
              By accessing and using the Printed Poster Gallery website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              2. Use License
            </h2>
            <p className='text-warm-gray mb-4'>
              Permission is granted to temporarily download one copy of the materials on Printed Poster Gallery&apos;s website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              3. Disclaimer
            </h2>
            <p className='text-warm-gray mb-4'>
              The materials on Printed Poster Gallery&apos;s website are provided on an &apos;as is&apos; basis. Printed Poster Gallery makes no warranties, expressed or implied.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              4. Limitations
            </h2>
            <p className='text-warm-gray mb-4'>
              In no event shall Printed Poster Gallery or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-4'>
              5. Contact Information
            </h2>
            <p className='text-warm-gray mb-4'>
              If you have any questions about these Terms of Service, please contact us at{' '}
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