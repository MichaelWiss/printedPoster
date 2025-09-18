'use client';

import { useEffect, useMemo, useMemo as useReactMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface FiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  availableTags: string[];
  selectedTags: string[];
}

export default function FiltersDrawer({
  open,
  onClose,
  availableTags,
  selectedTags,
}: FiltersDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pendingTags, setPendingTags] = useState<string[]>(selectedTags);
  const [pendingMin, setPendingMin] = useState<string>(
    searchParams?.get('priceMin') || ''
  );
  const [pendingMax, setPendingMax] = useState<string>(
    searchParams?.get('priceMax') || ''
  );

  // Sync pending state when the drawer opens or URL changes
  useEffect(() => {
    if (open) {
      setPendingTags(selectedTags);
      setPendingMin(searchParams?.get('priceMin') || '');
      setPendingMax(searchParams?.get('priceMax') || '');
    }
  }, [open, selectedTags, searchParams]);

  const selectedSet = useReactMemo(() => new Set(pendingTags), [pendingTags]);

  const onToggleTag = (tag: string) => {
    setPendingTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return Array.from(next);
    });
  };

  const onPriceChange = (setter: (v: string) => void, raw: string) => {
    const val = raw.replace(/[^0-9.]/g, '');
    setter(val);
  };

  const onClearAllPending = () => {
    setPendingTags([]);
    setPendingMin('');
    setPendingMax('');
  };

  const onApply = () => {
    const sp = new URLSearchParams(searchParams?.toString());
    const tagsStr = pendingTags.join(',');
    if (tagsStr) sp.set('tags', tagsStr);
    else sp.delete('tags');
    if (pendingMin) sp.set('priceMin', pendingMin);
    else sp.delete('priceMin');
    if (pendingMax) sp.set('priceMax', pendingMax);
    else sp.delete('priceMax');
    sp.delete('after');
    router.replace(`${pathname}?${sp.toString()}`);
    onClose();
  };
  const drawerClasses = useMemo(
    () =>
      [
        'fixed inset-y-0 left-0 w-[340px] bg-white shadow-2xl border-r border-slate-200 z-[70]',
        // slide + fade
        'transform transition-transform transition-opacity duration-300',
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
        'fixed inset-0 bg-black/40 z-[60]',
        'transition-opacity duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
        'motion-reduce:transition-none',
        open ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ].join(' '),
    [open]
  );

  return (
    <>
      <aside
        className={drawerClasses}
        role='dialog'
        aria-modal='true'
        aria-labelledby='filters-title'
      >
        {/* Drawer header */}
        <div className='sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between'>
          <h2 id='filters-title' className='text-base font-medium'>
            Filters
          </h2>
          <div className='flex items-center gap-3'>
            <button
              onClick={onClearAllPending}
              className='text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4'
            >
              Clear all
            </button>
            <button
              className='h-8 w-8 grid place-items-center rounded hover:bg-slate-100'
              aria-label='Close'
              onClick={onClose}
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

        {/* Content (wired for tags + price, styled to match mock) */}
        <div className='px-4 py-4 space-y-6 overflow-y-auto h-[calc(100vh-8rem)]'>
          <section>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-sm font-medium'>Categories</h3>
              <button className='text-xs text-slate-500 hover:text-slate-800'>
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
          <section>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-sm font-medium'>Tags</h3>
              <button className='text-xs text-slate-500 hover:text-slate-800'>
                Collapse
              </button>
            </div>
            <div className='grid grid-cols-2 gap-2 max-h-40 overflow-auto pr-1'>
              {availableTags.map(tag => {
                const checked = selectedSet.has(tag);
                return (
                  <label key={tag} className='flex items-center gap-2 text-sm'>
                    <input
                      type='checkbox'
                      className='h-4 w-4'
                      checked={checked}
                      onChange={() => onToggleTag(tag)}
                    />
                    {tag}
                  </label>
                );
              })}
            </div>
          </section>
          <section>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-sm font-medium'>Price</h3>
              <button className='text-xs text-slate-500 hover:text-slate-800'>
                Collapse
              </button>
            </div>
            <div className='flex items-center gap-3'>
              <input
                type='text'
                placeholder='Min'
                className='w-24 h-9 rounded-md border border-slate-300 px-3 text-sm'
                value={pendingMin}
                onChange={e => onPriceChange(setPendingMin, e.target.value)}
              />
              <span className='text-slate-500'>–</span>
              <input
                type='text'
                placeholder='Max'
                className='w-24 h-9 rounded-md border border-slate-300 px-3 text-sm'
                value={pendingMax}
                onChange={e => onPriceChange(setPendingMax, e.target.value)}
              />
            </div>
          </section>
        </div>

        {/* Drawer footer */}
        <div className='sticky bottom-0 bg-white border-t border-slate-200 p-4 flex items-center justify-end gap-3'>
          <button
            className='h-9 px-4 rounded-md border border-slate-300 text-sm hover:bg-slate-50'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='h-9 px-4 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800'
            onClick={onApply}
          >
            Apply
          </button>
        </div>
      </aside>
      <div className={overlayClasses} onClick={onClose} />
    </>
  );
}
