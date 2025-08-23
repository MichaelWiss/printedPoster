export async function shopifyFetch({ query, variables }: { query: string; variables?: Record<string, unknown> }) {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  const { data, errors } = await response.json();
  if (errors) throw new Error('Shopify API error: ' + JSON.stringify(errors));
  return data;
}