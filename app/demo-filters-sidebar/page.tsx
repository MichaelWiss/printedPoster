'use client';

import { useState, useMemo } from 'react';

export default function DemoFiltersSidebar() {
  const [open, setOpen] = useState(false);

  const drawerClasses = useMemo(
    () =>
      [
        'fixed inset-y-0 left-0 w-[340px] md:w-[360px] bg-white border-r border-sage-green/20 shadow-2xl z-[70]',
        'transition-transform transition-opacity duration-300',
        'ease-[cubic-bezier(0.2,0.8,0.2,1)]',
        'motion-reduce:transition-none',
        open
          ? 'translate-x-0 opacity-100'
          : '-translate-x-20 md:-translate-x-24 opacity-0 pointer-events-none',
      ].join(' '),
    [open]
  );

  const overlayClasses = useMemo(
    () =>
      [
        'fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
        'motion-reduce:transition-none',
        open ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ].join(' '),
    [open]
  );

  const placeholderTokens = useMemo(
    () => Array.from({ length: 12 }, (_, idx) => `skeleton-${idx}`),
    []
  );

  return (
    <main className='max-w-7xl mx-auto px-4 py-10'>
      <header className='flex items-center justify-between border-b border-sage-green/20 pb-4 mb-8'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Visual Demo: Filters Sidebar
        </h1>
        <button
          onClick={() => setOpen(true)}
          className='inline-flex items-center gap-2 h-10 px-4 rounded-md border border-sage-green/30 text-sm hover:bg-sage-green/5'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-4 h-4'
          >
            <path
              d='M3.75 6.75h8.25m8.25 0h-3M3.75 12h3m8.25 0H20.25M3.75 17.25h12m4.5 0h-1.5'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
          <span>Filters</span>
        </button>
      </header>

      {/* Drawer */}
      <aside
        className={drawerClasses}
        role='dialog'
        aria-modal='true'
        aria-labelledby='filters-title'
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Drawer header */}
        <div className='sticky top-0 z-10 bg-white border-b border-sage-green/20 px-4 py-4 flex items-center justify-between'>
          <h2 id='filters-title' className='text-base font-medium'>
            Filters
          </h2>
          <div className='flex items-center gap-3'>
            <a
              href='#'
              className='text-sm text-warm-gray hover:text-deep-charcoal underline underline-offset-4'
            >
              Clear all
            </a>
            <button
              onClick={() => setOpen(false)}
              className='h-8 w-8 grid place-items-center rounded hover:bg-sage-green/10'
              aria-label='Close'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                className='w-4 h-4'
              >
                <path
                  d='M6 6l12 12M18 6L6 18'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Selected chips (example) */}
        <div className='px-4 py-3 flex flex-wrap gap-2 border-b border-sage-green/20'>
          <span className='inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-sage-green/10 text-deep-charcoal'>
            Abstract <button className='hover:text-deep-charcoal/80'>×</button>
          </span>
          <span className='inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-sage-green/10 text-deep-charcoal'>
            Monochrome{' '}
            <button className='hover:text-deep-charcoal/80'>×</button>
          </span>
          <span className='inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-sage-green/10 text-deep-charcoal'>
            $20–$60 <button className='hover:text-deep-charcoal/80'>×</button>
          </span>
        </div>

        {/* Sections */}
        <div className='px-4 py-4 space-y-6 overflow-y-auto h-[calc(100vh-8rem)]'>
          {/* Categories */}
          <section>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-sm font-medium'>Categories</h3>
              <button className='text-xs text-warm-gray hover:text-deep-charcoal'>
                Collapse
              </button>
            </div>
            <div className='space-y-2'>
              {['Abstract', 'Nature', 'Architecture', 'Typography'].map(
                label => (
                  <label
                    key={label}
                    className='flex items-center gap-2 text-sm'
                  >
                    <input type='checkbox' className='h-4 w-4' /> {label}
                  </label>
                )
              )}
            </div>
          </section>

          {/* Tags */}
          <section>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-sm font-medium'>Tags</h3>
              <button className='text-xs text-warm-gray hover:text-deep-charcoal'>
                Collapse
              </button>
            </div>
            <div className='grid grid-cols-2 gap-2 max-h-40 overflow-auto pr-1'>
              {[
                'Minimal',
                'Modern',
                'Vintage',
                'Botanical',
                'Monochrome',
                'Geometric',
                'Line Art',
                'Pastel',
              ].map(label => (
                <label key={label} className='flex items-center gap-2 text-sm'>
                  <input type='checkbox' className='h-4 w-4' /> {label}
                </label>
              ))}
            </div>
          </section>

          {/* Price */}
          <section>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-sm font-medium'>Price</h3>
              <button className='text-xs text-warm-gray hover:text-deep-charcoal'>
                Collapse
              </button>
            </div>
            <div className='flex items-center gap-3'>
              <input
                type='text'
                placeholder='Min'
                className='w-24 h-9 rounded-md border border-sage-green/30 px-3 text-sm'
              />
              <span className='text-warm-gray'>–</span>
              <input
                type='text'
                placeholder='Max'
                className='w-24 h-9 rounded-md border border-sage-green/30 px-3 text-sm'
              />
            </div>
          </section>
        </div>

        {/* Drawer footer */}
        <div className='sticky bottom-0 bg-white border-t border-sage-green/20 p-4 flex items-center justify-end gap-3'>
          <button
            onClick={() => setOpen(false)}
            className='h-9 px-4 rounded-md border border-sage-green/30 text-sm hover:bg-sage-green/5'
          >
            Cancel
          </button>
          <button className='h-9 px-4 rounded-md bg-deep-charcoal text-white text-sm hover:bg-deep-charcoal/90'>
            Apply
          </button>
        </div>
      </aside>

      {/* Overlay */}
      <div className={overlayClasses} onClick={() => setOpen(false)} />

      {/* Grid placeholder */}
      <div className='p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {placeholderTokens.map(token => (
          <div key={token} className='h-40 bg-sage-green/10 rounded' />
        ))}
      </div>

      <p className='mt-6 text-xs text-warm-gray'>
        Interactive demo. Click “Filters” to open the drawer. Graceful slide +
        fade, with reduced motion respected.
      </p>
    </main>
  );
}
