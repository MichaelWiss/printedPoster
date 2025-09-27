#!/usr/bin/env node

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Check if all required environment variables are set
const requiredVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'DATABASE_URL',
  'NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN',
  'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'
];

const optionalVars = [
  'SHOPIFY_ADMIN_API_ACCESS_TOKEN',
  'NEXT_PUBLIC_APP_URL'
];

console.log('🔍 Checking environment variables...\n');

let allRequired = true;

console.log('✅ Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✓ ${varName}: ${varName.includes('SECRET') || varName.includes('TOKEN') ? '***' : value}`);
  } else {
    console.log(`  ❌ ${varName}: NOT SET`);
    allRequired = false;
  }
});

console.log('\n📋 Optional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✓ ${varName}: ${varName.includes('SECRET') || varName.includes('TOKEN') ? '***' : value}`);
  } else {
    console.log(`  - ${varName}: not set (optional)`);
  }
});

console.log('\n' + '='.repeat(50));

if (allRequired) {
  console.log('🎉 All required environment variables are set!');
  console.log('✅ Ready for deployment');
} else {
  console.log('❌ Missing required environment variables');
  console.log('📝 Please set the missing variables in your Vercel dashboard');
  console.log('📖 See VERCEL_DEPLOYMENT.md for instructions');
  process.exit(1);
}
