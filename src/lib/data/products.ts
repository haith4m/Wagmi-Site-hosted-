/**
 * WAGMI Club Shop - product catalog
 */

export type ProductColor = { name: string; hex: string; image?: string };
export type ProductSize = { name: string; label: string };
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  description: string;
  details: string;
  category: ProductCategory;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  sale?: boolean;
  msrp?: number;
  comingSoon?: boolean;
};
export type ProductCategory = 'ALL' | 'TEES' | 'LONG SLEEVES' | 'SINGLES' | 'HOODIES' | 'ACCESSORIES';
export const CATEGORIES: ProductCategory[] = ['ALL', 'TEES', 'LONG SLEEVES', 'SINGLES', 'HOODIES', 'ACCESSORIES'];

export const PRODUCTS: Product[] = [
  {
    slug: 'wagmi-tee',
    name: 'WAGMI Tee',
    tagline: 'Coming soon.',
    price: 0,
    currency: 'GBP',
    category: 'TEES',
    comingSoon: true,
    colors: [
      { name: 'Sand', hex: '#cdbb9d' },
      { name: 'Off-White', hex: '#f3eadd' }
    ],
    sizes: [
      { name: 'S', label: 'S' },
      { name: 'M', label: 'M' },
      { name: 'L', label: 'L' },
      { name: 'XL', label: 'XL' },
    ],
    images: [],
    description: 'The first WAGMI Club tee. Heavyweight cotton, boxy fit, the wordmark on the chest. Currently in production — join the Monday run to hear about it first.',
    details: 'Final fabric, fit and pricing to be confirmed. Follow @wagmiclub_ on Instagram or TikTok for the drop date.',
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsInCategory(category: ProductCategory | 'ALL') {
  if (category === 'ALL') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
}

export function formatMsrp(amount: number, currency: string) {
  return formatPrice(amount, currency);
}
