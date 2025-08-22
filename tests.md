# Tests — Quick Guide

This file explains how to run and write tests for this Next.js + TypeScript project.

## Where tests live

- Test files live next to code or under `__tests__` folders.
- This project finds tests matching:
  - `**/__tests__/**/*.test.[jt]s?(x)`
  - `**/*.test.[jt]s?(x)`

Follow the existing project structure and naming conventions.

## Running tests

From the project root:

```bash
cd /Volumes/Code/Code/Shopify/Headless/printedPoster
npm test
```

The `jest.config.js` is set up with `next/jest`, `@swc/jest` transforms, and a `jsdom` environment.

## Test setup

- Use `jest.setup.ts` (configured via `setupFilesAfterEnv`) to register custom matchers or global test helpers.
- Keep tests isolated and reset mocks between tests (use `mockReset()` / `mockClear()` appropriately).

## Common patterns in this repo

1) Mocking `graphql-request` (Shopify client)

- Many tests avoid network calls by mocking `graphql-request` with Jest.
- Important: `jest.mock()` calls are hoisted by Jest. Do not reference variables that are declared after `jest.mock()` inside the factory — that can cause ReferenceError/TDZ.
- Safe patterns:
  - Declare helpers before `jest.mock()`.
  - Or expose the internal mock from the mocked module and access it with `jest.requireMock('graphql-request')` in tests.

Example pattern (simplified):

```ts
// At top of test file
jest.mock('graphql-request', () => {
  const rm = jest.fn()
  return {
    GraphQLClient: jest.fn().mockImplementation(() => ({ request: rm })),
    __requestMock: rm, // expose for the test to access
  }
})

// In tests
const mod = jest.requireMock('graphql-request') as any
const requestMock = mod.__requestMock as jest.Mock
requestMock.mockResolvedValue({ /* ... */ })
```

2) Verifying constructor calls

- If your module constructs a `GraphQLClient` at import-time (like the storefront client), that constructor call happens when the module is imported.
- Avoid clearing the constructor mock before checking it. If you need to reset only the request mock, use `mockReset()` on the request function and avoid `jest.clearAllMocks()` which also clears constructor calls.

## Writing good tests

- Arrange/Act/Assert: keep tests small and focused.
- Use typed fixtures (TypeScript interfaces) to keep example responses consistent.
- Test error paths by using `mockRejectedValueOnce` on the request mock.
- For DOM tests, use `@testing-library/react` helpers registered in `jest/setup.ts`.

## Troubleshooting common errors

- ReferenceError: Cannot access 'x' before initialization
  - Usually from referencing a locally-declared variable inside a `jest.mock` factory. Move the variable declaration above `jest.mock` or expose mocks from the mocked module.

- ESM / transform issues for node_modules
  - If you see syntax errors from modern packages, add them to the allowlist in `transformIgnorePatterns` in `jest.config.js`.

## Further reading
- Jest docs: https://jestjs.io
- next/jest docs: https://nextjs.org/docs/testing


Happy testing — if you want, I can add a starter test template or update `jest/setup.ts` with helpers for mocking the Shopify client.
