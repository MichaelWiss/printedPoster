import Link from "next/link"
import AdvancedAddToCartButton from "@/components/product/AdvancedAddToCartButton"
import type { ShopifyProduct } from "@/types/shopify"

export const metadata = {
  title: "Advanced Add to Cart Button Demo - Printed Poster",
  description: "Demo page to try the advanced add-to-cart button with quantity controls and loading state.",
}

// Minimal mock product for demo purposes
const mockProduct: ShopifyProduct = {
  id: "gid://shopify/Product/123",
  title: "Demo Poster",
  handle: "demo-poster",
  description: "A minimal mock product used to demo the advanced add to cart button.",
  images: { edges: [] },
  priceRange: {
    minVariantPrice: { amount: "29.00", currencyCode: "USD" },
  },
} as unknown as ShopifyProduct

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-semibold text-deep-charcoal">Advanced Add to Cart Button Demo</h1>
        <p className="text-warm-gray">Try the button interactions below without affecting your real cart.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="bg-white border border-sage-green/20 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-medium">Default</h2>
          <AdvancedAddToCartButton product={mockProduct} simulateOnly />
          <p className="text-xs text-warm-gray">Initial qty 1, uses a stubbed add handler.</p>
        </div>

        <div className="bg-white border border-sage-green/20 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-medium">Initial qty 2</h2>
          <AdvancedAddToCartButton product={mockProduct} initialQty={2} simulateOnly />
          <p className="text-xs text-warm-gray">Starts at quantity 2.</p>
        </div>

        <div className="bg-white border border-sage-green/20 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-medium">Disabled state</h2>
          <AdvancedAddToCartButton product={mockProduct} disabled simulateOnly />
          <p className="text-xs text-warm-gray">Interactions disabled for accessibility checks.</p>
        </div>

        <div className="bg-white border border-sage-green/20 rounded-lg p-6 space-y-4 md:col-span-2 xl:col-span-3">
          <h2 className="text-lg font-medium">Inside a Link-wrapped card</h2>
          <p className="text-sm text-warm-gray">The +/- should not navigate; only the card link should.</p>
          <Link
            href={`/products/${mockProduct.handle}`}
            className="group block bg-white border border-sage-green/20 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-sage-green hover:-translate-y-1 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-semibold">$29.00</p>
              <span className="text-sm text-warm-gray">Free shipping</span>
            </div>
            <AdvancedAddToCartButton product={mockProduct} simulateOnly />
          </Link>
        </div>
      </section>

      <div className="text-center">
        <Link href="/" className="text-sage-green underline underline-offset-4">
          Back to home
        </Link>
      </div>
    </div>
  )
}
