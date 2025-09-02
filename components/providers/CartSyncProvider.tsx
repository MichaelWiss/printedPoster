'use client'

import { ReactNode } from 'react'
import { useCartSync } from '@/hooks/useCartSync'
import { useCartMigration } from '@/hooks/useCartMigration'
import { useClientInitialization } from '@/hooks/useClientInitialization'

interface CartSyncProviderProps {
  children: ReactNode
}

export function CartSyncProvider({ children }: CartSyncProviderProps) {
  // Initialize client-side data after hydration
  useClientInitialization()

  // Initialize cart sync
  useCartSync()

  // Initialize cart migration
  useCartMigration()

  return <>{children}</>
}
