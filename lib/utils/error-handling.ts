import { logger } from './logger';

/**
 * Unified Error Handling Utilities
 *
 * Provides consistent error handling patterns across the application.
 * Includes error types, logging, and user-friendly error messages.
 */

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

/**
 * Handles API errors and returns a consistent error message
 */
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred';
}

/**
 * Creates a standardized API response
 */
export function createApiResponse<T>(
  data: T | null = null,
  error: string | null = null
): ApiResponse<T> {
  return {
    data,
    error,
    success: !error,
  };
}

/**
 * Logs errors with consistent formatting
 */
export function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
): void {
  const errorMessage = handleApiError(error);

  logger.error(`[${context}] Error:`, {
    message: errorMessage,
    originalError: error,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  });
}

/**
 * Handles async operations with error catching
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  context: string,
  fallback?: T
): Promise<ApiResponse<T>> {
  try {
    const data = await operation();
    return createApiResponse(data);
  } catch (error) {
    logError(context, error);
    const errorMessage = handleApiError(error);
    return createApiResponse(fallback || null, errorMessage);
  }
}

/**
 * Retry utility for failed operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}

/**
 * Error boundary error handler
 */
export function handleErrorBoundaryError(
  error: Error,
  errorInfo: { componentStack: string }
): void {
  logError('ErrorBoundary', error, {
    componentStack: errorInfo.componentStack,
  });
}

/**
 * Validation error handler
 */
export function handleValidationError(
  field: string,
  value: unknown,
  rule: string
): string {
  return `Invalid ${field}: ${rule}. Received: ${JSON.stringify(value)}`;
}

/**
 * Network error handler
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('timeout')
    );
  }
  return false;
}

/**
 * User-friendly error messages for common scenarios
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
  CART_ERROR: 'There was a problem with your cart. Please try again.',
  PRODUCT_ERROR: 'Unable to load product information. Please refresh the page.',
} as const;

/**
 * Maps error types to user-friendly messages
 */
export function getUserFriendlyMessage(error: unknown): string {
  const errorMessage = handleApiError(error).toLowerCase();

  if (isNetworkError(error)) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
    return ERROR_MESSAGES.UNAUTHORIZED;
  }

  if (errorMessage.includes('forbidden') || errorMessage.includes('403')) {
    return ERROR_MESSAGES.FORBIDDEN;
  }

  if (errorMessage.includes('not found') || errorMessage.includes('404')) {
    return ERROR_MESSAGES.NOT_FOUND;
  }

  if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
    return ERROR_MESSAGES.RATE_LIMITED;
  }

  if (errorMessage.includes('cart')) {
    return ERROR_MESSAGES.CART_ERROR;
  }

  if (errorMessage.includes('product')) {
    return ERROR_MESSAGES.PRODUCT_ERROR;
  }

  if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
    return ERROR_MESSAGES.VALIDATION_ERROR;
  }

  if (errorMessage.includes('server') || errorMessage.includes('500')) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }

  return ERROR_MESSAGES.SERVER_ERROR;
}
