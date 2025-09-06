'use client'

import { useState } from 'react'

interface CollectionFiltersProps {
  onFiltersChange?: (filters: {
    style: string
    size: string
    sort: string
  }) => void
}

export function CollectionFilters({ onFiltersChange }: CollectionFiltersProps) {
  const [filters, setFilters] = useState({
    style: 'All Styles',
    size: 'All Sizes',
    sort: 'Featured'
  })

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  return (
    <div className="mb-8 border-b border-sage-green/20 pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium text-deep-charcoal">Filter by:</span>
          <select
            value={filters.style}
            onChange={(e) => handleFilterChange('style', e.target.value)}
            className="px-3 py-2 border border-sage-green/20 rounded-md text-sm bg-white hover:border-sage-green transition-colors"
          >
            <option>All Styles</option>
            <option>Classical</option>
            <option>Contemporary</option>
            <option>Minimalist</option>
          </select>
          <select
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
            className="px-3 py-2 border border-sage-green/20 rounded-md text-sm bg-white hover:border-sage-green transition-colors"
          >
            <option>All Sizes</option>
            <option>Small (18x24)</option>
            <option>Medium (24x36)</option>
            <option>Large (36x48)</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-deep-charcoal">Sort by:</span>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="px-3 py-2 border border-sage-green/20 rounded-md text-sm bg-white hover:border-sage-green transition-colors"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
            <option>Popular</option>
          </select>
        </div>
      </div>
    </div>
  )
}
