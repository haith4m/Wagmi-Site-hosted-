#!/usr/bin/env node
const fs = require('fs');

const types = `/**
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
};
export type ProductCategory = 'ALL' | 'TEES' | 'LONG SLEEVES' | 'SINGLES' | 'HOODIES' | 'ACCESSORIES';
export const CATEGORIES: ProductCategory[] = ['ALL', 'TEES', 'LONG SLEEVES', 'SINGLES', 'HOODIES', 'ACCESSORIES'];

export const PRODUCTS: Product[] = [
`;

fs.writeFileSync('src/lib/data/products.ts', types);
console.log('Part 1 written:', types.length);

const productsPart = `
  {
    slug: 'wagmi-base-t-shirt',
    name: 'WAGMI Base T-Shirt',
    tagline: 'Runs in it. Lives in it.',
    price: 38,
    currency: 'GBP',
    category: 'TEES',
    colors: [
      { name: 'Sand', hex: '#cdbb9d' },
      { name: 'Charcoal', hex: '#1a1a18' },
      { name: 'Off-White', hex: '#f3eadd' },
    ],
    sizes: [
      { name: 'S', label: 'S' },
      { name: 'M', label: 'M' },
      { name: 'L', label: 'L' },
      { name: 'XL', label: 'XL' },
    ],
    images: ['/wagmi/SnapInsta.to_681764921_17903362812408573_4145675300843224089_n.jpg'],
    description: 'A quiet staple for the miles before the miles. Heavyweight cotton, softened through. The WAGMI wordmark sits small on the chest.',
    details: '180gsm cotton jersey. Crew neck. Double-stitched seams. Pre-shrunk. Made for the run and the day after.',
    msrp: 48,
  },
  {
    slug: 'wagmi-long-sleeve-run-top',
    name: 'WAGMI Long Sleeve Run Top',
    tagline: 'For when the air bites.',
    price: 54,
    currency: 'GBP',
    category: 'LONG SLEEVES',
    colors: [
      { name: 'Black', hex: '#0a0a09' },
      { name: 'Sand', hex: '#cdbb9d' },
    ],
    sizes: [
      { name: 'S', label: 'S' },
      { name: 'M', label: 'M' },
      { name: 'L', label: 'L' },
      { name: 'XL', label: 'XL' },
    ],
    images: ['/wagmi/SnapInsta.to_683148602_17903362830408573_8137015842164849167_n.jpg'],
    description: 'A long-sleeve top built for the colder stretches and the slower mornings. Breathable, fitted without being tight, with room for a layer underneath.',
    details: '140gsm brushed cotton blend. Raglan sleeves. Mock neck. Ribbed hem. Designed for 5K to half-marathon training blocks.',
    msrp: 68,
  },
  {
    slug: 'wagmi-movement-single',
    name: 'WAGMI Movement Single',
    tagline: 'One piece. Many miles.',
    price: 46,
    currency: 'GBP',
    category: 'SINGLES',
    colors: [
      { name: 'Olive', hex: '#6e7248' },
      { name: 'Sand', hex: '#cdbb9d' },
    ],
    sizes: [
      { name: 'S', label: 'S' },
      { name: 'M', label: 'M' },
      { name: 'L', label: 'L' },
      { name: 'XL', label: 'XL' },
    ],
    images: ['/wagmi/SnapInsta.to_674535959_17903362839408573_5977666674644232821_n.jpg'],
    description: 'A single that works for the run and the pub after. Mid-weight, cut to move, printed with the WAGMI mark in a place only the right people will notice.',
    details: '160gsm cotton blend. Slightly oversized fit. Side seam. Contrast stitching detail. Machine washable.',
    msrp: 58,
  },
  {
    slug: 'wagmi-recovery-tee',
    name: 'WAGMI Recovery Tee',
    tagline: 'The run is still with you.',
    price: 34,
    currency: 'GBP',
    category: 'TEES',
    colors: [
      { name: 'Heather', hex: '#9a9388' },
      { name: 'Charcoal', hex: '#1a1a18' },
    ],
    sizes: [
      { name: 'S', label: 'S' },
      { name: 'M', label: 'M' },
      { name: 'L', label: 'L' },
      { name: 'XL', label: 'XL' },
    ],
    images: ['/wagmi/SnapInsta.to_540579557_17903177901250444_3982950226620894724_n.jpg'],
    description: 'A relaxed tee for the recovery day. Softer than the training tops, looser than the club fit. Something to wear when you are still thinking about the run.',
    details: '150gsm cotton jersey. Relaxed fit. Ribbed crew neck. Woven label. Sold as a single colourway per drop.',
    msrp: 42,
  },
  {
    slug: 'wagmi-crew-hoodie',
    name: 'WAGMI Crew Hoodie',
    tagline: 'Warm. Quiet. Yours.',
    price: 72,
    currency: 'GBP',
    category: 'HOODIES',
    colors: [
      { name: 'Charcoal', hex: '#1a1a18' },
      { name: 'Sand', hex: '#cdbb9d' },
      { name: 'Off-White', hex: '#f3eadd' },
    ],
    sizes: [
      { name: 'S', label: 'S' },
      { name: 'M', label: 'M' },
      { name: 'L', label: 'L' },
      { name: 'XL', label: 'XL' },
    ],
    images: ['/wagmi/SnapInsta.to_683552316_17903362827408573_2520629407912285782_n.jpg'],
    description: 'The hoodie for the cold run and the long sit-down after. Heavyweight fleece, a clean silhouette, the WAGMI wordmark on the lower back.',
    details: '320gsm cotton fleece. Drawstring hood. Kangaroo pocket. Ribbed cuffs and hem. Double-layered body. Made for layering and for standing still.',
    msrp: 88,
  },
  {
    slug: 'wagmi-run-cap',
    name: 'WAGMI Run Cap',
    tagline: 'Keep the sun off. Keep moving.',
    price: 26,
    currency: 'GBP',
    category: 'ACCESSORIES',
    colors: [
      { name: 'Sand', hex: '#cdbb9d' },
      { name: 'Black', hex: '#0a0a09' },
    ],
    sizes: [
      { name: 'One', label: 'One size' },
    ],
    images: ['/wagmi/SnapInsta.to_541530850_17903177910250444_1661990632498568655_n.jpg'],
    description: 'A simple running cap for the head that hates decisions. Breathable, structured, with the WAGMI mark stitched small at the back.',
    details: 'Moisture-wicking fabric. Structured crown. Adjustable back strap. Ventilation eyelets. One size fits most.',
    msrp: 32,
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsInCategory(category) {
  if (category === 'ALL') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatPrice(amount, currency) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
}

export function formatMsrp(amount, currency) {
  return formatPrice(amount, currency);
}
`;
fs.appendFileSync('src/lib/data/products.ts', productsPart);
console.log('Part 2 written:', productsPart.length);
