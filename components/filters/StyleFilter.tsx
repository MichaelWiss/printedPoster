'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Style categories mapped to Shopify product tags
export const STYLE_CATEGORIES = {
  'Abstract': ['abstract', 'modern-abstract', 'geometric', 'contemporary'],
  'Nature': ['landscape', 'botanical', 'wildlife', 'nature', 'ocean', 'forest'],
  'Minimalist': ['minimalist', 'simple', 'clean', 'modern'],
  'Vintage': ['vintage', 'retro', 'classic', 'antique', 'traditional'],
  'Photography': ['photography', 'black-and-white', 'color-photo', 'street-photography'],
  'Illustration': ['illustration', 'digital-art', 'hand-drawn', 'sketch'],
  'Portrait': ['portrait', 'people', 'face', 'figure'],
  'Urban': ['urban', 'city', 'architecture', 'street', 'building']
} as const;

export type StyleCategory = keyof typeof STYLE_CATEGORIES;

interface StyleFilterProps {
  currentStyle?: string;
  onStyleChange?: (style: string | null) => void;
  productCounts?: Record<string, number>;
  className?: string;
}

export function StyleFilter({ 
  currentStyle, 
  onStyleChange, 
  productCounts = {},
  className = '' 
}: StyleFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get current style from URL or prop
  const selectedStyle = currentStyle || searchParams.get('style') || '';
  
  const handleStyleSelect = (style: string) => {
    if (onStyleChange) {
      onStyleChange(style === selectedStyle ? null : style);
      return;
    }
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (style === selectedStyle) {
      params.delete('style');
    } else {
      params.set('style', style);
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={`bg-pure-white border border-border-gray rounded-lg ${className}`}>
      {/* Filter Header */}
      <button
        className='w-full flex items-center justify-between p-4 hover:bg-sage-green/5 transition-colors'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className='font-display text-lg font-medium text-deep-charcoal'>
          Filter by Style
        </h3>
        <div className='flex items-center gap-2'>
          {selectedStyle && (
            <div className='px-2 py-1 bg-sage-green/10 text-sage-green text-xs rounded-full'>
              {selectedStyle}
            </div>
          )}
          <svg 
            className={`w-5 h-5 text-warm-gray transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
      </button>

      {/* Filter Options */}
      {isExpanded && (
        <div className='px-4 pb-4 border-t border-border-gray'>
          <div className='space-y-2 mt-4'>
            {/* Clear Filter Option */}
            {selectedStyle && (
              <button
                onClick={() => handleStyleSelect('')}
                className='w-full text-left px-3 py-2 text-sm text-warm-gray hover:bg-sage-green/5 hover:text-sage-green rounded-md transition-colors'
              >
                ✕ Clear Filter
              </button>
            )}
            
            {/* Style Categories */}
            {Object.keys(STYLE_CATEGORIES).map((style) => (
              <button
                key={style}
                onClick={() => handleStyleSelect(style)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                  selectedStyle === style
                    ? 'bg-sage-green text-pure-white font-medium'
                    : 'text-deep-charcoal hover:bg-sage-green/10 hover:text-sage-green'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <span>{style}</span>
                  {productCounts[style] && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedStyle === style 
                        ? 'bg-sage-green/20 text-pure-white' 
                        : 'bg-warm-gray/10 text-warm-gray'
                    }`}>
                      {productCounts[style]}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get style category from product tags
export function getStyleFromTags(tags: string[]): StyleCategory | null {
  const lowerTags = tags.map(tag => tag.toLowerCase());
  
  for (const [category, categoryTags] of Object.entries(STYLE_CATEGORIES)) {
    if (categoryTags.some(tag => lowerTags.includes(tag))) {
      return category as StyleCategory;
    }
  }
  
  return null;
}

// Helper function to get all tags for a style category
export function getTagsForStyle(style: StyleCategory): readonly string[] {
  return STYLE_CATEGORIES[style] || [];
}
