// Script to create metafield definitions via Shopify Admin API
// Run this once to set up all metafields programmatically

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN; // your-store.myshopify.com
const ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

const metafieldDefinitions = [
  {
    name: "Product Type",
    description: "Distinguishes between mass-produced and one-of-a-kind products",
    namespace: "custom",
    key: "product_type",
    type: "single_line_text_field",
    owner_type: "PRODUCT",
    validations: [
      {
        name: "choices",
        value: JSON.stringify(["mass_produced", "one_of_a_kind"])
      }
    ],
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    name: "Artist Name", 
    description: "Name of the artist for one-of-a-kind pieces",
    namespace: "custom",
    key: "artist_name",
    type: "single_line_text_field",
    owner_type: "PRODUCT",
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    name: "Authenticity Certificate",
    description: "Whether the item includes an authenticity certificate", 
    namespace: "custom",
    key: "authenticity_certificate",
    type: "boolean",
    owner_type: "PRODUCT",
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    name: "Creation Date",
    description: "Year the artwork was created",
    namespace: "custom", 
    key: "creation_date",
    type: "single_line_text_field",
    owner_type: "PRODUCT",
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    name: "Edition Info",
    description: "Edition information (e.g., 'Original 1/1', 'Limited Edition 5/100')",
    namespace: "custom",
    key: "edition_info", 
    type: "single_line_text_field",
    owner_type: "PRODUCT",
    access: {
      storefront: "PUBLIC_READ"
    }
  }
];

async function createMetafieldDefinitions() {
  const url = `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`;
  
  for (const definition of metafieldDefinitions) {
    const mutation = `
      mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition {
            id
            name
            namespace
            key
            type {
              name
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            definition: definition
          }
        })
      });
      
      const result = await response.json();
      
      if (result.data?.metafieldDefinitionCreate?.createdDefinition) {
        console.log(`✅ Created: ${definition.name}`);
      } else {
        console.log(`❌ Failed to create ${definition.name}:`, 
          result.data?.metafieldDefinitionCreate?.userErrors || result.errors);
      }
    } catch (error) {
      console.error(`❌ Error creating ${definition.name}:`, error);
    }
  }
}

// Usage instructions
console.log(`
🚀 Metafield Setup Script

Before running this script:
1. Get your Admin API access token from Shopify Partners/Apps
2. Set environment variables:
   export SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
   export SHOPIFY_ADMIN_ACCESS_TOKEN="your-admin-token"
3. Run: node scripts/setup-metafields.js

This will create all product metafields needed for the product type system.
`);

if (SHOPIFY_DOMAIN && ADMIN_ACCESS_TOKEN) {
  createMetafieldDefinitions();
} else {
  console.log("❌ Missing environment variables. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN");
}