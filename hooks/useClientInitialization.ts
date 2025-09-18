import { useEffect } from 'react';
import { useCartActions } from '@/stores/cart-store';

export function useClientInitialization() {
  const { initializeClient } = useCartActions();

  useEffect(() => {
    // Initialize client-side data after hydration
    initializeClient();
  }, [initializeClient]);
}
