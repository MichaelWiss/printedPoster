
/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
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
		optimizePackageImports: ['@shopify/storefront-kit', 'graphql-request', 'zustand'],
	},
	// Reduce bundle size in production
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	// Fix multiple lockfile warning
	outputFileTracingRoot: require('path').join(process.cwd()),
}
