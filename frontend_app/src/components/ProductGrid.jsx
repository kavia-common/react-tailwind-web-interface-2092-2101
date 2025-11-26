import React from 'react';
import ProductCard from './ProductCard';

/**
 * PUBLIC_INTERFACE
 * ProductGrid renders a responsive grid of ProductCard components.
 */
export default function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <div className="text-center text-textMuted py-16" role="status" aria-live="polite">
        No products found.
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
