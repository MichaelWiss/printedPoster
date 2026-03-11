# Printed Poster — Headless Shopify Storefront

A high-performance headless e-commerce storefront for art prints and posters, built with **Next.js 15**, **React 18**, and **Shopify Storefront API**.

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Next.js App Router (Server & Client Components)│
│  ┌───────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Server    │  │ Client   │  │ API Routes   │  │
│  │ Components│  │ Islands  │  │ /api/cart/*   │  │
│  │ (SSR/ISR) │  │ (Zustand)│  │ /api/products│  │
│  └─────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│        │              │               │          │
│  ┌─────▼──────────────▼───────────────▼───────┐  │
│  │         Middleware (Auth + Rate Limiting)   │  │
│  └─────┬──────────────────────────────┬───────┘  │
│        │                              │          │
│  ┌─────▼──────────┐          ┌───────▼────────┐  │
│  │ Shopify        │          │ Prisma + SQLite │  │
│  │ Storefront API │          │ (Cart, Auth)    │  │
│  └────────────────┘          └────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 18, Tailwind CSS, custom design tokens |
| State | Zustand (cart store with persistence) |
| API | Shopify Storefront API (GraphQL) |
| Auth | NextAuth v4 (JWT + Credentials) |
| Database | Prisma ORM + SQLite (production-ready for PostgreSQL) |
| Validation | Zod (API input schemas) |
| Security | Rate limiting, CSRF protection, CSP, account lockout |

## Key Features

- **Server-first rendering** — Products, collections, and pages are server-rendered with ISR (5-min revalidation)
- **Hybrid cart** — Guest carts in localStorage, authenticated carts in the database with cross-device sync
- **Authentication** — bcrypt password hashing, JWT sessions, account lockout after 5 failed attempts
- **Security hardened** — Rate limiting on all API routes, CSRF origin validation, Content-Security-Policy, secure cookie config
- **Performance** — Code-split product details, lazy-loaded filters, optimized image loading (AVIF/WebP), Turbopack dev server
- **Type-safe** — Full TypeScript coverage, Zod validation on all API inputs

## Getting Started

```bash
# 1. Clone and install
git clone https://github.com/MichaelWiss/printedPoster.git
cd printedPoster
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in your Shopify store domain, Storefront API token, and NextAuth secret

# 3. Initialize database
npx prisma db push

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [.env.example](.env.example) for all required variables. Key ones:

| Variable | Description |
|----------|------------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your `*.myshopify.com` domain |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API token (public, read-only) |
| `NEXTAUTH_SECRET` | Random secret for JWT signing (`npm run generate-secret`) |
| `DATABASE_URL` | Prisma connection string (`file:./dev.sqlite` for local) |

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run type-check   # TypeScript --noEmit
npm run lint         # ESLint
npm run test         # Jest
npm run quality      # type-check + lint + format check
```

## Project Structure

```
app/
  page.tsx              # Homepage (hero + featured products)
  (shop)/
    products/[handle]/  # Product detail pages
    collections/[handle]/ # Collection pages with filters
    cart/               # Cart page
  api/
    cart/               # Cart CRUD (authenticated)
    products/           # Product listing (cached)
    auth/               # NextAuth endpoints
components/
  hero/                 # Hero slider (server + client)
  product/              # Product cards, grids, details
  collections/          # Filters, sort, controls
  cart/                 # Cart drawer, counter, items
  ui/                   # Error boundaries, shared UI
lib/
  shopify/              # GraphQL client + queries
  services/             # Cart service, sync service
  auth.ts               # NextAuth config + password utils
  utils/                # Error handling, rate limiting
stores/
  cart-store.ts         # Zustand cart (localStorage + server sync)
prisma/
  schema.prisma         # User, Cart, CartItem, Session models
```
