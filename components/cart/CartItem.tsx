'use client';

import { LoadingButton } from '@/components/ui/LoadingButton';
import {
  useCartItem,
  useCartActions,
  useCartLoading,
} from '@/stores/cart-store';

interface CartItemProps {
  id: string;
}

export function CartItem({ id }: CartItemProps) {
  const item = useCartItem(id);
  const { updateQuantity, removeItem } = useCartActions();
  const isLoading = useCartLoading();

  if (!item) return null;

  const pending = !!item.pendingSync;

  const handleUpdate = async (qty: number) => {
    if (qty < 1) return;
    await updateQuantity(item.id, qty);
  };

  const handleRemove = async () => {
    await removeItem(item.id);
  };

  return (
    <div
      className='flex items-center justify-between p-3 border border-border-gray rounded-lg'
      aria-busy={isLoading || pending}
    >
      <div className='flex-1 min-w-0'>
        <p className='font-medium text-deep-charcoal text-sm truncate'>
          {item.product.title}
        </p>
        <p className='text-xs text-warm-gray mt-1' aria-live='polite'>
          Qty: {item.quantity}
        </p>
        {item.product.priceRange?.minVariantPrice && (
          <p className='text-sm font-semibold text-terracotta mt-1'>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency:
                item.product.priceRange.minVariantPrice.currencyCode || 'USD',
            }).format(
              parseFloat(item.product.priceRange.minVariantPrice.amount) *
                item.quantity
            )}
          </p>
        )}
      </div>

      <div className='flex items-center gap-2 ml-3'>
        {/* Quantity Controls */}
        <div className='flex items-center gap-1'>
          <LoadingButton
            onClick={() => handleUpdate(item.quantity - 1)}
            disabled={item.quantity <= 1 || isLoading || pending}
            className='w-8 h-8 flex items-center justify-center border border-border-gray rounded text-sm hover:bg-light-gray transition-colors'
            loading={isLoading || pending}
            loadingText=''
            spinnerSize='xs'
          >
            -
          </LoadingButton>

          <span className='w-8 text-center text-sm font-medium'>
            {item.quantity}
          </span>

          <LoadingButton
            onClick={() => handleUpdate(item.quantity + 1)}
            disabled={isLoading || pending}
            className='w-8 h-8 flex items-center justify-center border border-border-gray rounded text-sm hover:bg-light-gray transition-colors'
            loading={isLoading || pending}
            loadingText=''
            spinnerSize='xs'
          >
            +
          </LoadingButton>
        </div>

        {/* Remove Button */}
        <LoadingButton
          onClick={handleRemove}
          disabled={isLoading || pending}
          className='text-xs text-red-600 hover:text-red-800 underline disabled:opacity-50'
          loading={isLoading || pending}
          loadingText='Removing...'
          spinnerSize='xs'
        >
          Remove
        </LoadingButton>
      </div>
    </div>
  );
}

export default CartItem;
