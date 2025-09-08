"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchBar() {
  const router = useRouter()
  const params = useSearchParams()
  const initial = params.get('q') || ''
  const [q, setQ] = useState(initial)
  const [open, setOpen] = useState(false)

  // Simple debounce
  const debouncedQ = useDebounced(q, 350)

  useEffect(() => {
    if (!open) return
    const trimmed = debouncedQ.trim()
    if (trimmed.length === 0) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }, [debouncedQ, open, router])

  return (
    <div className="relative">
      <button
        className="text-body-sm text-deep-charcoal/70 hover:text-sage-green transition-colors duration-200 flex items-center gap-2"
        aria-expanded={open}
        aria-controls="header-search"
        onClick={() => setOpen(v => !v)}
      >
        <span className="sr-only lg:not-sr-only">Search</span>
        <span className="text-lg">🔍</span>
      </button>

      {open && (
        <form
          id="header-search"
          role="search"
          className="absolute right-0 mt-2 bg-white border border-border-gray rounded shadow-soft p-2 flex items-center gap-2 w-72"
          onSubmit={(e) => {
            e.preventDefault()
            const trimmed = q.trim()
            if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`)
          }}
        >
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="flex-1 outline-none text-sm px-2 py-1"
            minLength={2}
            aria-label="Search products"
          />
          <button type="submit" className="text-sm text-sage-green hover:text-warm-taupe">Go</button>
        </form>
      )}
    </div>
  )
}

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return v
}
