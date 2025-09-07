import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/shopify/client'

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
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-border-gray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {product.images?.edges?.[0] && (
                <Link href={`/products/${product.handle}`} prefetch={false}>
                  <div className="relative h-64 bg-light-gray overflow-hidden group">
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </Link>
              )}

              <div className="p-4">
                <Link href={`/products/${product.handle}`} prefetch={false}>
                  <h3 className="text-lg font-semibold text-deep-charcoal mb-2 hover:text-terracotta transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-warm-gray text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-terracotta">
                    {product.priceRange?.minVariantPrice
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: product.priceRange.minVariantPrice.currencyCode || 'USD',
                        }).format(parseFloat(product.priceRange.minVariantPrice.amount))
                      : '—'}
                  </p>
                  <Link
                    href={`/products/${product.handle}`}
                    prefetch={false}
                    className="text-sm text-sage-green hover:text-warm-taupe transition-colors"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </div>
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
