import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import QuantityInput from '../components/QuantityInput';

/**
 * PUBLIC_INTERFACE
 * Cart shows cart items with quantity controls, remove and subtotal.
 */
export default function Cart() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-text">Your Cart</h1>

      {!items.length ? (
        <div className="mt-8 rounded-xl border border-black/10 dark:border-white/10 bg-surface p-6 text-center">
          <p className="text-text">Your cart is empty.</p>
          <Link to="/" className="mt-3 inline-block text-primary hover:underline focus-ring-primary rounded">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ id, qty, product, lineTotal }) => (
              <div
                key={id}
                className="flex gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-surface p-4"
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-20 w-28 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text">{product.name}</p>
                  <p className="mt-1 text-xs text-textMuted">${product.price.toFixed(2)} each</p>
                  <div className="mt-3 flex items-center gap-3">
                    <QuantityInput
                      value={qty}
                      onChange={(v) => updateQty(id, v)}
                      min={1}
                      max={product.stock}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(id)}
                      className="text-sm text-error hover:underline focus-ring-accent rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-text">${lineTotal.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={clear}
              className="text-sm text-error hover:underline focus-ring-accent rounded"
            >
              Clear cart
            </button>
          </div>

          <aside className="lg:col-span-1 rounded-xl border border-black/10 dark:border-white/10 bg-surface p-4 h-fit">
            <h2 className="text-lg font-semibold text-text">Summary</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-textMuted">Subtotal</span>
              <span className="text-sm font-semibold text-text">${subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primaryForeground shadow-soft focus-ring-primary"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
