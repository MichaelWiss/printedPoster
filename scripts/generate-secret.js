#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */

// Generate a secure random string for NEXTAUTH_SECRET
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('base64');
console.log('Generated NEXTAUTH_SECRET:');
console.log(secret);
console.log('\nAdd this to your Vercel environment variables as NEXTAUTH_SECRET');
