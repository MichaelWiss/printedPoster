
/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.shopify.com', 'images.unsplash.com'],
	},
	experimental: {
		esmExternals: false,
	},
}
