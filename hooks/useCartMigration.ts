import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/stores/cart-store';

export function useCartMigration() {
  const { data: session } = useSession();
  const isAuthenticated = useCartStore(state => state.isAuthenticated);
  const validateAndMigrate = useCartStore(state => state.validateAndMigrate);
  const isLoading = useCartStore(state => state.isLoading);
  const error = useCartStore(state => state.error);
  const clearError = useCartStore(state => state.clearError);

  useEffect(() => {
    if (session?.user?.email && !isAuthenticated) {
      // User just logged in, trigger migration
      validateAndMigrate(session.user.email);
    }
  }, [session?.user?.email, isAuthenticated, validateAndMigrate]);

  return {
    isMigrating: isLoading,
    migrationError: error,
    clearError,
  };
}
