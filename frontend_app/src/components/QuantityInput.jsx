import React from 'react';
import { motionSafe } from '../utils/motion';

/**
 * PUBLIC_INTERFACE
 * QuantityInput renders stepper-style quantity controls with accessible labels.
 */
export default function QuantityInput({ value, onChange, min = 1, max = 99, id }) {
  const dec = () => onChange(Math.max(min, (value || 0) - 1));
  const inc = () => onChange(Math.min(max, (value || 0) + 1));

  return (
    <div className="inline-flex items-stretch rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={dec}
        aria-label="Decrease quantity"
        className={['px-3 py-2 text-sm hover:bg-surface/80 focus-ring-primary', motionSafe('transition-colors')].join(' ')}
      >
        −
      </button>
      <input
        id={id}
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Quantity"
        className="w-12 text-center bg-transparent text-sm outline-none"
        value={value}
        onChange={(e) => {
          const num = parseInt(e.target.value || '0', 10);
          if (Number.isFinite(num)) onChange(Math.min(max, Math.max(min, num)));
        }}
      />
      <button
        type="button"
        onClick={inc}
        aria-label="Increase quantity"
        className={['px-3 py-2 text-sm hover:bg-surface/80 focus-ring-primary', motionSafe('transition-colors')].join(' ')}
      >
        +
      </button>
    </div>
  );
}
