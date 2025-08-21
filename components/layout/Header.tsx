import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Printed Poster
          </Link>
          <div className="space-x-6">
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <Link href="/cart" className="hover:text-blue-600">
              Cart
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
