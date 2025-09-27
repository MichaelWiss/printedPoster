'use client';

export default function EnvTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="space-y-2">
        <p><strong>NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:</strong> {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'NOT SET'}</p>
        <p><strong>NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:</strong> {process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'SET' : 'NOT SET'}</p>
        <p><strong>NEXTAUTH_SECRET:</strong> {process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET'}</p>
        <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL || 'NOT SET'}</p>
        <p><strong>DATABASE_URL:</strong> {process.env.DATABASE_URL ? 'SET' : 'NOT SET'}</p>
      </div>
    </div>
  );
}
