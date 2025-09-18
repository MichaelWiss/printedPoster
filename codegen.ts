import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    [`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`]:
      {
        headers: {
          'X-Shopify-Storefront-Access-Token':
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
        },
      },
  },
  documents: ['lib/shopify/**/*.graphql'],
  generates: {
    './lib/shopify/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
