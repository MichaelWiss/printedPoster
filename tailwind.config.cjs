/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sqirlla-Inspired Colors
        'cream-base': '#faf7f2',
        'deep-charcoal': '#1a1a1a',
        'pure-white': '#ffffff',
        'sage-green': '#9fb8a8',
        'warm-taupe': '#8b7355',
        terracotta: '#d4a574',
        'dusty-blue': '#7a9cc6',
        'coral-pink': '#e8a598',
        'mustard': '#d4b655',
        'lavender': '#c8b5d1',
        'warm-gray': '#8b8680',
        'light-sage': '#e8f0ea',
        'cream-shadow': '#f0ebe3',
        'light-gray': '#f0ebe3',
        'border-gray': '#e8e5e0',
        'highlight-orange': '#e83904',

        // Huncwot-Inspired Colors
        'primary-black': '#000000',
        'primary-white': '#ffffff',
        'primary-red': '#ff0000',
        'accent-gray': '#f5f5f5',
        'huncwot-border-gray': '#e5e5e5',
        'text-gray': '#666666',
        'hover-gray': '#f0f0f0',

        // Combined Semantic Colors
        success: '#9fb8a8', // Sage green
        warning: '#d4b655', // Mustard
        error: '#e8a598', // Coral pink
        info: '#7a9cc6', // Dusty blue

        // Legacy compatibility (can be removed later)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        card: 'var(--card-bg)',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'monospace'],
      },
      fontSize: {
        // Display & Headlines
        '6xl': '3.75rem', // 60px - Hero headlines
        '5xl': '3rem', // 48px - Page headers
        '4xl': '2.25rem', // 36px - Section headers
        '3xl': '1.875rem', // 30px - Large headers

        // Content Hierarchy
        '2xl': '1.5rem', // 24px - Subheaders
        xl: '1.25rem', // 20px - Card titles
        lg: '1.125rem', // 18px - Large body
        base: '1rem', // 16px - Body text
        sm: '0.875rem', // 14px - Small text
        xs: '0.75rem', // 12px - Captions
      },
      spacing: {
        // 8px Grid System
        1: '0.25rem', // 4px
        2: '0.5rem', // 8px
        3: '0.75rem', // 12px
        4: '1rem', // 16px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        8: '2rem', // 32px
        10: '2.5rem', // 40px
        12: '3rem', // 48px
        16: '4rem', // 64px
        20: '5rem', // 80px
        24: '6rem', // 96px
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1200px',
        'container-2xl': '1400px',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        wide: '0.02em',
        wider: '0.05em',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(42, 39, 36, 0.1)',
        medium: '0 4px 16px rgba(42, 39, 36, 0.15)',
        hard: '0 8px 25px rgba(42, 39, 36, 0.15)',
      },
      backgroundImage: {
        'gradient-sage': 'linear-gradient(135deg, #9fb8a8 0%, #e8f0ea 100%)',
        'gradient-terracotta': 'linear-gradient(135deg, #d4a574 0%, #f4e4c1 100%)',
        'gradient-dusty': 'linear-gradient(135deg, #7a9cc6 0%, #c8d5e8 100%)',
        'gradient-coral': 'linear-gradient(135deg, #e8a598 0%, #f4d1c7 100%)',
        'gradient-mustard': 'linear-gradient(135deg, #d4b655 0%, #f4e4c1 100%)',
        'gradient-lavender': 'linear-gradient(135deg, #c8b5d1 0%, #e8d5f1 100%)',
      },
      aspectRatio: {
        product: '4/5',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeInSlide: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-slide': 'fadeInSlide 3000ms ease-in-out',
      },
    },
  },
  plugins: [
    // Custom component utilities
    function ({ addUtilities }) {
      const newUtilities = {
        // Huncwot-Inspired Button Styles
        '.btn-huncwot-primary': {
          '@apply bg-primary-black text-primary-white border border-primary-black px-6 py-2 font-medium transition-all duration-150 ease-in-out hover:bg-text-gray hover:border-text-gray':
            {},
        },
        '.btn-huncwot-accent': {
          '@apply bg-primary-red text-primary-white border border-primary-red px-6 py-2 font-medium transition-all duration-150 ease-in-out hover:bg-red-600 hover:border-red-600':
            {},
        },
        '.btn-huncwot-secondary': {
          '@apply bg-transparent text-primary-black border border-primary-black px-6 py-2 font-medium transition-all duration-150 ease-in-out hover:bg-primary-black hover:text-primary-white':
            {},
        },
        '.btn-huncwot-ghost': {
          '@apply bg-transparent text-primary-black border border-transparent px-6 py-2 font-medium transition-all duration-150 ease-in-out hover:bg-hover-gray':
            {},
        },
        
        // Legacy Button Styles (maintain compatibility)
        '.btn-primary': {
          '@apply bg-sage-green text-white px-6 py-2 rounded-sm font-medium transition-all duration-300 hover:bg-warm-taupe hover:-translate-y-0.5':
            {},
        },
        '.btn-secondary': {
          '@apply bg-warm-taupe text-white px-6 py-2 rounded-sm font-medium transition-all duration-300 hover:bg-sage-green hover:-translate-y-0.5':
            {},
        },
        '.btn-outline': {
          '@apply bg-transparent border border-deep-charcoal text-deep-charcoal px-6 py-2 rounded-sm font-medium transition-all duration-300 hover:bg-deep-charcoal hover:text-pure-white':
            {},
        },
        // Huncwot-Inspired Card Styles
        '.card-huncwot': {
          '@apply bg-primary-white border border-border-gray rounded-none overflow-hidden transition-all duration-150 ease-in-out hover:border-primary-black hover:-translate-y-0.5':
            {},
        },
        '.card-huncwot-header': {
          '@apply p-6 border-b border-border-gray':
            {},
        },
        '.card-huncwot-body': {
          '@apply p-6':
            {},
        },
        '.card-huncwot-footer': {
          '@apply p-6 border-t border-border-gray':
            {},
        },
        
        // Huncwot-Inspired Input Styles
        '.input-huncwot': {
          '@apply w-full px-3 py-2 border border-gray-300 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-black focus:border-transparent':
            {},
        },
        
        // Legacy Card and Input Styles (maintain compatibility)
        '.card': {
          '@apply bg-pure-white border border-border-gray rounded-sm transition-all duration-300 hover:shadow-hard hover:-translate-y-1 hover:border-sage-green':
            {},
        },
        '.input': {
          '@apply border border-border-gray rounded-sm px-4 py-2 font-body transition-colors duration-300 focus:border-sage-green focus:outline-none':
            {},
        },
        '.badge-sale': {
          '@apply bg-highlight-orange text-white px-2 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider':
            {},
        },
        '.badge-new': {
          '@apply bg-sage-green text-white px-2 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider':
            {},
        },
        '.text-hierarchy-display': {
          '@apply font-display text-5xl md:text-6xl font-semibold text-deep-charcoal':
            {},
        },
        '.text-hierarchy-h1': {
          '@apply font-display text-4xl md:text-5xl font-semibold text-deep-charcoal':
            {},
        },
        '.text-hierarchy-h2': {
          '@apply font-display text-3xl md:text-4xl font-medium text-deep-charcoal':
            {},
        },
        '.text-hierarchy-h3': {
          '@apply font-display text-2xl md:text-3xl font-medium text-deep-charcoal':
            {},
        },
        '.text-display-sm': {
          '@apply font-display text-2xl md:text-3xl font-medium text-deep-charcoal':
            {},
        },
        '.text-hero': {
          '@apply font-display text-5xl md:text-6xl font-semibold': {},
        },
        '.text-body-large': {
          '@apply font-body text-lg text-deep-charcoal leading-relaxed': {},
        },
        '.text-body': {
          '@apply font-body text-base text-deep-charcoal leading-relaxed': {},
        },
        '.text-body-base': {
          '@apply font-body text-base text-deep-charcoal leading-relaxed': {},
        },
        '.text-body-sm': {
          '@apply font-body text-sm text-deep-charcoal leading-relaxed': {},
        },
        '.text-body-small': {
          '@apply font-body text-sm text-warm-gray leading-relaxed': {},
        },
        '.text-caption': {
          '@apply font-body text-xs text-warm-gray': {},
        },
        '.nav-link': {
          '@apply transition-colors duration-200 hover:text-sage-green': {},
        },
        '.container-responsive': {
          '@apply max-w-container-xl mx-auto px-4 md:px-6 lg:px-8': {},
        },
        '.grid-products': {
          '@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8':
            {},
        },
        '.aspect-product': {
          '@apply aspect-[4/5]': {},
        },
        '.hover-lift': {
          '@apply transition-transform duration-300 hover:-translate-y-1': {},
        },
        '.hover-scale': {
          '@apply transition-transform duration-300 hover:scale-105': {},
        },
        '.focus-ring': {
          '@apply focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2':
            {},
        },
        '.animate-fade-in': {
          '@apply animate-pulse': {},
        },
        '.animate-fade-in-slide': {
          animation: 'fadeInSlide 3000ms ease-in-out',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
