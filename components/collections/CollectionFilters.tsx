'use client';

import { memo, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { inputUtils } from '@/lib/design-tokens/component-utils';

export interface CollectionFiltersProps {
  availableTags: string[];
  selectedTags: string[];
}

export const CollectionFilters = memo(function CollectionFilters({
  availableTags,
  selectedTags,
}: CollectionFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key: string, value?: string) => {
    const sp = new URLSearchParams(searchParams?.toString());
    if (value && value.length) sp.set(key, value);
    else sp.delete(key);
    router.replace(`${pathname}?${sp.toString()}`);
  };

  const selectedSet = useMemo(() => new Set(selectedTags), [selectedTags]);

  const onToggleTag = (tag: string) => {
    const next = new Set(selectedSet);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    const nextStr = Array.from(next).join(',');
    // Update tags and reset pagination cursor
    setParam('tags', nextStr);
    setParam('after', undefined);
  };

  if (!availableTags?.length)
    return <div className='mb-8 border-b border-sage-green/20 pb-6' />;

  const onPriceChange = (key: 'priceMin' | 'priceMax', raw: string) => {
    const val = raw.replace(/[^0-9.]/g, '');
    const sp = new URLSearchParams(searchParams?.toString());
    if (val) sp.set(key, val);
    else sp.delete(key);
    sp.delete('after');
    router.replace(`${pathname}?${sp.toString()}`);
  };

  return (
    <div className='mb-8 border-b border-border-gray pb-6'>
      {/* Price range */}
      <fieldset aria-labelledby='price-legend' className='w-full mb-5'>
        <legend id='price-legend' className='text-sm font-medium text-primary-black mb-3'>
          Price range
        </legend>
        <div className='flex items-center gap-3'>
          <input
            inputMode='decimal'
            pattern='[0-9]*'
            placeholder='Min'
            className={`w-28 h-9 ${inputUtils.getHuncwotInputClasses()} text-sm`}
            defaultValue={searchParams?.get('priceMin') || ''}
            onBlur={e => onPriceChange('priceMin', e.target.value)}
          />
          <span className='text-text-gray'>–</span>
          <input
            inputMode='decimal'
            pattern='[0-9]*'
            placeholder='Max'
            className={`w-28 h-9 ${inputUtils.getHuncwotInputClasses()} text-sm`}
            defaultValue={searchParams?.get('priceMax') || ''}
            onBlur={e => onPriceChange('priceMax', e.target.value)}
          />
        </div>
      </fieldset>

      <fieldset aria-labelledby='filters-legend' className='w-full'>
        <legend id='filters-legend' className='text-sm font-medium text-primary-black mb-3'>
          Filter by tags
        </legend>
        <div className='flex flex-wrap gap-3'>
          {availableTags.map(tag => {
            const checked = selectedSet.has(tag);
            return (
              <label
                key={tag}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none border text-sm cursor-pointer transition-colors duration-150 ease-in-out ${checked ? 'bg-accent-gray border-primary-black text-primary-black' : 'border-border-gray text-text-gray hover:border-primary-black'}`}
              >
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={checked}
                  onChange={() => onToggleTag(tag)}
                />
                <span>#{tag}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
});
