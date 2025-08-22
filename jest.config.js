// Jest configuration for this Next.js + TypeScript project
// ---------------------------------------------------------
// This file uses `next/jest` to create a Jest config that understands Next.js
// features (like module aliasing and Next's runtime transforms). Below each
// option includes a short comment describing why it's important for this repo.

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/consistent-type-imports */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path to the Next.js app — this lets next/jest load next.config.js and any
  // environment variables defined for Next so tests run in a similar environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Use the V8 coverage provider (fast and accurate in Node 14+)
  coverageProvider: 'v8',

  // Use a browser-like environment since many parts of the app expect DOM APIs
  testEnvironment: 'jsdom',

  // Run this file after the test framework has been installed in the environment.
  // Typical uses: extend expect(), configure testing-library, global mocks.
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],

  // Where to look for tests and modules. Keeping root to the project avoids
  // accidentally traversing parent folders during test discovery.
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>'],

  // Map TypeScript/Next alias `@/` to the repository root so imports work in tests
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Patterns used to find test files.
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.[jt]s?(x)',
    '<rootDir>/**/*.test.[jt]s?(x)',
  ],

  // Use swc for fast TypeScript/JSX transformation in tests
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },

  // Some packages ship modern JS that needs to be transformed by Jest. We
  // explicitly allowlist `graphql-request` and `cross-fetch` so they are
  // transformed by our toolchain instead of being ignored.
  transformIgnorePatterns: [
    '/node_modules/(?!graphql-request|cross-fetch)/'
  ],

  // File extensions Jest will look at when resolving modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

// Export using the createJestConfig wrapper so next/jest can asynchronously
// read Next.js configuration. This keeps the runtime and test behavior aligned.
module.exports = createJestConfig(customJestConfig)

/* How Jest runs tests in this project (brief)

- Startup: Jest reads this config (built with `next/jest`) and prepares a test
  environment matching a browser (`jsdom`). `setupFilesAfterEnv` runs after
  the environment is ready to allow test setup (e.g. extend expect, install
  DOM matchers, and create global mocks).

- Module resolution: `moduleNameMapper` and `moduleDirectories` make imports
  like `@/lib/foo` resolve correctly to the project root during tests.

- Transforms: `@swc/jest` compiles TypeScript/JSX. `transformIgnorePatterns`
  ensures certain node_modules are transformed (useful for ESM packages).

- Test discovery: `testMatch` locates files matching `*.test.ts`, `*.test.tsx`,
  and so on under the project roots.

- Mocking notes: Jest hoists `jest.mock()` calls to the top of the module.
  This can cause ReferenceError/TDZ issues if you try to reference variables
  that are declared later in the file from inside a mock factory. If you run
  into that, either declare the mock helper before the `jest.mock` call or
  expose the internal mock via the mocked module (as we do in tests).

*/
