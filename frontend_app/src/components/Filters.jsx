import React, { useMemo } from 'react';
import { categories } from '../data/categories';
import { motionSafe } from '../utils/motion';

/**
 * PUBLIC_INTERFACE
 * Filters provides category and price filtering controls.
 */
export default function Filters({ selectedCategory, onCategoryChange, priceRange, onPriceRangeChange }) {
  const [minPrice, maxPrice] = priceRange || [0, 200];

  const cats = useMemo(() => [{ id: '', name: 'All' }, ...categories], []);

  return (
    <aside className="rounded-xl border border-black/10 dark:border-white/10 bg-surface p-4 shadow-soft">
      <fieldset>
        <legend className="text-sm font-semibold text-text">Category</legend>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-1 gap-2">
          {cats.map((c) => (
            <label key={c.id || 'all'} className="inline-flex items-center gap-2 text-sm text-text">
              <input
                type="radio"
                name="category"
                value={c.id}
                checked={(selectedCategory || '') === (c.id || '')}
                onChange={(e) => onCategoryChange(e.target.value || '')}
                className="h-4 w-4 accent-primary"
              />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-text">Price range</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="minPrice" className="sr-only">Min price</label>
            <input
              id="minPrice"
              type="number"
              inputMode="decimal"
              className={['w-full rounded-lg border px-3 py-2 text-sm bg-transparent border-black/10 dark:border-white/10', motionSafe('transition-colors')].join(' ')}
              value={minPrice}
              onChange={(e) => onPriceRangeChange([Number(e.target.value || 0), maxPrice])}
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="sr-only">Max price</label>
            <input
              id="maxPrice"
              type="number"
              inputMode="decimal"
              className={['w-full rounded-lg border px-3 py-2 text-sm bg-transparent border-black/10 dark:border-white/10', motionSafe('transition-colors')].join(' ')}
              value={maxPrice}
              onChange={(e) => onPriceRangeChange([minPrice, Number(e.target.value || 0)])}
            />
          </div>
        </div>
      </fieldset>
    </aside>
  );
}
