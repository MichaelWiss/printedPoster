'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface CollectionSortProps {
  selected?: string
}

const options: Array<{ label: string; value: string }> = [
  { label: 'Featured', value: '' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best selling', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Title: A → Z', value: 'title-asc' },
  { label: 'Title: Z → A', value: 'title-desc' },
]

export function CollectionSort({ selected }: CollectionSortProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onChange = (val: string) => {
    const sp = new URLSearchParams(searchParams?.toString())
    if (val) sp.set('sort', val)
    else sp.delete('sort')
    // Reset pagination cursor when sort changes
    sp.delete('after')
    router.replace(`${pathname}?${sp.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-warm-gray">Sort</label>
      <select
        id="sort"
        className="h-10 rounded-md border border-sage-green/30 bg-white px-3 text-sm text-deep-charcoal shadow-sm hover:border-sage-green/60 focus:outline-none"
        value={selected || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value || 'featured'} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export default CollectionSort
