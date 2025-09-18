import { NextResponse } from 'next/server';

import { getCachedProductsWithRevalidation } from '@/lib/cache/data-cache';
import {
  safeAsync,
  logError,
  getUserFriendlyMessage,
} from '@/lib/utils/error-handling';

export async function GET() {
  const result = await safeAsync(
    () => getCachedProductsWithRevalidation(20),
    'API:GET /api/products'
  );

  if (result.error) {
    logError('API:GET /api/products', result.error);
    return NextResponse.json(
      {
        error: getUserFriendlyMessage(result.error),
        success: false,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      products: result.data,
      success: true,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'CDN-Cache-Control': 'public, s-maxage=300',
      },
    }
  );
}
