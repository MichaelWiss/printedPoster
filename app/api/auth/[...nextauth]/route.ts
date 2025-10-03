import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth';

// Lazy-load NextAuth handler to avoid build-time environment variable issues
let _handler: ReturnType<typeof NextAuth> | null = null;

function getHandler() {
  if (_handler) {
    return _handler;
  }
  
  _handler = NextAuth(getAuthOptions());
  return _handler;
}

export const GET = async (req: Request, context: { params: { nextauth: string[] } }) => {
  return getHandler()(req, context);
};

export const POST = async (req: Request, context: { params: { nextauth: string[] } }) => {
  return getHandler()(req, context);
};
