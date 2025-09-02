import { notFound } from 'next/navigation'
import { getProductByHandle } from '@/lib/shopify/client'
import { ProductDetails } from '@/components/product/ProductDetails'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params

  try {
    const product = await getProductByHandle(handle)

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.'
      }
    }

    return {
      title: `${product.title} | Printed Poster`,
      description: product.description || `Buy ${product.title} online`,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.images?.edges[0]?.node?.url ? [product.images.edges[0].node.url] : []
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Product | Printed Poster'
    }
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params

  try {
    const product = await getProductByHandle(handle)

    if (!product) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-cream-base">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <ProductDetails product={product} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    notFound()
  }
}
