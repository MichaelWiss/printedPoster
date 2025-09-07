# Shopify Next.js Speed Optimization Checklist

## Shopify API
- [ ] Cache product and collection queries (SWR, React Query, or server-side cache)
- [ ] Use incremental static regeneration (ISR) for product/collection pages
- [ ] Limit GraphQL queries to only needed fields per page/component
- [ ] Paginate or limit cart line items (avoid `lines(first: 100)` if not needed)
- [ ] Add error handling and retry logic for Shopify API calls

## Database
- [ ] Add indexes to frequently queried fields in Prisma schema
- [ ] Profile slow queries and optimize as needed

## Tailwind & CSS
- [ ] Remove unused legacy color variables from `tailwind.config.cjs`
- [ ] Remove unused custom utility classes
- [ ] Ensure Tailwind's `content` config covers all code folders for purging
- [ ] Minify CSS bundle and inspect for unused classes
- [ ] Use CSS modules or `@apply` for repeated custom styles

## Frontend & Assets
- [ ] Use Next.js `<Image />` for all images
- [ ] Remove unused SVGs and images from `public/`
- [ ] Use `next build --analyze` to find and split large dependencies/components

## General
- [ ] Use `Promise.all` for parallel async calls in API routes
- [ ] Avoid blocking operations in API/server code
- [ ] Profile server and bundle for bottlenecks

---

Check off each item as you optimize. Prioritize caching, bundle size, and API/database efficiency for the biggest speed gains.
