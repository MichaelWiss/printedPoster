'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface CollectionFiltersProps {
  availableTags: string[]
  selectedTags: string[]
}

export function CollectionFilters({ availableTags, selectedTags }: CollectionFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setParam = (key: string, value?: string) => {
    const sp = new URLSearchParams(searchParams?.toString())
    if (value && value.length) sp.set(key, value)
    else sp.delete(key)
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

  if (!availableTags?.length) return null

  return (
    <div className="mb-8 border-b border-sage-green/20 pb-6">
      <fieldset aria-labelledby="filters-legend" className="w-full">
        <legend id="filters-legend" className="text-sm font-medium text-deep-charcoal mb-3">
          Filter by tags
        </legend>
        <div className="flex flex-wrap gap-3">
          {availableTags.map(tag => {
            const checked = selectedSet.has(tag)
            return (
              <label key={tag} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm cursor-pointer transition-colors ${checked ? 'bg-sage-green/10 border-sage-green text-deep-charcoal' : 'border-sage-green/20 text-warm-gray hover:border-sage-green'}`}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => onToggleTag(tag)}
                />
                <span>#{tag}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
