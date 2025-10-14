// Simple demo component showing style filter structure
export default function DemoStyleFilter() {
  return (
    <div className='p-8 bg-cream-base min-h-screen'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='font-display text-3xl font-semibold text-deep-charcoal mb-8'>
          Style Filter Demo
        </h1>
        <div className='bg-pure-white p-6 rounded-lg border border-border-gray'>
          <h2 className='font-display text-xl font-medium text-deep-charcoal mb-4'>
            Filter by Style
          </h2>
          <div className='space-y-2'>
            {['Abstract', 'Nature', 'Minimalist', 'Vintage', 'Photography'].map(style => (
              <button 
                key={style}
                className='block w-full text-left p-3 rounded-md hover:bg-sage-green/10 transition-colors'
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
