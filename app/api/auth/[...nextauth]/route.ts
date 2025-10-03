import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth';

// Create the handler with proper App Router support
const handler = NextAuth(getAuthOptions());

// Export GET and POST handlers for App Router
export const GET = handler;
export const POST = handler;
