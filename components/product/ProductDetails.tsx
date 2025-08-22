import Image from 'next/image'
import { useState } from 'react'
import type { ShopifyProduct } from '@/types/shopify'
import { useCart } from '@/context/CartContext'

interface Props {
	product: ShopifyProduct
}

export function ProductDetails({ product }: Props) {
	const [qty, setQty] = useState(1)
	const { actions } = useCart()

	const firstImage = product.images?.edges[0]?.node

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{firstImage && (
				<div className="relative h-96">
					<Image src={firstImage.url} alt={firstImage.altText || product.title} fill className="object-cover" />
				</div>
			)}
			<div>
				<h1 className="text-2xl font-bold mb-2">{product.title}</h1>
				<p className="text-gray-700 mb-4">{product.description}</p>
				<div className="mb-4">
					<label className="block text-sm">Quantity</label>
					<input type="number" value={qty} min={1} onChange={e => setQty(Number(e.target.value))} className="mt-1 border rounded px-2 py-1 w-24" />
				</div>
				<button onClick={() => actions.addItem(product, qty)} className="bg-blue-600 text-white px-4 py-2 rounded">Add to cart</button>
			</div>
		</div>
	)
}

export default ProductDetails

