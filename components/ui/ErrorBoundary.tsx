/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 */

'use client';

import { Component, type ReactNode } from 'react';

import { ErrorMessage } from './ErrorMessage';
import {
  handleErrorBoundaryError,
  getUserFriendlyMessage,
} from '@/lib/utils/error-handling';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    // Log the error
    handleErrorBoundaryError(error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className='p-4'>
          <ErrorMessage
            message={getUserFriendlyMessage(this.state.error)}
            type='error'
            onDismiss={() => this.setState({ hasError: false, error: null })}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

/**
 * Specialized error boundaries for different contexts.
 * All share the same structure; only the fallback message differs.
 */
const contextMessages: Record<string, string> = {
  product: 'Unable to load product information. Please refresh the page.',
  cart: 'There was a problem with your cart. Please try again.',
  collection: 'Unable to load collection. Please try again later.',
};

export function ContextErrorBoundary({
  context,
  children,
}: {
  context: keyof typeof contextMessages;
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className='p-4 text-center'>
          <ErrorMessage
            message={contextMessages[context]}
            type='error'
          />
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Backwards-compatible aliases
export function ProductErrorBoundary({ children }: { children: ReactNode }) {
  return <ContextErrorBoundary context='product'>{children}</ContextErrorBoundary>;
}

export function CartErrorBoundary({ children }: { children: ReactNode }) {
  return <ContextErrorBoundary context='cart'>{children}</ContextErrorBoundary>;
}

export function CollectionErrorBoundary({ children }: { children: ReactNode }) {
  return <ContextErrorBoundary context='collection'>{children}</ContextErrorBoundary>;
}
