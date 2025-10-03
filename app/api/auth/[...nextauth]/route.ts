import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth';

// Export the NextAuth handler directly so the App Router provides context correctly
const handler = NextAuth(getAuthOptions());

export { handler as GET, handler as POST };
