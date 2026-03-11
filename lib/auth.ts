import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getPrismaClient } from './db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getConfig } from './config';
import bcryptjs from 'bcryptjs';

// Lazy-load auth options to avoid build-time database connection issues
export function getAuthOptions(): NextAuthOptions {
  return {
    adapter: PrismaAdapter(getPrismaClient()),
    secret: getConfig().nextAuth.secret,
    ...(getConfig().nextAuth.url && { url: getConfig().nextAuth.url }),
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Password strength check
          if (credentials.password.length < 8 || credentials.password.length > 128) {
            return null;
          }

          const prisma = getPrismaClient();
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.passwordHash) {
            return null;
          }

          // Account lockout check
          if (user.lockedUntil && user.lockedUntil > new Date()) {
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isPasswordValid) {
            // Increment failed attempts; lock after 5 failures for 15 minutes
            const attempts = user.failedLoginAttempts + 1;
            await prisma.user.update({
              where: { id: user.id },
              data: {
                failedLoginAttempts: attempts,
                ...(attempts >= 5 && {
                  lockedUntil: new Date(Date.now() + 15 * 60 * 1000),
                }),
              },
            });
            return null;
          }

          // Reset failed attempts on successful login
          if (user.failedLoginAttempts > 0) {
            await prisma.user.update({
              where: { id: user.id },
              data: { failedLoginAttempts: 0, lockedUntil: null },
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        },
      }),
    ],
    session: {
      strategy: 'jwt',
      maxAge: 24 * 60 * 60, // 24 hours
      updateAge: 60 * 60, // Refresh token every hour
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
    pages: {
      signIn: '/auth/signin',
      newUser: '/auth/signup',
    },
    cookies: {
      sessionToken: {
        name: process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
        options: {
          httpOnly: true,
          sameSite: 'lax' as const,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        },
      },
    },
  };
}

// Validate password meets minimum strength requirements
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) return { valid: false, error: 'Password must be at least 8 characters' };
  if (password.length > 128) return { valid: false, error: 'Password must be at most 128 characters' };
  return { valid: true };
}

// Hash a password for user registration
export async function hashPassword(password: string): Promise<string> {
  const { valid, error } = validatePassword(password);
  if (!valid) throw new Error(error);
  return bcryptjs.hash(password, 12);
}

// Note: Do not export authOptions at module level to avoid build-time issues
// Use getAuthOptions() in API routes instead
