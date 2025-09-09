'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface SidebarFiltersProps {
  availableTags: string[]
  selectedTags: string[]
}

export function SidebarFilters({ availableTags, selectedTags }: SidebarFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setParam = (key: string, value?: string) => {
    const sp = new URLSearchParams(searchParams?.toString())
    if (value && value.length) sp.set(key, value)
    else sp.delete(key)
    sp.delete('after')
    router.replace(`${pathname}?${sp.toString()}`)
  }

  const clearAll = () => {
    const sp = new URLSearchParams(searchParams?.toString())
    sp.delete('tags')
    sp.delete('priceMin')
    sp.delete('priceMax')
    sp.delete('after')
    router.replace(`${pathname}?${sp.toString()}`)
  }

  const selectedSet = useMemo(() => new Set(selectedTags), [selectedTags])

  const onToggleTag = (tag: string) => {
    const next = new Set(selectedSet)
    if (next.has(tag)) next.delete(tag)
    else next.add(tag)
    const nextStr = Array.from(next).join(',')
    setParam('tags', nextStr)
  }

  const onPriceChange = (key: 'priceMin' | 'priceMax', raw: string) => {
    const val = raw.replace(/[^0-9.]/g, '')
    setParam(key, val || undefined)
  }

  return (
    <aside className="hidden md:block w-64 shrink-0 pr-6 border-r border-sage-green/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-deep-charcoal tracking-wide">Filters</h2>
        <button onClick={clearAll} className="text-sm text-warm-gray hover:text-deep-charcoal underline underline-offset-4">
          Clear all
        </button>
      </div>

      {/* Price */}
      <section className="mb-8">
        <h3 className="text-sm font-medium text-deep-charcoal mb-3">Price</h3>
        <div className="flex items-center gap-3">
          <input
            inputMode="decimal"
            pattern="[0-9]*"
            placeholder="Min"
            className="w-24 h-9 rounded-md border border-sage-green/30 px-3 text-sm"
            defaultValue={searchParams?.get('priceMin') || ''}
            onBlur={(e) => onPriceChange('priceMin', e.target.value)}
          />
          <span className="text-warm-gray">–</span>
          <input
            inputMode="decimal"
            pattern="[0-9]*"
            placeholder="Max"
            className="w-24 h-9 rounded-md border border-sage-green/30 px-3 text-sm"
            defaultValue={searchParams?.get('priceMax') || ''}
            onBlur={(e) => onPriceChange('priceMax', e.target.value)}
          />
        </div>
      </section>

      {/* Tags */}
      <section>
        <h3 className="text-sm font-medium text-deep-charcoal mb-3">Tags</h3>
        <div className="flex flex-col gap-2 max-h-[320px] overflow-auto pr-1">
          {availableTags.map(tag => {
            const checked = selectedSet.has(tag)
            return (
              <label key={tag} className="flex items-center gap-2 text-sm text-deep-charcoal">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-sage-green/40 text-sage-green focus:ring-sage-green"
                  checked={checked}
                  onChange={() => onToggleTag(tag)}
                />
                <span>{tag}</span>
              </label>
            )
          })}
        </div>
      </section>
    </aside>
  )
}

export default SidebarFilters
