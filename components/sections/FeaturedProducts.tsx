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
  limit = 6 
}: FeaturedProductsProps) {
  const products = await getProducts(limit)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-4xl font-normal text-foreground mb-4">
            {title}
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <ProductGrid 
          products={products} 
          columns={3}
          spacing="normal"
          className="max-w-6xl mx-auto"
        />
        
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-block bg-accent text-white px-8 py-3 font-medium hover:bg-accent/90 transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
