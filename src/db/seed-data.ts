/**
 * Sample catalogue loaded by `npm run db:seed`. Images are from Unsplash.
 * Prices are in cents.
 */
import { unsplash, unsplashPortrait } from "@/lib/unsplash";

export type SeedCategory = { slug: string; name: string };

export const seedCategories: SeedCategory[] = [
  { slug: "handbags", name: "Handbags" },
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "ready-to-wear", name: "Ready-to-Wear" },
  { slug: "tailoring", name: "Tailoring" },
];

type Focus = { x: number; y: number; zoom: number };

type ProductSeedInput = {
  slug: string;
  sku: string;
  name: string;
  categorySlug: string;
  priceCents: number;
  /** Units available. 0 = sold out. */
  stock: number;
  badge?: string;
  alt: string;
  description: string;
  details: string[];
  /** Unsplash photo id. */
  photo: string;
  /** Focal points (0..1) for the two detail crops. */
  detailFocus: [Focus, Focus];
};

export type SeedProduct = {
  slug: string;
  sku: string;
  name: string;
  categorySlug: string;
  priceCents: number;
  stock: number;
  badge: string | null;
  description: string;
  details: string[];
  imageUrl: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
};

function defineProduct({
  photo,
  detailFocus,
  alt,
  badge,
  ...product
}: ProductSeedInput): SeedProduct {
  return {
    ...product,
    badge: badge ?? null,
    imageUrl: unsplash(photo, 900),
    imageAlt: alt,
    gallery: [
      { src: unsplashPortrait(photo, 1400), alt },
      {
        src: unsplashPortrait(photo, 900, detailFocus[0]),
        alt: `${alt}, detail`,
      },
      {
        src: unsplashPortrait(photo, 900, detailFocus[1]),
        alt: `${alt}, close-up`,
      },
    ],
  };
}

/** Listed in display order; the seed inserts them in this order. */
export const seedProducts: SeedProduct[] = [
  defineProduct({
    slug: "top-handle-bag",
    sku: "AUR-BG-1001",
    name: "Structured Top-Handle Bag",
    categorySlug: "handbags",
    priceCents: 245000,
    stock: 4,
    badge: "New",
    alt: "Black leather top-handle bag with buckled straps",
    photo: "1705909237050-7a7625b47fac",
    description:
      "A structured barrel bag in smooth black calf leather, finished with twin top handles, buckled front straps and a suede-lined interior.",
    details: [
      "Smooth calf leather exterior",
      "Twin top handles",
      "Buckled front straps",
      "Suede-lined interior with zip pocket",
      "Made in Italy",
    ],
    detailFocus: [
      { x: 0.42, y: 0.62, zoom: 2.4 },
      { x: 0.5, y: 0.28, zoom: 2.4 },
    ],
  }),
  defineProduct({
    slug: "floral-slingbacks",
    sku: "AUR-SH-2002",
    name: "Floral Print Slingback Heels",
    categorySlug: "shoes",
    priceCents: 89000,
    stock: 12,
    alt: "Pair of floral print high heels",
    photo: "1543163521-1bf539c55dd2",
    description:
      "Pointed-toe slingbacks in a bold floral jacquard with a slim 95 mm heel and a cushioned leather insole.",
    details: [
      "Floral jacquard upper",
      "95 mm stiletto heel",
      "Adjustable slingback strap",
      "Leather insole and sole",
      "Made in Portugal",
    ],
    detailFocus: [
      { x: 0.55, y: 0.65, zoom: 2.2 },
      { x: 0.55, y: 0.25, zoom: 2.4 },
    ],
  }),
  defineProduct({
    slug: "rust-bomber",
    sku: "AUR-RW-3003",
    name: "Rust Nylon Bomber Jacket",
    categorySlug: "ready-to-wear",
    priceCents: 179000,
    stock: 25,
    badge: "New",
    alt: "Rust coloured bomber jacket on a hanger",
    photo: "1591047139829-d91aecb6caea",
    description:
      "A lightweight bomber in water-repellent nylon with ribbed trims and a full zip. Cut for an easy, relaxed fit.",
    details: [
      "Water-repellent recycled nylon",
      "Ribbed collar, cuffs and hem",
      "Zip front with two side pockets",
      "Relaxed fit",
      "Machine washable at 30°C",
    ],
    detailFocus: [
      { x: 0.5, y: 0.4, zoom: 2.2 },
      { x: 0.5, y: 0.8, zoom: 2.2 },
    ],
  }),
  defineProduct({
    slug: "suede-sneaker",
    sku: "AUR-SH-2004",
    name: "Suede Gum-Sole Low-Top Sneaker",
    categorySlug: "shoes",
    priceCents: 69000,
    stock: 0,
    alt: "Cream suede low-top sneakers with gum soles",
    photo: "1727061180303-d91cdeca6f9c",
    description:
      "A court-inspired low-top sneaker in soft cream suede on a natural gum sole, with a padded white leather collar and tonal laces.",
    details: [
      "Soft Italian suede upper",
      "Natural gum rubber sole",
      "Padded leather collar",
      "Tonal cotton laces",
      "Made in Italy",
    ],
    detailFocus: [
      { x: 0.72, y: 0.62, zoom: 2.2 },
      { x: 0.3, y: 0.58, zoom: 2.4 },
    ],
  }),
  defineProduct({
    slug: "navy-check-suit",
    sku: "AUR-TL-4005",
    name: "Navy Check Wool Suit",
    categorySlug: "tailoring",
    priceCents: 320000,
    stock: 7,
    alt: "Man wearing a navy checked suit",
    photo: "1594938298603-c8148c4dae35",
    description:
      "A three-piece suit in fine wool with a subtle window-pane check. Half-canvassed and finished with horn-effect buttons.",
    details: [
      "Fine virgin wool",
      "Three-piece: jacket, waistcoat, trousers",
      "Half-canvassed construction",
      "Notch lapel, two-button closure",
      "Dry clean only",
    ],
    detailFocus: [
      { x: 0.5, y: 0.35, zoom: 2.2 },
      { x: 0.5, y: 0.75, zoom: 2.2 },
    ],
  }),
  defineProduct({
    slug: "floral-midi-dress",
    sku: "AUR-RW-3006",
    name: "Floral Silk Midi Dress",
    categorySlug: "ready-to-wear",
    priceCents: 215000,
    stock: 3,
    badge: "New",
    alt: "Woman in a floral midi dress by the sea",
    photo: "1496747611176-843222e1e57c",
    description:
      "A fluid midi dress in printed silk with a wrap bodice and a side slit, designed to move with you.",
    details: [
      "100% printed silk",
      "Wrap bodice with tie closure",
      "Side slit",
      "Fully lined",
      "Dry clean only",
    ],
    detailFocus: [
      { x: 0.45, y: 0.4, zoom: 2.2 },
      { x: 0.5, y: 0.8, zoom: 2.2 },
    ],
  }),
  defineProduct({
    slug: "leather-oxford",
    sku: "AUR-SH-2007",
    name: "Polished Leather Oxford",
    categorySlug: "shoes",
    priceCents: 98000,
    stock: 18,
    alt: "Brown polished leather oxford shoe",
    photo: "1614252235316-8c857d38b5f4",
    description:
      "A classic closed-lacing oxford in hand-polished calf leather with a leather sole and a stitched welt.",
    details: [
      "Hand-polished calf leather",
      "Goodyear-welted construction",
      "Leather sole with rubber heel tap",
      "Waxed cotton laces",
      "Made in Spain",
    ],
    detailFocus: [
      { x: 0.35, y: 0.4, zoom: 2.0 },
      { x: 0.7, y: 0.7, zoom: 2.0 },
    ],
  }),
  defineProduct({
    slug: "city-backpack",
    sku: "AUR-BG-1008",
    name: "Technical City Backpack",
    categorySlug: "bags",
    priceCents: 115000,
    stock: 9,
    alt: "Navy technical backpack",
    photo: "1553062407-98eeb64c6a62",
    description:
      "A structured everyday backpack in water-resistant technical fabric, with a padded laptop sleeve and organised pockets.",
    details: [
      "Water-resistant technical fabric",
      "Padded 15-inch laptop sleeve",
      "Front zip pocket",
      "Adjustable padded straps",
      "Capacity: 20 litres",
    ],
    detailFocus: [
      { x: 0.38, y: 0.27, zoom: 2.6 },
      { x: 0.4, y: 0.44, zoom: 2.6 },
    ],
  }),
];
