import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/types/shopify'

interface ProductCardProps {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images.edges[0]?.node
  const price = product.priceRange?.minVariantPrice

  return (
    <Link 
      href={`/products/${product.handle}`}
      className="group"
    >
      <div className="border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
        {firstImage && (
          <div className="relative h-64">
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">
              {price ? (
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currencyCode || 'USD'
                }).format(parseFloat(price.amount))
              ) : (
                'Price not available'
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
