import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Checkout shows a placeholder confirmation UI.
 */
export default function Checkout() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-text">Checkout</h1>
      <div className="mt-6 rounded-xl border border-black/10 dark:border-white/10 bg-surface p-6">
        <p className="text-text">
          This is a placeholder checkout. Implement payment and shipping details here.
        </p>
      </div>
    </div>
  );
}
