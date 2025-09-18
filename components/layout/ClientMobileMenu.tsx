'use client';

import dynamic from 'next/dynamic';

// Dynamically import the MobileMenu on the client only
const MobileMenu = dynamic(
  () => import('./MobileMenu').then(mod => mod.MobileMenu),
  { ssr: false }
);

export function ClientMobileMenu() {
  return <MobileMenu />;
}
