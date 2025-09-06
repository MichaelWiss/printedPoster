import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { CartSyncProvider } from '@/components/providers/CartSyncProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'], // Reduced from 5 weights to 3 for faster loading
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600'], // Reduced from 4 weights to 2 for faster loading
  display: 'swap',
  preload: false, // Disable preload for secondary font to improve initial page load
  style: ['normal'], // Removed italic for faster loading
})

export const metadata: Metadata = {
  title: "Printed Poster Gallery",
  description: "Curated collection of artistic prints and posters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased bg-cream-base text-deep-charcoal`}>
        <AuthProvider>
          <CartSyncProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartSyncProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
