"use client"

import { useState } from 'react'
import dynamic from 'next/dynamic'

const FiltersDrawerDynamic = dynamic(() => import('./FiltersDrawer'), { ssr: false })
const CollectionSortDynamic = dynamic<{ selected?: string }>(() => import('./CollectionSort'))

export default function ClientControls({ availableTags, selectedTags, selectedSort }: { availableTags: string[]; selectedTags: string[]; selectedSort: string }) {
  const [open, setOpen] = useState(false)
  const FiltersDrawer = FiltersDrawerDynamic as unknown as (props: { open: boolean; onClose: () => void; availableTags: string[]; selectedTags: string[] }) => JSX.Element
  const CollectionSort = CollectionSortDynamic as unknown as (props: { selected?: string }) => JSX.Element

  return (
    <div className="hidden md:flex items-center justify-between mb-4">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 h-10 px-3 rounded-md border border-sage-green/30 text-sm hover:bg-sage-green/5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3.75 6.75h8.25m8.25 0h-3M3.75 12h3m8.25 0H20.25M3.75 17.25h12m4.5 0h-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <span>Filters</span>
      </button>
      <CollectionSort selected={selectedSort} />
      <FiltersDrawer open={open} onClose={() => setOpen(false)} availableTags={availableTags} selectedTags={selectedTags} />
    </div>
  )
}
