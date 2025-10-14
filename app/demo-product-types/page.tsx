'use client';

import { useState } from 'react';
import { MassProducedVariantSelector } from '@/components/product/MassProducedVariantSelector';
import { OneOfAKindDisplay } from '@/components/product/OneOfAKindDisplay';
import { QualitySpecs } from '@/components/product/QualitySpecs';
import { 
  ProductType, 
  MassProducedProduct, 
  OneOfAKindProduct, 
  ProductVariant 
} from '@/types/product-types';

export default function DemoProductTypesPage() {
  // Sample mass-produced product data
  const massProducedProduct: MassProducedProduct = {
    id: 'mp-001',
    title: 'Romantic Architectural Print',
    description: 'Romantic architectural print of a balcony on a magnificently decorated house in art nouveau style. The beautiful pink magnolias give the print a spring-like atmosphere.',
    type: ProductType.MASS_PRODUCED,
    images: [
      {
        id: 'img-1',
        url: '/api/placeholder/600/800',
        altText: 'Romantic architectural print with pink magnolias',
        width: 600,
        height: 800,
      },
    ],
    sku: 'PS0746-4',
    inStock: true,
    frameIncluded: false,
    variants: [
      {
        id: 'var-1',
        title: '8" x 12" in',
        size: '8" x 12" in',
        dimensions: { width: 8, height: 12, unit: 'in' },
        price: { amount: 17.45, currency: 'USD' },
        sku: 'PS0746-4-8x12',
        inStock: true,
        isDefault: true,
      },
      {
        id: 'var-2',
        title: '12" x 16" in',
        size: '12" x 16" in',
        dimensions: { width: 12, height: 16, unit: 'in' },
        price: { amount: 27.00, currency: 'USD' },
        sku: 'PS0746-4-12x16',
        inStock: true,
      },
      {
        id: 'var-3',
        title: '16" x 20" in',
        size: '16" x 20" in',
        dimensions: { width: 16, height: 20, unit: 'in' },
        price: { amount: 36.95, currency: 'USD' },
        sku: 'PS0746-4-16x20',
        inStock: true,
      },
      {
        id: 'var-4',
        title: '20" x 20" in',
        size: '20" x 20" in',
        dimensions: { width: 20, height: 20, unit: 'in' },
        price: { amount: 36.95, currency: 'USD' },
        sku: 'PS0746-4-20x20',
        inStock: true,
      },
    ],
    priceRange: { min: 17.45, max: 36.95, currency: 'USD' },
    availableSizes: ['8" x 12"', '12" x 16"', '16" x 20"', '20" x 20"'],
    printOnDemand: true,
    deliveryInfo: {
      estimatedDays: '2-4 business days',
      freeShippingThreshold: 59,
      shippingMethods: [
        {
          id: 'standard',
          name: 'Standard Shipping',
          price: 5.99,
          estimatedDays: '2-4 business days',
        },
      ],
    },
  };

  // Sample one-of-a-kind product data
  const oneOfAKindProduct: OneOfAKindProduct = {
    id: 'oak-001',
    title: 'Abstract Expressionist Canvas #47',
    description: 'A powerful abstract expressionist piece featuring bold brushstrokes and vibrant colors. This original canvas captures the raw emotion and spontaneity characteristic of the movement.',
    type: ProductType.ONE_OF_A_KIND,
    images: [
      {
        id: 'img-2',
        url: '/api/placeholder/600/800',
        altText: 'Abstract expressionist original painting',
        width: 600,
        height: 800,
      },
    ],
    sku: 'OAK-AE-047',
    inStock: true,
    frameIncluded: true,
    price: { amount: 2850.00, currency: 'USD' },
    size: '24" x 36"',
    dimensions: { width: 24, height: 36, unit: 'in' },
    isUnique: true,
    artist: 'Maria Rodriguez',
    creationDate: '2024',
    authenticity: {
      certificate: true,
      signature: true,
      edition: 'Original 1/1',
      provenance: 'Direct from artist studio',
    },
  };

  const qualitySpecs = {
    paperWeight: '200 g/m²',
    paperType: 'Premium matte',
    finish: 'with matte finish',
  };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    massProducedProduct.variants[0]
  );

  const [viewType, setViewType] = useState<'mass-produced' | 'one-of-a-kind'>('mass-produced');

  return (
    <div className='min-h-screen bg-cream-base'>
      <div className='container mx-auto px-4 py-16'>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='font-display text-4xl lg:text-5xl font-semibold text-deep-charcoal mb-6'>
            Product Type Demo
          </h1>
          <p className='text-lg text-warm-gray max-w-3xl mx-auto leading-relaxed mb-8'>
            This demo showcases two distinct product presentation styles: mass-produced items with multiple variants 
            and size options, versus one-of-a-kind unique pieces with artist information and authenticity details.
          </p>
          
          {/* Toggle Buttons */}
          <div className='inline-flex bg-pure-white border border-sage-green/20 rounded-lg p-1'>
            <button
              onClick={() => setViewType('mass-produced')}
              className={`px-6 py-2 rounded-md transition-colors font-medium ${
                viewType === 'mass-produced'
                  ? 'bg-sage-green text-pure-white'
                  : 'text-sage-green hover:bg-sage-green/5'
              }`}
            >
              Mass Produced
            </button>
            <button
              onClick={() => setViewType('one-of-a-kind')}
              className={`px-6 py-2 rounded-md transition-colors font-medium ${
                viewType === 'one-of-a-kind'
                  ? 'bg-terracotta text-pure-white'
                  : 'text-terracotta hover:bg-terracotta/5'
              }`}
            >
              One of a Kind
            </button>
          </div>
        </div>

        {/* Product Display */}
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Product Image */}
            <div className='space-y-4'>
              <div className='aspect-[3/4] bg-gradient-to-br from-sage-green/10 to-terracotta/10 rounded-lg flex items-center justify-center'>
                <div className='text-6xl'>
                  {viewType === 'mass-produced' ? '🖼️' : '🎨'}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className='flex gap-2'>
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className='w-16 h-16 bg-sage-green/10 rounded border-2 border-transparent hover:border-sage-green transition-colors cursor-pointer flex items-center justify-center text-sm'
                  >
                    {i === 1 ? '🖼️' : '📷'}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className='space-y-6'>
              {/* Product Title and Type Badge */}
              <div>
                <div className='flex items-center gap-3 mb-3'>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    viewType === 'mass-produced' 
                      ? 'bg-sage-green/10 text-sage-green border border-sage-green/20'
                      : 'bg-terracotta/10 text-terracotta border border-terracotta/20'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      viewType === 'mass-produced' ? 'bg-sage-green' : 'bg-terracotta'
                    }`} />
                    {viewType === 'mass-produced' ? 'Mass Produced' : 'One of a Kind'}
                  </div>
                </div>
                
                <h1 className='font-display text-3xl font-semibold text-deep-charcoal mb-4'>
                  {viewType === 'mass-produced' ? massProducedProduct.title : oneOfAKindProduct.title}
                </h1>
                
                <p className='text-warm-gray leading-relaxed'>
                  {viewType === 'mass-produced' ? massProducedProduct.description : oneOfAKindProduct.description}
                </p>
              </div>

              {/* Product Variant/Details Display */}
              {viewType === 'mass-produced' ? (
                <MassProducedVariantSelector
                  product={massProducedProduct}
                  onVariantChange={setSelectedVariant}
                />
              ) : (
                <OneOfAKindDisplay product={oneOfAKindProduct} />
              )}

              {/* Additional Product Info */}
              <div className='space-y-4'>
                <div className='text-sm text-warm-gray'>
                  <div className='mb-2'>
                    <strong>SKU:</strong> {viewType === 'mass-produced' ? selectedVariant.sku : oneOfAKindProduct.sku}
                  </div>
                  {viewType === 'mass-produced' && massProducedProduct.printOnDemand && (
                    <div className='mb-2'>
                      <strong>Note:</strong> Sizes 18x24&quot; (46x61 cm) and 24x36&quot; (61x91 cm) are printed on demand and will be delivered separately.
                    </div>
                  )}
                </div>
              </div>

              {/* Quality Specifications */}
              <QualitySpecs 
                specs={qualitySpecs} 
                frameIncluded={viewType === 'mass-produced' ? massProducedProduct.frameIncluded : oneOfAKindProduct.frameIncluded} 
              />
            </div>
          </div>

          {/* Implementation Notes */}
          <div className='mt-16 p-8 bg-pure-white border border-sage-green/20 rounded-lg'>
            <h2 className='font-display text-2xl font-medium text-deep-charcoal mb-6'>
              Implementation Notes
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <h3 className='font-medium text-sage-green mb-3'>Mass-Produced Products</h3>
                <ul className='text-sm text-warm-gray space-y-2'>
                  <li>• Expandable size selector with pricing</li>
                  <li>• Multiple variant support with radio buttons</li>
                  <li>• Delivery information and shipping details</li>
                  <li>• Print-on-demand notifications</li>
                  <li>• Stock status for each variant</li>
                  <li>• Size guide and favorites buttons</li>
                </ul>
              </div>
              
              <div>
                <h3 className='font-medium text-terracotta mb-3'>One-of-a-Kind Products</h3>
                <ul className='text-sm text-warm-gray space-y-2'>
                  <li>• Unique item badge and pricing</li>
                  <li>• Artist information and creation date</li>
                  <li>• Authenticity certificates and signatures</li>
                  <li>• Edition and provenance details</li>
                  <li>• Urgency messaging for unique items</li>
                  <li>• Different CTA button styling</li>
                </ul>
              </div>
            </div>
            
            <div className='mt-6 p-4 bg-cream-base rounded-lg'>
              <p className='text-sm text-warm-gray'>
                <strong>Usage:</strong> Use the <code>ProductType</code> enum and type guards (<code>isMassProduced()</code>, <code>isOneOfAKind()</code>) 
                to determine which component to render. Both components share the same design system tokens for consistent styling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}