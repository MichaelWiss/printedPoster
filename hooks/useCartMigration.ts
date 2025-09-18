import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/stores/cart-store';

export function useCartMigration() {
  const { data: session } = useSession();
  const cartStore = useCartStore();

  useEffect(() => {
    if (session?.user?.email && !cartStore.isAuthenticated) {
      // User just logged in, trigger migration
      cartStore.validateAndMigrate(session.user.email);
    }
  }, [session?.user?.email, cartStore.isAuthenticated]);

  return {
    isMigrating: cartStore.isLoading,
    migrationError: cartStore.error,
    clearError: cartStore.clearError,
  };
}
