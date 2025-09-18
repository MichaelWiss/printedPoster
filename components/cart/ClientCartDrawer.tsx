'use client';

import dynamic from 'next/dynamic';

const CartDrawer = dynamic(
  () => import('./CartDrawer').then(mod => mod.CartDrawer),
  { ssr: false }
);

export function ClientCartDrawer() {
  return <CartDrawer />;
}
