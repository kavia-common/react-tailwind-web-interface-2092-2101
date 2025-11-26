import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../state/CartContext';
import QuantityInput from '../components/QuantityInput';

/**
 * PUBLIC_INTERFACE
 * ProductDetail shows a single product with details and add-to-cart.
 */
export default function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id), [id]);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-text">Product not found.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline focus-ring-primary rounded">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl border border-black/10 dark:border-white/10 object-cover shadow-soft"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text">{product.name}</h1>
          <p className="mt-2 text-sm text-textMuted">Rating ★ {product.rating.toFixed(1)}</p>
          <p className="mt-4 text-lg font-semibold text-text">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-sm text-text">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <QuantityInput value={qty} onChange={setQty} min={1} max={product.stock} />
            <button
              type="button"
              onClick={() => addItem(product.id, qty)}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primaryForeground shadow-soft focus-ring-primary"
              aria-label={`Add ${qty} ${product.name} to cart`}
            >
              Add to cart
            </button>
          </div>

          <div className="mt-6">
            <Link to="/cart" className="text-sm text-primary hover:underline focus-ring-primary rounded">
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
