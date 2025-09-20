'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get('q') || '';
  const [q, setQ] = useState(initial);
  const [open, _setOpen] = useState(false);

  // Simple debounce
  const debouncedQ = useDebounced(q, 350);

  useEffect(() => {
    if (!open) return;
    const trimmed = debouncedQ.trim();
    if (trimmed.length === 0) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }, [debouncedQ, open, router]);

  return (
    <div className='relative'>
      <input
        type='search'
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder='Search...'
        className='border border-border-gray rounded-sm px-4 py-2 font-body transition-colors duration-300 focus:border-sage-green focus:outline-none w-48 lg:w-64 pl-10 pr-4 text-sm'
        minLength={2}
        aria-label='Search products'
        onSubmit={e => {
          e.preventDefault();
          const trimmed = q.trim();
          if (trimmed)
            router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        }}
      />
      <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray pointer-events-none text-sm'>
        🔍
      </div>
    </div>
  );
}

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
