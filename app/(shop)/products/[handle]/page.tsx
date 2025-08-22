'use client'

import React, { useState } from "react";
import Image from 'next/image'

type Props = {
	params: { handle: string };
};

// Mock product data - in real app this would come from Shopify
const mockProduct = {
  id: '1',
  title: 'Abstract Geometric Art Print',
  description: 'A stunning abstract geometric composition featuring bold shapes and sophisticated color palette. Perfect for modern interiors and minimalist spaces.',
  images: [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=800&fit=crop'
  ],
  price: '$45.00',
  variants: {
    sizes: [
      { id: 'small', name: '8" × 10"', price: '$35.00' },
      { id: 'medium', name: '11" × 14"', price: '$45.00' },
      { id: 'large', name: '16" × 20"', price: '$65.00' },
      { id: 'xl', name: '20" × 24"', price: '$85.00' }
    ],
    frames: [
      { id: 'none', name: 'Print Only', price: '+$0' },
      { id: 'black', name: 'Black Frame', price: '+$25' },
      { id: 'white', name: 'White Frame', price: '+$25' },
      { id: 'natural', name: 'Natural Wood', price: '+$35' }
    ]
  },
  details: [
    'Premium 220gsm matte paper',
    'Archival quality inks',
    'Made to order',
    'Ships within 3-5 business days',
    'Free shipping on orders over $75'
  ]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductPage({ params }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('medium')
  const [selectedFrame, setSelectedFrame] = useState('none')
  const [quantity, setQuantity] = useState(1)

  const selectedSizeData = mockProduct.variants.sizes.find(s => s.id === selectedSize)

	return (
		<div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.title} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl lg:text-4xl font-normal text-foreground mb-4">
                {mockProduct.title}
              </h1>
              <p className="text-2xl font-medium text-accent mb-6">
                {selectedSizeData?.price}
              </p>
              <p className="text-body text-muted leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-inter text-lg font-medium mb-3">Size</h3>
              <div className="grid grid-cols-2 gap-2">
                {mockProduct.variants.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size.id
                        ? 'border-accent bg-accent text-white'
                        : 'border-gray-300 hover:border-accent'
                    }`}
                  >
                    <div>{size.name}</div>
                    <div className="text-xs opacity-75">{size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Selection */}
            <div>
              <h3 className="font-inter text-lg font-medium mb-3">Frame</h3>
              <div className="grid grid-cols-2 gap-2">
                {mockProduct.variants.frames.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame.id)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedFrame === frame.id
                        ? 'border-accent bg-accent text-white'
                        : 'border-gray-300 hover:border-accent'
                    }`}
                  >
                    <div>{frame.name}</div>
                    <div className="text-xs opacity-75">{frame.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-inter text-lg font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-accent"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-accent"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-accent text-white py-4 px-6 font-medium hover:bg-accent/90 transition-colors duration-200">
              Add to Cart
            </button>

            {/* Product Details */}
            <div>
              <h3 className="font-inter text-lg font-medium mb-3">Details</h3>
              <ul className="space-y-2">
                {mockProduct.details.map((detail, index) => (
                  <li key={index} className="text-body text-muted flex items-start">
                    <svg className="w-4 h-4 text-accent mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
	);
}
