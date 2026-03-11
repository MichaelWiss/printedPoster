import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { checkRateLimit } from '@/lib/utils/rate-limit';

// Rate limit configs per route category
const AUTH_RATE_LIMIT = { limit: 10, windowSeconds: 60 }; // 10 req/min for auth
const CART_RATE_LIMIT = { limit: 30, windowSeconds: 60 }; // 30 req/min for cart
const API_RATE_LIMIT = { limit: 60, windowSeconds: 60 };  // 60 req/min general

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const ip = getClientIp(request);

  // --- Rate limiting ---
  let rateConfig = API_RATE_LIMIT;
  if (pathname.startsWith('/api/auth')) {
    rateConfig = AUTH_RATE_LIMIT;
  } else if (pathname.startsWith('/api/cart')) {
    rateConfig = CART_RATE_LIMIT;
  }

  const rateResult = checkRateLimit(`${ip}:${pathname}`, rateConfig);
  if (!rateResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateResult.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // --- CSRF protection for state-changing requests ---
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const allowedOrigin = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;

    if (origin && allowedOrigin) {
      const allowed = new URL(allowedOrigin).origin;
      if (origin !== allowed) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
  }

  // --- Auth guard for cart routes ---
  if (pathname.startsWith('/api/cart')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const response = NextResponse.next();

  // Add rate limit headers
  response.headers.set('X-RateLimit-Remaining', String(rateResult.remaining));
  response.headers.set('X-RateLimit-Reset', String(rateResult.resetAt));

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
