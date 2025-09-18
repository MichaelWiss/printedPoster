import React, { memo } from 'react';

import {
  useCartItems,
  useCartActions,
  useCartLoading,
  useCartError,
} from '@/stores/cart-store';

import { LoadingButton } from '@/components/ui/LoadingButton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { buttonUtils, textUtils } from '@/lib/design-tokens/component-utils';

import { SyncStatus } from './SyncStatus';
import { CartItem as CartItemRow } from './CartItem';

export const CartDrawer = memo(function CartDrawer() {
  const items = useCartItems();
  const { clear, clearError } = useCartActions();
  const isLoading = useCartLoading();
  const error = useCartError();

  const handleClearCart = async () => {
    try {
      await clear();
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <aside className='fixed right-0 top-0 h-full w-80 bg-cream-base shadow-medium p-4 overflow-y-auto'>
      {/* Global loading indicator */}
      {isLoading && (
        <div className='absolute left-0 top-0 h-1 w-full'>
          <div className='h-full w-full bg-sage-green animate-pulse' />
        </div>
      )}
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-hierarchy-h3'>Your cart</h3>
        <div className='text-right'>
          <SyncStatus />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='mb-4'>
          <ErrorMessage message={error} onDismiss={clearError} />
        </div>
      )}

      <div className='mt-4 space-y-4'>
        {items.length === 0 ? (
          <p className='text-body-small'>Cart is empty</p>
        ) : (
          items.map(item => <CartItemRow key={item.id} id={item.id} />)
        )}
      </div>

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className='mt-6 pt-4 border-t border-border-gray'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-body font-semibold'>Total:</span>
            <span className='text-price text-terracotta'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(
                items.reduce((total, item) => {
                  const price =
                    item.product.priceRange?.minVariantPrice?.amount;
                  return (
                    total + (price ? parseFloat(price) * item.quantity : 0)
                  );
                }, 0)
              )}
            </span>
          </div>

          <LoadingButton
            onClick={handleClearCart}
            disabled={isLoading}
            className='w-full btn-secondary'
            loading={isLoading}
            loadingText='Clearing cart...'
          >
            Clear cart
          </LoadingButton>
        </div>
      )}
    </aside>
  );
});
