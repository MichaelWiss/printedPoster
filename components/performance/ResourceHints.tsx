/**
 * ResourceHints Component
 * 
 * Provides resource hints for better performance by preloading
 * critical resources and prefetching likely next pages.
 */

import Head from 'next/head';

interface ResourceHintsProps {
  /** Product handles to prefetch */
  productHandles?: string[];
  /** Collection handles to prefetch */
  collectionHandles?: string[];
  /** Critical images to preload */
  criticalImages?: string[];
}

export function ResourceHints({
  productHandles = [],
  collectionHandles = [],
  criticalImages = [],
}: ResourceHintsProps) {
  return (
    <Head>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//cdn.shopify.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
      
      {/* Preload critical images */}
      {criticalImages.map((image, index) => (
        <link
          key={index}
          rel="preload"
          as="image"
          href={image}
          type="image/webp"
        />
      ))}
      
      {/* Prefetch likely next pages */}
      {productHandles.map((handle) => (
        <link
          key={handle}
          rel="prefetch"
          href={`/products/${handle}`}
        />
      ))}
      
      {collectionHandles.map((handle) => (
        <link
          key={handle}
          rel="prefetch"
          href={`/collections/${handle}`}
        />
      ))}
      
      {/* Prefetch common pages */}
      <link rel="prefetch" href="/store" />
      <link rel="prefetch" href="/collections" />
    </Head>
  );
}

/**
 * Critical resource preloader for above-the-fold content
 */
export function CriticalResourcePreloader() {
  return (
    <Head>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/_next/static/media/inter-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload critical CSS */}
      <link
        rel="preload"
        href="/_next/static/css/app/layout.css"
        as="style"
      />
    </Head>
  );
}
