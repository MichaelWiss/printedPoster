'use client';

import { useState, useEffect } from 'react';

/**
 * Hook that returns true after client-side hydration is complete.
 * Use this to prevent hydration mismatches for client-only UI.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
