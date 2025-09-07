#!/bin/bash
# Clean up unused files for production deployment
# Run this script from the project root

# Remove markdown documentation
rm -f Headless/printedPoster/*.md

# Remove demo and mockup HTML files
rm -f add-to-cart-demo*.html
rm -f add-to-cart-sizes.html
rm -f Headless/printedPoster/VISUAL_MOCKUP.html
rm -f Headless/printedPoster/COLLECTION_PAGE_EXAMPLE.html

# Remove test files
rm -rf Headless/printedPoster/lib/shopify/__tests__

# Remove TypeScript build info
rm -f Headless/printedPoster/tsconfig.tsbuildinfo

# Remove macOS system files
find . -name '.DS_Store' -delete

# Remove unused SVGs (edit this list if some are needed)
rm -f Headless/printedPoster/public/file.svg
rm -f Headless/printedPoster/public/globe.svg
rm -f Headless/printedPoster/public/next.svg
rm -f Headless/printedPoster/public/vercel.svg
rm -f Headless/printedPoster/public/window.svg

echo "Cleanup complete. Review changes before deploying."
