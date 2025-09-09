"use client"

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FiltersDrawer from './FiltersDrawer'

export interface TopControlsProps {
  sortSelected?: string
  availableTags: string[]
  selectedTags: string[]
}

export default function TopControls({ sortSelected = '', availableTags, selectedTags }: TopControlsProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onSortChange = (val: string) => {
    const sp = new URLSearchParams(searchParams?.toString())
    if (val) sp.set('sort', val)
    else sp.delete('sort')
    sp.delete('after')
    router.replace(`${pathname}?${sp.toString()}`)
  }

  return (
    <>
      <div className="hidden md:flex items-center justify-between px-0 mb-4">
        <button
          className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
          onClick={() => setOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3.75 6.75h8.25m8.25 0h-3M3.75 12h3m8.25 0H20.25M3.75 17.25h12m4.5 0h-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span>Filters</span>
        </button>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-desktop" className="text-sm text-slate-600">Sort</label>
          <select
            id="sort-desktop"
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 hover:border-slate-400"
            value={sortSelected}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Featured</option>
            <option value="newest">Newest</option>
            <option value="popular">Best selling</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A → Z</option>
            <option value="title-desc">Title: Z → A</option>
          </select>
        </div>
      </div>
  <FiltersDrawer open={open} onClose={() => setOpen(false)} availableTags={availableTags} selectedTags={selectedTags} />
    </>
  )
}
