/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // Enable modern formats for photographic images
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Minimal performance optimizations
  experimental: {
    optimizePackageImports: [
      '@shopify/storefront-kit',
      'graphql-request',
      'zustand',
    ],
  },
  // Reduce bundle size in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Fix multiple lockfile warning
  outputFileTracingRoot: process.cwd(),
};
