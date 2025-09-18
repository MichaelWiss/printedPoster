import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Card Demo - Printed Poster',
  description:
    'Demo showcasing the standard product card with View Details and Add to Cart functionality.',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
