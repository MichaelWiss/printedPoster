'use client';

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex flex-col items-center justify-center min-h-[50vh] text-center'>
        <h2 className='text-2xl font-display font-semibold mb-4'>
          Something went wrong
        </h2>
        <p className='text-warm-gray mb-6 max-w-md'>
          We couldn&apos;t load this page. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className='bg-sage-green text-cream-base px-6 py-2.5 rounded hover:bg-sage-green/80 transition-colors'
        >
          Try again
        </button>
      </div>
    </main>
  );
}
