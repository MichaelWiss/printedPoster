// Mock ESM dependencies before import to avoid SyntaxError
jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(() => ({})),
}));
jest.mock('next-auth/providers/credentials', () => ({
  __esModule: true,
  default: jest.fn(() => ({ id: 'credentials', name: 'credentials' })),
}));
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('$2a$12$hashedpassword'),
  compare: jest.fn(),
}));
jest.mock('../db/prisma', () => ({
  getPrismaClient: jest.fn(),
}));
jest.mock('../config', () => ({
  getConfig: () => ({
    nextAuth: { secret: 'test-secret', url: 'http://localhost:3000' },
  }),
}));

import { validatePassword, hashPassword } from '../auth';

describe('validatePassword', () => {
  it('rejects passwords shorter than 8 characters', () => {
    const result = validatePassword('short');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/at least 8/);
  });

  it('rejects passwords longer than 128 characters', () => {
    const result = validatePassword('a'.repeat(129));
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/at most 128/);
  });

  it('accepts valid passwords', () => {
    expect(validatePassword('securePassword123').valid).toBe(true);
    expect(validatePassword('a'.repeat(8)).valid).toBe(true);
    expect(validatePassword('a'.repeat(128)).valid).toBe(true);
  });

  it('returns no error for valid passwords', () => {
    const result = validatePassword('validPassword1');
    expect(result.error).toBeUndefined();
  });
});

describe('hashPassword', () => {
  it('hashes a valid password', async () => {
    const hash = await hashPassword('validPass123');
    expect(hash).toBe('$2a$12$hashedpassword');
  });

  it('rejects an invalid password', async () => {
    await expect(hashPassword('short')).rejects.toThrow(/at least 8/);
  });
});
