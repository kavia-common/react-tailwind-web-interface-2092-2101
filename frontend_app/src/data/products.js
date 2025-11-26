import { categories } from './categories';

const img = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/400`;

/**
 * Products: id, slug, name, price, categoryId, image, description, rating, stock
 */
export const products = [
  {
    id: 'p-101',
    slug: 'ocean-tee',
    name: 'Ocean Tee',
    price: 24.0,
    categoryId: categories[0].id,
    image: img('ocean-tee'),
    description:
      'Soft cotton tee with subtle ocean gradient print. Comfortable everyday wear.',
    rating: 4.6,
    stock: 42
  },
  {
    id: 'p-102',
    slug: 'coastal-hoodie',
    name: 'Coastal Hoodie',
    price: 58.0,
    categoryId: categories[0].id,
    image: img('coastal-hoodie'),
    description:
      'Midweight hoodie with warm interior lining and minimal branding.',
    rating: 4.8,
    stock: 18
  },
  {
    id: 'p-201',
    slug: 'magenta-cap',
    name: 'Magenta Cap',
    price: 19.5,
    categoryId: categories[1].id,
    image: img('magenta-cap'),
    description:
      'Adjustable cap with magenta accent and breathable panels for all-day comfort.',
    rating: 4.2,
    stock: 65
  },
  {
    id: 'p-202',
    slug: 'ocean-tote',
    name: 'Ocean Tote',
    price: 16.0,
    categoryId: categories[1].id,
    image: img('ocean-tote'),
    description:
      'Durable canvas tote bag with reinforced straps and inner pocket.',
    rating: 4.4,
    stock: 80
  },
  {
    id: 'p-301',
    slug: 'wave-earbuds',
    name: 'Wave Earbuds',
    price: 89.0,
    categoryId: categories[2].id,
    image: img('wave-earbuds'),
    description:
      'Wireless earbuds with noise isolation and 24-hour battery life in a compact case.',
    rating: 4.5,
    stock: 25
  },
  {
    id: 'p-302',
    slug: 'harbor-powerbank',
    name: 'Harbor Power Bank',
    price: 39.0,
    categoryId: categories[2].id,
    image: img('harbor-powerbank'),
    description:
      '10,000 mAh fast-charging power bank with USB-C and USB-A ports.',
    rating: 4.1,
    stock: 50
  },
  {
    id: 'p-401',
    slug: 'reef-mug',
    name: 'Reef Mug',
    price: 14.0,
    categoryId: categories[3].id,
    image: img('reef-mug'),
    description:
      'Ceramic mug with heat-sensitive gradient and ergonomic handle.',
    rating: 4.7,
    stock: 120
  },
  {
    id: 'p-402',
    slug: 'shoreline-throw',
    name: 'Shoreline Throw',
    price: 49.0,
    categoryId: categories[3].id,
    image: img('shoreline-throw'),
    description:
      'Cozy woven throw with subtle blue tones. Perfect for reading nooks.',
    rating: 4.3,
    stock: 33
  },
  {
    id: 'p-403',
    slug: 'tidal-lamp',
    name: 'Tidal Lamp',
    price: 69.0,
    categoryId: categories[3].id,
    image: img('tidal-lamp'),
    description:
      'Ambient LED lamp with adjustable warmth and gentle diffusion.',
    rating: 4.5,
    stock: 17
  },
  {
    id: 'p-303',
    slug: 'compass-tracker',
    name: 'Compass Tracker',
    price: 59.0,
    categoryId: categories[2].id,
    image: img('compass-tracker'),
    description:
      'Minimalist activity tracker with week-long battery and water resistance.',
    rating: 4.0,
    stock: 40
  }
];

/**
 * PUBLIC_INTERFACE
 * getProductById returns a product by id.
 */
export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

/**
 * PUBLIC_INTERFACE
 * getProductsByCategory filters products by category id (optional).
 */
export function getProductsByCategory(categoryId) {
  if (!categoryId) return products;
  return products.filter((p) => p.categoryId === categoryId);
}
