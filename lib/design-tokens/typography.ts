/**
 * Huncwot-Inspired Typography Design Tokens
 * 
 * Typography system based on the Huncwot style guide
 * Provides consistent text styling across the application.
 */

export const typography = {
  // Font Families
  fontFamily: {
    primary: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(', '),
    mono: [
      'SF Mono',
      'Monaco',
      'Cascadia Code',
      'Roboto Mono',
      'Consolas',
      'Courier New',
      'monospace',
    ].join(', '),
  },
  
  // Font Sizes
  fontSize: {
    '6xl': '3.75rem', // 60px
    '5xl': '3rem',    // 48px
    '4xl': '2.25rem', // 36px
    '3xl': '1.875rem', // 30px
    '2xl': '1.5rem',  // 24px
    xl: '1.25rem',    // 20px
    lg: '1.125rem',   // 18px
    base: '1rem',     // 16px
    sm: '0.875rem',   // 14px
    xs: '0.75rem',    // 12px
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  },
  
  // Font Weights
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Typography Utilities for Tailwind Classes
export const typographyUtils = {
  // Display Text
  display: {
    '6xl': 'text-6xl font-bold leading-none',
    '5xl': 'text-5xl font-bold leading-tight',
    '4xl': 'text-4xl font-bold leading-tight',
    '3xl': 'text-3xl font-semibold leading-tight',
  },
  
  // Headings
  heading: {
    h1: 'text-2xl font-semibold leading-tight',
    h2: 'text-xl font-semibold leading-tight',
    h3: 'text-lg font-medium leading-tight',
    h4: 'text-base font-medium leading-tight',
  },
  
  // Body Text
  body: {
    large: 'text-lg leading-normal',
    base: 'text-base leading-normal',
    small: 'text-sm leading-normal',
    caption: 'text-xs leading-normal',
  },
  
  // Special Text
  special: {
    label: 'text-sm font-medium leading-tight',
    button: 'text-sm font-medium leading-none',
    link: 'text-sm font-medium leading-normal underline',
  },
} as const;
