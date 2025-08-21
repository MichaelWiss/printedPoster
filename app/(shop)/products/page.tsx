import { Header } from '@/components/layout/Header'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/shopify/client'

export default async function ShopPage() {
  const products = await getProducts(12)
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <ProductGrid products={products} />
      </main>
    </>
  )
}
