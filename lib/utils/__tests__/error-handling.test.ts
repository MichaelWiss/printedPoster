import {
  handleApiError,
  createApiResponse,
  handleValidationError,
  getUserFriendlyMessage,
  ERROR_MESSAGES,
} from '../error-handling';

describe('handleApiError', () => {
  it('extracts message from Error instance', () => {
    expect(handleApiError(new Error('test error'))).toBe('test error');
  });

  it('returns string errors as-is', () => {
    expect(handleApiError('string error')).toBe('string error');
  });

  it('extracts message from object with message property', () => {
    expect(handleApiError({ message: 'obj error' })).toBe('obj error');
  });

  it('returns generic message for unknown types', () => {
    expect(handleApiError(42)).toBe('An unexpected error occurred');
    expect(handleApiError(null)).toBe('An unexpected error occurred');
  });
});

describe('createApiResponse', () => {
  it('creates success response', () => {
    const response = createApiResponse({ id: 1 });
    expect(response.success).toBe(true);
    expect(response.data).toEqual({ id: 1 });
    expect(response.error).toBeNull();
  });

  it('creates error response', () => {
    const response = createApiResponse(null, 'Something failed');
    expect(response.success).toBe(false);
    expect(response.data).toBeNull();
    expect(response.error).toBe('Something failed');
  });
});

describe('handleValidationError', () => {
  it('returns error message without raw value', () => {
    const result = handleValidationError('email', 'not-an-email', 'must be a valid email');
    expect(result).toBe('Invalid email: must be a valid email.');
    expect(result).not.toContain('not-an-email');
  });
});

describe('getUserFriendlyMessage', () => {
  it('maps network errors', () => {
    expect(getUserFriendlyMessage(new Error('fetch failed'))).toBe(
      ERROR_MESSAGES.NETWORK_ERROR
    );
  });

  it('maps 401 errors', () => {
    expect(getUserFriendlyMessage(new Error('401 unauthorized'))).toBe(
      ERROR_MESSAGES.UNAUTHORIZED
    );
  });

  it('maps 403 errors', () => {
    expect(getUserFriendlyMessage(new Error('403 Forbidden'))).toBe(
      ERROR_MESSAGES.FORBIDDEN
    );
  });

  it('maps 404 errors', () => {
    expect(getUserFriendlyMessage(new Error('not found 404'))).toBe(
      ERROR_MESSAGES.NOT_FOUND
    );
  });
});
