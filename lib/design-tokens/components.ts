/**
 * Huncwot-Inspired Component Design Tokens
 * 
 * Component-specific styling based on the Huncwot style guide
 * Provides consistent component styling across the application.
 */


export const componentStyles = {
  // Button Styles
  button: {
    base: 'inline-flex items-center justify-center border border-transparent font-medium transition-all duration-150 ease-in-out cursor-pointer no-underline select-none',
    sizes: {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
      xl: 'px-6 py-4 text-lg',
    },
    variants: {
      primary: 'bg-black text-white border-black hover:bg-gray-600 hover:border-gray-600',
      accent: 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600',
      secondary: 'bg-transparent text-black border-black hover:bg-black hover:text-white',
      ghost: 'bg-transparent text-black border-transparent hover:bg-gray-100',
    },
  },
  
  // Card Styles
  card: {
    base: 'bg-white border border-gray-200 rounded-none overflow-hidden transition-all duration-150 ease-in-out',
    hover: 'hover:border-black hover:-translate-y-0.5',
    header: 'p-6 border-b border-gray-200',
    body: 'p-6',
    footer: 'p-6 border-t border-gray-200',
  },
  
  // Input Styles
  input: {
    base: 'w-full px-3 py-2 border border-gray-300 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent',
    error: 'border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:ring-green-500',
  },
  
  // Badge Styles
  badge: {
    base: 'inline-flex items-center px-2 py-1 text-xs font-medium rounded-none',
    variants: {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    },
  },
  
  // Container Styles
  container: {
    base: 'mx-auto px-4',
    sizes: {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-screen-2xl',
    },
  },
  
  // Grid Styles
  grid: {
    base: 'grid gap-6',
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    },
    responsive: {
      'md-2': 'md:grid-cols-2',
      'md-3': 'md:grid-cols-3',
      'lg-3': 'lg:grid-cols-3',
      'lg-4': 'lg:grid-cols-4',
    },
  },
  
  // Flexbox Styles
  flex: {
    base: 'flex',
    col: 'flex-col',
    row: 'flex-row',
    center: 'items-center justify-center',
    between: 'items-center justify-between',
    start: 'items-center justify-start',
    end: 'items-center justify-end',
  },
} as const;

// Layout Utilities
export const layoutUtils = {
  // Spacing between sections
  sectionSpacing: 'py-12 md:py-16 lg:py-20',
  
  // Container with proper spacing
  container: 'container mx-auto px-4',
  
  // Page wrapper
  pageWrapper: 'min-h-screen bg-white',
  
  // Content wrapper
  contentWrapper: 'max-w-7xl mx-auto px-4 py-8',
} as const;
