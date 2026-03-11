'use client';

import { useState } from 'react';
import FiltersDrawer from './FiltersDrawer';
import { CollectionSort } from './CollectionSort';

export interface TopControlsProps {
  sortSelected?: string;
  availableTags: string[];
  selectedTags: string[];
}

export default function TopControls({
  sortSelected = '',
  availableTags,
  selectedTags,
}: TopControlsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='hidden md:flex items-center justify-between px-0 mb-4'>
        <button
          className='inline-flex items-center gap-2 h-10 px-4 rounded-md border border-sage-green/30 text-sm hover:bg-sage-green/5'
          onClick={() => setOpen(true)}
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
        <CollectionSort selected={sortSelected} />
      </div>
      <FiltersDrawer
        open={open}
        onClose={() => setOpen(false)}
        availableTags={availableTags}
        selectedTags={selectedTags}
      />
    </>
  );
}
