import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex flex-col items-center justify-center min-h-[50vh] text-center'>
        <h1 className='text-6xl font-display font-semibold text-sage-green mb-4'>
          404
        </h1>
        <h2 className='text-2xl font-display mb-4'>Page not found</h2>
        <p className='text-warm-gray mb-8 max-w-md'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href='/'
          className='bg-sage-green text-cream-base px-6 py-2.5 rounded hover:bg-sage-green/80 transition-colors'
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
