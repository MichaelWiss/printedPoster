'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get('q') || '';
  const [q, setQ] = useState(initial);

  // Simple debounce with longer delay for better UX
  const debouncedQ = useDebounced(q, 800);

  // Navigate on debounced search with minimum length check
  useEffect(() => {
    const trimmed = debouncedQ.trim();
    if (trimmed.length >= 3) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }, [debouncedQ, router]);

  // Handle form submission (Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed.length >= 1) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <input
        type='search'
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder='Search...'
        className='border border-border-gray rounded-sm px-4 py-2 font-body transition-colors duration-300 focus:border-sage-green focus:outline-none w-48 lg:w-64 pl-10 pr-4 text-sm'
        aria-label='Search products'
      />
      <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray pointer-events-none text-sm'>
        🔍
      </div>
    </form>
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
