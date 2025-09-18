/**
 * Combined Sqirlla + Huncwot Color Design Tokens
 * 
 * Combines the warm, artisanal aesthetic of Sqirlla.com with the clean, modern approach of Huncwot.com
 * Provides consistent color usage across the application.
 */

export const colors = {
  // Sqirlla-Inspired Primary Colors
  sqirlla: {
    creamBase: '#faf7f2', // Warm cream background
    deepBlack: '#1a1a1a', // Rich black for text
    warmWhite: '#ffffff', // Pure white for cards
    sageGreen: '#9fb8a8', // Muted sage green accent
    terracotta: '#d4a574', // Warm terracotta accent
    dustyBlue: '#7a9cc6', // Soft blue accent
    coralPink: '#e8a598', // Soft coral for highlights
    mustard: '#d4b655', // Mustard yellow accent
    lavender: '#c8b5d1', // Light lavender
    warmGray: '#8b8680', // Warm neutral gray
    lightSage: '#e8f0ea', // Very light sage for backgrounds
    creamShadow: '#f0ebe3', // Subtle shadow color
  },
  
  // Huncwot-Inspired Primary Colors
  huncwot: {
    primaryBlack: '#000000',
    primaryWhite: '#ffffff',
    primaryRed: '#ff0000',
    accentGray: '#f5f5f5',
    borderGray: '#e5e5e5',
    textGray: '#666666',
    hoverGray: '#f0f0f0',
  },
  
  // Combined Semantic Colors
  semantic: {
    success: '#9fb8a8', // Use sage green for success
    warning: '#d4b655', // Mustard for warnings
    error: '#e8a598', // Coral for errors (soft approach)
    info: '#7a9cc6', // Blue for information
  },
  
  // Neutral Colors (Combined approach)
  neutral: {
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
} as const;

// CSS Custom Properties for runtime usage
export const colorCSSVars = {
  // Sqirlla colors
  '--cream-base': colors.sqirlla.creamBase,
  '--deep-black': colors.sqirlla.deepBlack,
  '--warm-white': colors.sqirlla.warmWhite,
  '--sage-green': colors.sqirlla.sageGreen,
  '--terracotta': colors.sqirlla.terracotta,
  '--dusty-blue': colors.sqirlla.dustyBlue,
  '--coral-pink': colors.sqirlla.coralPink,
  '--mustard': colors.sqirlla.mustard,
  '--lavender': colors.sqirlla.lavender,
  '--warm-gray': colors.sqirlla.warmGray,
  '--light-sage': colors.sqirlla.lightSage,
  '--cream-shadow': colors.sqirlla.creamShadow,
  
  // Huncwot colors
  '--primary-black': colors.huncwot.primaryBlack,
  '--primary-white': colors.huncwot.primaryWhite,
  '--primary-red': colors.huncwot.primaryRed,
  '--accent-gray': colors.huncwot.accentGray,
  '--border-gray': colors.huncwot.borderGray,
  '--text-gray': colors.huncwot.textGray,
  '--hover-gray': colors.huncwot.hoverGray,
  
  // Semantic colors
  '--success': colors.semantic.success,
  '--warning': colors.semantic.warning,
  '--error': colors.semantic.error,
  '--info': colors.semantic.info,
} as const;
