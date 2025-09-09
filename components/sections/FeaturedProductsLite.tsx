import Link from 'next/link'
import { getProducts } from '@/lib/shopify/client'
import { ProductCard } from '@/components/product/ProductCard'
import ViewportFadeIn from '@/components/ui/ViewportFadeIn'

interface FeaturedProductsLiteProps {
  title?: string
  subtitle?: string
  limit?: number
}

export async function FeaturedProductsLite({
  title = 'Featured Products',
  subtitle = 'Discover our most popular prints and posters',
  limit = 8,
}: FeaturedProductsLiteProps) {
  const products = await getProducts(limit)

  return (
    <section className="py-16 bg-cream-base">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-normal text-deep-charcoal mb-4">
            {title}
          </h2>
          <p className="text-warm-gray max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product, idx) => (
            <ViewportFadeIn key={product.id} delayMs={(idx % 12) * 40}>
              <ProductCard product={product} />
            </ViewportFadeIn>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            prefetch={false}
            className="inline-block bg-sage-green text-pure-white px-8 py-3 font-medium hover:bg-sage-green/90 transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
