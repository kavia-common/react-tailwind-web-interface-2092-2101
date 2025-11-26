export const categories = [
  { id: 'cat-1', slug: 'apparel', name: 'Apparel' },
  { id: 'cat-2', slug: 'accessories', name: 'Accessories' },
  { id: 'cat-3', slug: 'gadgets', name: 'Gadgets' },
  { id: 'cat-4', slug: 'home', name: 'Home' }
];

/**
 * PUBLIC_INTERFACE
 * getCategoryById returns the category object by id.
 */
export function getCategoryById(id) {
  return categories.find((c) => c.id === id) || null;
}

/**
 * PUBLIC_INTERFACE
 * getCategoryName returns display name for the given category id.
 */
export function getCategoryName(id) {
  const c = getCategoryById(id);
  return c ? c.name : 'Unknown';
}
