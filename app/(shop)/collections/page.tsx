import Link from 'next/link'
import Image from 'next/image'
import { getCollections } from '@/lib/shopify/client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections - Printed Poster',
  description: 'Explore our curated collections of unique posters and artwork.',
}

export default async function CollectionsPage() {
  const collections = await getCollections(12)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-semibold text-deep-charcoal mb-4">
          Collections
        </h1>
        <p className="text-lg text-warm-gray max-w-2xl mx-auto">
          Discover our curated collections of unique posters and artwork, each telling a story through visual design.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="group"
          >
            <div className="bg-white border border-sage-green/20 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-sage-green group-hover:-translate-y-1">
              {/* Collection Image */}
              {collection.image && (
                <div className="relative h-64 bg-light-gray overflow-hidden">
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Collection Info */}
              <div className="p-6">
                <h2 className="text-xl font-medium text-deep-charcoal mb-2 group-hover:text-sage-green transition-colors">
                  {collection.title}
                </h2>
                <p className="text-warm-gray text-sm line-clamp-3">
                  {collection.description}
                </p>
                <div className="mt-4 text-sm text-sage-green font-medium">
                  View Collection →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {collections.length === 0 && (
        <div className="text-center py-16">
          <div className="text-warm-gray text-lg mb-2">No collections found</div>
          <div className="text-warm-gray text-sm">Please check back later for new collections</div>
        </div>
      )}
    </div>
  )
}
