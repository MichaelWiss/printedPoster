import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/shopify/client'

export async function GET() {
  try {
    // Use cache for 60s (ISR-like for API route)
    const products = await getProducts(20)
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    // Add more robust error message
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
