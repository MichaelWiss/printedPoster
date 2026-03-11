import { checkRateLimit } from '../rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    // Each test uses a unique key to avoid cross-test pollution
  });

  it('allows requests within the limit', () => {
    const key = 'test-allow';
    const config = { limit: 3, windowSeconds: 60 };

    const r1 = checkRateLimit(key, config);
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = checkRateLimit(key, config);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);

    const r3 = checkRateLimit(key, config);
    expect(r3.allowed).toBe(true);
    expect(r3.remaining).toBe(0);
  });

  it('blocks requests exceeding the limit', () => {
    const key = 'test-block';
    const config = { limit: 2, windowSeconds: 60 };

    checkRateLimit(key, config);
    checkRateLimit(key, config);

    const r3 = checkRateLimit(key, config);
    expect(r3.allowed).toBe(false);
    expect(r3.remaining).toBe(0);
  });

  it('resets after the window expires', () => {
    const key = 'test-reset';
    const config = { limit: 1, windowSeconds: 1 };

    const r1 = checkRateLimit(key, config);
    expect(r1.allowed).toBe(true);

    const r2 = checkRateLimit(key, config);
    expect(r2.allowed).toBe(false);

    // Simulate window expiry by advancing time
    jest.useFakeTimers();
    jest.advanceTimersByTime(1100);

    const r3 = checkRateLimit(key, config);
    expect(r3.allowed).toBe(true);

    jest.useRealTimers();
  });

  it('tracks different keys independently', () => {
    const config = { limit: 1, windowSeconds: 60 };

    const r1 = checkRateLimit('key-a', config);
    expect(r1.allowed).toBe(true);

    const r2 = checkRateLimit('key-b', config);
    expect(r2.allowed).toBe(true);

    const r3 = checkRateLimit('key-a', config);
    expect(r3.allowed).toBe(false);

    const r4 = checkRateLimit('key-b', config);
    expect(r4.allowed).toBe(false);
  });

  it('returns correct resetAt timestamp', () => {
    const key = 'test-reset-at';
    const config = { limit: 5, windowSeconds: 30 };
    const before = Date.now();

    const result = checkRateLimit(key, config);

    expect(result.resetAt).toBeGreaterThanOrEqual(before + 30_000);
    expect(result.resetAt).toBeLessThanOrEqual(Date.now() + 30_000);
  });
});
