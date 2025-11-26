import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { motionSafe } from '../utils/motion';

/**
 * PUBLIC_INTERFACE
 * HeaderCartButton shows cart icon with item count and accessible label.
 */
export default function HeaderCartButton() {
  const { itemCount } = useCart();
  const label = `Open cart${itemCount ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`;

  return (
    <Link
      to="/cart"
      aria-label={label}
      title={label}
      className={[
        'relative inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-text',
        'border-black/10 dark:border-white/20 hover:bg-surface/80 focus-ring-primary',
        motionSafe('transition-colors')
      ].join(' ')}
    >
      <CartIcon />
      <span className="hidden sm:inline">Cart</span>
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-accent px-1 text-xs font-bold text-accentForeground shadow-soft"
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}

function CartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>Cart</title>
      <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A1.996 1.996 0 008 18h10v-2H8.42a.25.25 0 01-.22-.37L9 14h7.55a2 2 0 001.79-1.11l3.58-6.49A1 1 0 0021 5H7zM7 20a2 2 0 104.001.001A2 2 0 007 20zm8 0a2 2 0 104.001.001A2 2 0 0015 20z" />
    </svg>
  );
}
