"use client"

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-transparent border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-semibold text-foreground">
              Printed Poster
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted">
              <Link href="/products" className="hover:text-accent">
                Products
              </Link>
              <Link href="/about" className="hover:text-accent">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search" className="text-sm text-muted hover:text-foreground">Search</Link>
            <Link href="/cart" className="btn btn-primary">Cart</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
