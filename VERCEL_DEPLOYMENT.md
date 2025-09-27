# Vercel Deployment Guide

## Environment Variables Required

You need to set the following environment variables in your Vercel dashboard:

### Required Variables

1. **NEXTAUTH_URL**
   - Value: `https://your-app-name.vercel.app` (replace with your actual Vercel URL)
   - Description: The canonical URL of your site

2. **NEXTAUTH_SECRET**
   - Value: A random string (you can generate one with `openssl rand -base64 32`)
   - Description: Used to encrypt the NextAuth.js JWT

3. **DATABASE_URL**
   - Value: Your database connection string
   - Description: Database connection for Prisma

4. **NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN**
   - Value: `your-store.myshopify.com`
   - Description: Your Shopify store domain

5. **NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN**
   - Value: Your Shopify Storefront API access token
   - Description: Token for accessing Shopify Storefront API

### Optional Variables

6. **SHOPIFY_ADMIN_API_ACCESS_TOKEN** (optional)
   - Value: Your Shopify Admin API access token
   - Description: For admin operations (if needed)

7. **NEXT_PUBLIC_APP_URL** (optional)
   - Value: `https://your-app-name.vercel.app`
   - Description: Your app's public URL (defaults to localhost:3000)

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the correct value
5. Make sure to set them for all environments (Production, Preview, Development)

## Important Notes

- **NEXTAUTH_URL** must match your Vercel domain exactly
- **NEXTAUTH_SECRET** should be a strong, random string
- All **NEXT_PUBLIC_*** variables are exposed to the client-side
- **DATABASE_URL** should point to a production database (not SQLite)

## Database Setup

Since this project uses Prisma with SQLite locally, you'll need to set up a production database for Vercel:

### Option 1: PostgreSQL (Recommended)
- Use Vercel Postgres, PlanetScale, or Supabase
- Update your `DATABASE_URL` to point to the PostgreSQL instance

### Option 2: Keep SQLite (Not Recommended for Production)
- Use a service like Turso or Xata
- Or use Vercel's serverless functions with a file-based database

## Build Configuration

The project is already configured with:
- `prisma generate` in the build script
- `postinstall` script for Prisma generation
- Lazy-loaded configurations to avoid build-time issues

## Troubleshooting

If deployment still fails:

1. Check that all required environment variables are set
2. Verify the `NEXTAUTH_URL` matches your Vercel domain
3. Ensure your database is accessible from Vercel
4. Check the build logs for specific error messages

## Testing Locally

To test with production-like environment variables:

1. Create a `.env.production.local` file
2. Add all the required variables
3. Run `npm run build` to test the build process
