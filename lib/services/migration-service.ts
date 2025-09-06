import { prisma } from '../db/prisma'
import { cartService } from './cart-service'
import type { CartLineItem } from '@/stores/cart-store'

export class MigrationService {
  // Check if user already has a migrated cart
  async hasMigratedCart(userId: string): Promise<boolean> {
    const cart = await prisma.cart.findFirst({
      where: { userId, isActive: true }
    })
    return !!cart
  }

  // Migrate localStorage cart to Prisma
  async migrateLocalStorageCart(userId: string, localItems: CartLineItem[]): Promise<void> {
    try {
      // Check if already migrated
      if (await this.hasMigratedCart(userId)) {
        console.log('Cart already migrated for user:', userId)
        return
      }

      if (localItems.length === 0) {
        console.log('No local items to migrate for user:', userId)
        return
      }

      // Convert local items to server format
      const serverItems = localItems.map(item => ({
        productId: item.product.id,
        variantId: item.product.variants?.edges[0]?.node.id || item.product.id,
        title: item.product.title,
        handle: item.product.handle,
        price: parseFloat(item.product.priceRange?.minVariantPrice?.amount || '0'),
        imageUrl: item.product.images?.edges[0]?.node.url,
        quantity: item.quantity
      }))

      // Create server cart
      await cartService.createUserCart(userId, serverItems)

      console.log(`Successfully migrated ${localItems.length} items for user:`, userId)
    } catch (error) {
      console.error('Failed to migrate localStorage cart:', error)
      throw new Error('Cart migration failed')
    }
  }

  // Validate localStorage data integrity
  validateLocalStorageData(items: unknown[]): boolean {
    if (!Array.isArray(items)) return false

    return items.every(item =>
      item &&
      typeof item === 'object' &&
      item.id &&
      item.product &&
      typeof item.product === 'object' &&
      item.product.id &&
      item.product.title &&
      typeof item.quantity === 'number' &&
      item.quantity > 0
    )
  }

  // Backup localStorage before migration
  backupLocalStorage(): string | null {
    try {
      const cartData = localStorage.getItem('cart-storage')
      if (cartData) {
        const backupKey = `cart-backup-${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem(backupKey, cartData)
        return backupKey
      }
      return null
    } catch (error) {
      console.error('Failed to backup localStorage:', error)
      return null
    }
  }

  // Restore from backup if migration fails
  async restoreFromBackup(backupKey: string): Promise<boolean> {
    try {
      const backupData = localStorage.getItem(backupKey)
      if (backupData) {
        localStorage.setItem('cart-storage', backupData)
        localStorage.removeItem(backupKey)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to restore from backup:', error)
      return false
    }
  }
}

export const migrationService = new MigrationService()
