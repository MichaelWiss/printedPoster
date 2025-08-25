import Link from 'next/link'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/shopify/client'

interface FeaturedProductsProps {
  title?: string
  subtitle?: string
  limit?: number
}

export async function FeaturedProducts({ 
  title = "Featured Products", 
  subtitle = "Discover our most popular prints and posters",
  limit = 8 
}: FeaturedProductsProps) {
  const products = await getProducts(limit)

  return (
    <section className="py-16 bg-cream-base">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-normal text-deep-charcoal mb-4">
            {title}
          </h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Enhanced responsive grid: 2→3→4 columns */}
        <ProductGrid 
          products={products} 
          columns={4}
          spacing="normal"
          className="max-w-7xl mx-auto"
        />
        
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-block bg-sage-green text-pure-white px-8 py-3 font-medium hover:bg-sage-green/90 transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
