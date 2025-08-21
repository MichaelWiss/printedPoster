import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/shopify/services'

export async function GET() {
  try {
    const products = await getProducts(20)
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
