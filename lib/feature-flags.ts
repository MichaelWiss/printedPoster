// Feature flags for gradual rollout of new features
export const FEATURE_FLAGS = {
  // Enhanced product types with collection-based detection
  ENHANCED_PRODUCT_TYPES: process.env.NEXT_PUBLIC_ENHANCED_PRODUCT_TYPES === 'true',
  
  // A/B testing for product type components
  PRODUCT_TYPE_AB_TEST: process.env.NEXT_PUBLIC_PRODUCT_TYPE_AB_TEST === 'true',
  
  // Debug mode for product type detection
  DEBUG_PRODUCT_TYPES: process.env.NODE_ENV === 'development' && 
                       process.env.NEXT_PUBLIC_DEBUG_PRODUCT_TYPES === 'true',
} as const;

// Helper to check if enhanced product types should be shown
export function shouldUseEnhancedProductTypes(userId?: string): boolean {
  if (!FEATURE_FLAGS.ENHANCED_PRODUCT_TYPES) {
    return false;
  }
  
  // If A/B testing is disabled, show to everyone
  if (!FEATURE_FLAGS.PRODUCT_TYPE_AB_TEST) {
    return true;
  }
  
  // A/B testing logic - show to 50% of users
  if (userId) {
    // Deterministic based on user ID for consistent experience
    const hash = simpleHash(userId);
    return hash % 100 < 50;
  }
  
  // For anonymous users, use random sampling
  return Math.random() < 0.5;
}

// Simple hash function for consistent user bucketing
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Debug logging for product type detection
export function debugProductType(message: string, data?: unknown) {
  if (FEATURE_FLAGS.DEBUG_PRODUCT_TYPES) {
    // eslint-disable-next-line no-console
    console.log(`[Product Types Debug] ${message}`, data);
  }
}
