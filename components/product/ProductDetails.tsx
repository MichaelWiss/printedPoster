'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ShopifyProduct } from '@/types/shopify'
import { useCartActions, useCartLoading, useIsAuthenticated } from '@/stores/cart-store'

interface Props {
	product: ShopifyProduct
}

export function ProductDetails({ product }: Props) {
	const [qty, setQty] = useState(1)
	const { addItem } = useCartActions()
	const isLoading = useCartLoading()
	const isAuthenticated = useIsAuthenticated()

	const handleAddToCart = async () => {
		try {
			await addItem(product, qty)
		} catch (error) {
			console.error('Failed to add item to cart:', error)
		}
	}

	const firstImage = product.images?.edges[0]?.node

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{firstImage && (
				<div className="relative h-96">
					<Image
						src={firstImage.url}
						alt={firstImage.altText || product.title}
						fill
						className="object-cover rounded-lg"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</div>
			)}
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-deep-charcoal mb-4">{product.title}</h1>
					<p className="text-warm-gray text-lg leading-relaxed">{product.description}</p>
				</div>

				{/* Price */}
				{product.priceRange?.minVariantPrice && (
					<div>
						<p className="text-3xl font-bold text-terracotta">
							{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: product.priceRange.minVariantPrice.currencyCode || 'USD'
							}).format(parseFloat(product.priceRange.minVariantPrice.amount))}
						</p>
						<p className="text-sm text-warm-gray mt-1">Free shipping</p>
					</div>
				)}

				{/* Quantity Selector */}
				<div>
					<label htmlFor="quantity" className="block text-sm font-medium text-deep-charcoal mb-2">
						Quantity
					</label>
					<div className="flex items-center gap-3">
						<button
							onClick={() => setQty(Math.max(1, qty - 1))}
							disabled={qty <= 1}
							className="w-10 h-10 flex items-center justify-center border border-border-gray rounded hover:bg-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							aria-label="Decrease quantity"
						>
							-
						</button>
						<input
							id="quantity"
							type="number"
							value={qty}
							min={1}
							max={99}
							onChange={e => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
							className="w-16 text-center border border-border-gray rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
							autoComplete="off"
							name="quantity"
							suppressHydrationWarning
						/>
						<button
							onClick={() => setQty(Math.min(99, qty + 1))}
							disabled={qty >= 99}
							className="w-10 h-10 flex items-center justify-center border border-border-gray rounded hover:bg-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							aria-label="Increase quantity"
						>
							+
						</button>
					</div>
				</div>

				{/* Add to Cart Button */}
				<div className="pt-4">
					<button
						onClick={handleAddToCart}
						disabled={isLoading}
						className="w-full bg-terracotta hover:bg-terracotta/90 text-cream-base py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50"
					>
						{isLoading ? "Adding to cart..." : "Add to Cart"}
					</button>

					{isAuthenticated && (
						<p className="text-xs text-sage-green mt-2 text-center">
							✓ Cart will sync across your devices
						</p>
					)}
				</div>

				{/* Product Features */}
				<div className="border-t border-border-gray pt-6">
					<h3 className="text-lg font-semibold text-deep-charcoal mb-4">Product Details</h3>
					<ul className="space-y-2 text-warm-gray">
						<li className="flex items-center gap-2">
							<svg className="w-4 h-4 text-sage-green" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
							High-quality materials
						</li>
						<li className="flex items-center gap-2">
							<svg className="w-4 h-4 text-sage-green" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
							Free shipping worldwide
						</li>
						<li className="flex items-center gap-2">
							<svg className="w-4 h-4 text-sage-green" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
							30-day return policy
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails

