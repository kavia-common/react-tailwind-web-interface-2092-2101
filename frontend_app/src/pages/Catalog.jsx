import React, { useMemo, useState } from 'react';
import { products } from '../data/products';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';

/**
 * PUBLIC_INTERFACE
 * Catalog displays product filters and a grid of products.
 */
export default function Catalog() {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const inCat = !category || p.categoryId === category;
      const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return inCat && inPrice;
    });
  }, [category, priceRange]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-text">Catalog</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Filters
            selectedCategory={category}
            onCategoryChange={setCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />
        </div>
        <div className="lg:col-span-3">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
