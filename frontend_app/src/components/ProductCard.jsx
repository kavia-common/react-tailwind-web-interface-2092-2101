import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryName } from '../data/categories';
import { motionSafe } from '../utils/motion';

/**
 * PUBLIC_INTERFACE
 * ProductCard shows a product summary card with image, name, price and rating.
 */
export default function ProductCard({ product }) {
  const { id, name, price, image, categoryId, rating, stock } = product;

  return (
    <div
      className={[
        'group rounded-xl border border-black/10 dark:border-white/10 bg-surface shadow-soft',
        motionSafe('transition-transform hover:scale-[1.01]')
      ].join(' ')}
    >
      <Link to={`/product/${id}`} className="block rounded-t-xl overflow-hidden focus-ring-primary">
        <img
          src={image}
          alt={name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-textMuted">{getCategoryName(categoryId)}</p>
          <p className="text-xs text-textMuted" aria-label={`Rating ${rating} out of 5`}>
            ★ {rating.toFixed(1)}
          </p>
        </div>
        <Link
          to={`/product/${id}`}
          className="mt-1 block text-sm font-semibold text-text hover:text-primary focus-ring-primary rounded"
        >
          {name}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base font-bold text-text">${price.toFixed(2)}</p>
          <p className="text-xs text-textMuted">{stock > 0 ? 'In stock' : 'Out of stock'}</p>
        </div>
      </div>
    </div>
  );
}
