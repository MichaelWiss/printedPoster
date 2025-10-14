'use client';

import { useState, Suspense } from 'react';
import { StyleFilter, STYLE_CATEGORIES } from '@/components/filters/StyleFilter';

// Sample products data for demo
const sampleProducts = [
  {
    id: '1',
    title: 'Abstract Composition #1',
    tags: ['abstract', 'modern', 'geometric'],
    price: '$45.00',
    image: '🎨'
  },
  {
    id: '2',
    title: 'Forest Landscape',
    tags: ['nature', 'landscape', 'forest'],
    price: '$38.00',
    image: '🌲'
  },
  {
    id: '3',
    title: 'Minimalist Lines',
    tags: ['minimalist', 'simple', 'clean'],
    price: '$32.00',
    image: '⚪'
  },
  {
    id: '4',
    title: 'Vintage Car Poster',
    tags: ['vintage', 'retro', 'classic'],
    price: '$42.00',
    image: '🚗'
  },
  {
    id: '5',
    title: 'Street Photography',
    tags: ['photography', 'street', 'black-and-white'],
    price: '$55.00',
    image: '📸'
  },
  {
    id: '6',
    title: 'Botanical Illustration',
    tags: ['nature', 'botanical', 'illustration'],
    price: '$35.00',
    image: '🌿'
  },
  {
    id: '7',
    title: 'Urban Architecture',
    tags: ['urban', 'architecture', 'city'],
    price: '$48.00',
    image: '🏙️'
  },
  {
    id: '8',
    title: 'Portrait Study',
    tags: ['portrait', 'people', 'art'],
    price: '$52.00',
    image: '👤'
  }
];

export default function StyleFilterDemoPage() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  // Filter products based on selected style
  const filteredProducts = selectedStyle
    ? sampleProducts.filter(product => {
        const styleCategories = STYLE_CATEGORIES[selectedStyle as keyof typeof STYLE_CATEGORIES] || [];
        return product.tags.some(tag => 
          (styleCategories as readonly string[]).includes(tag.toLowerCase())
        );
      })
    : sampleProducts;

  // Calculate product counts by style
  const styleCounts: Record<string, number> = {};
  Object.keys(STYLE_CATEGORIES).forEach(style => {
    const styleCategories = STYLE_CATEGORIES[style as keyof typeof STYLE_CATEGORIES];
    const count = sampleProducts.filter(product =>
      product.tags.some(tag => (styleCategories as readonly string[]).includes(tag.toLowerCase()))
    ).length;
    if (count > 0) {
      styleCounts[style] = count;
    }
  });

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Style Filter Demo
          </h1>
          <p className='text-lg text-warm-gray max-w-3xl mx-auto leading-relaxed'>
            This demo shows how the style filter works with product tags. 
            Try selecting different styles to see the filtering in action.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar with Style Filter */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8'>
              <Suspense fallback={<div className='bg-white p-4 rounded-lg border'>Loading filter...</div>}>
                <StyleFilter 
                  currentStyle={selectedStyle || ''}
                  onStyleChange={setSelectedStyle}
                  productCounts={styleCounts}
                  className='shadow-sm'
                />
              </Suspense>
              
              {/* Implementation Notes */}
              <div className='mt-6 bg-pure-white border border-border-gray rounded-lg p-4'>
                <h3 className='font-display text-lg font-medium text-deep-charcoal mb-4'>
                  How It Works
                </h3>
                <ul className='text-sm text-warm-gray space-y-2'>
                  <li>• Products are tagged in Shopify Admin</li>
                  <li>• Tags are mapped to style categories</li>
                  <li>• Filter shows product counts per style</li>
                  <li>• URL parameters preserve filter state</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className='lg:col-span-3'>
            {/* Results Summary */}
            <div className='flex items-center justify-between mb-6'>
              <div className='text-warm-gray text-sm'>
                Showing {filteredProducts.length} of {sampleProducts.length} products
                {selectedStyle && (
                  <span className='ml-2 px-2 py-1 bg-sage-green/10 text-sage-green rounded-full text-xs'>
                    Style: {selectedStyle}
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className='bg-pure-white rounded-lg overflow-hidden shadow-sm border border-sage-green/20 hover:shadow-lg hover:border-sage-green transition-all duration-300'
                >
                  <div className='aspect-square bg-gradient-to-br from-sage-green/10 to-terracotta/10 flex items-center justify-center text-4xl'>
                    {product.image}
                  </div>
                  <div className='p-4'>
                    <h3 className='font-medium text-deep-charcoal mb-2 line-clamp-2'>
                      {product.title}
                    </h3>
                    <div className='flex flex-wrap gap-1 mb-3'>
                      {product.tags.map(tag => (
                        <span 
                          key={tag}
                          className='px-2 py-1 bg-warm-gray/10 text-warm-gray text-xs rounded-full'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='text-lg font-semibold text-sage-green'>
                      {product.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className='text-center py-16'>
                <div className='text-6xl mb-4'>🎨</div>
                <h3 className='font-display text-2xl font-medium text-deep-charcoal mb-2'>
                  No products found
                </h3>
                <p className='text-warm-gray mb-6'>
                  No products match the &quot;{selectedStyle}&quot; style.
                </p>
                <button
                  onClick={() => setSelectedStyle(null)}
                  className='bg-sage-green text-pure-white px-6 py-3 rounded-lg font-medium hover:bg-sage-green/90 transition-colors'
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Implementation Guide */}
        <div className='mt-16 bg-pure-white border border-sage-green/20 rounded-lg p-8'>
          <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
            Implementation Guide
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h3 className='font-medium text-sage-green mb-3'>Setup Steps</h3>
              <ol className='text-sm text-warm-gray space-y-2 list-decimal list-inside'>
                <li>Add tags to products in Shopify Admin</li>
                <li>Use predefined style categories or create custom ones</li>
                <li>Add StyleFilter component to collection pages</li>
                <li>Update GraphQL queries to include tags</li>
                <li>Implement filtering logic on the frontend</li>
              </ol>
            </div>
            
            <div>
              <h3 className='font-medium text-terracotta mb-3'>Sample Tags</h3>
              <div className='text-sm text-warm-gray space-y-2'>
                <div><strong>Abstract:</strong> abstract, geometric, contemporary</div>
                <div><strong>Nature:</strong> landscape, botanical, wildlife</div>
                <div><strong>Minimalist:</strong> minimalist, simple, clean</div>
                <div><strong>Vintage:</strong> vintage, retro, classic</div>
              </div>
            </div>
          </div>

          <div className='mt-6 p-4 bg-sage-green/5 rounded-lg'>
            <p className='text-sm text-warm-gray'>
              <strong>Pro Tip:</strong> This filter works with your existing product type system. 
              Products can have both style tags and be categorized as mass-produced or one-of-a-kind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}