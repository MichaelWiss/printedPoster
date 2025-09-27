function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function getOptionalEnv(key: string, defaultValue = ''): string {
  return process.env[key] || defaultValue
}

export const config = {
  // Shopify Configuration
  shopify: {
    storeDomain: getRequiredEnv('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN'),
    storefrontAccessToken: getRequiredEnv('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'),
    adminAccessToken: getOptionalEnv('SHOPIFY_ADMIN_API_ACCESS_TOKEN'),
    storefrontUrl: `https://${getRequiredEnv('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN')}/api/2023-07/graphql.json`,
  },
  
  // NextAuth Configuration
  nextAuth: {
    url: getRequiredEnv('NEXTAUTH_URL'),
    secret: getRequiredEnv('NEXTAUTH_SECRET'),
  },
  
  // Database Configuration
  database: {
    url: getRequiredEnv('DATABASE_URL'),
  },
  
  // App Configuration
  app: {
    url: getOptionalEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    env: getOptionalEnv('NODE_ENV', 'development'),
  }
} as const

// Validate configuration on import (server-side only)
if (typeof window === 'undefined') {
  console.log('✅ Environment configuration loaded successfully')
}