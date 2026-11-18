/**
 * Static storefront content (site config, nav, hero, collections, editorial,
 * services, footer). Products, categories and stock live in the database; see
 * `@/db/queries/products`. Images are from Unsplash.
 */
import { unsplash } from "@/lib/unsplash";

export const siteConfig = {
  name: "Aurelia",
  tagline: "Contemporary luxury, made to last",
};

export type NavLink = { label: string; href: string };

// Only the homepage exists so far, so nav links point to on-page anchors.
export const mainNav: NavLink[] = [
  { label: "New In", href: "/#new-arrivals" },
  { label: "Women", href: "/#collections" },
  { label: "Men", href: "/#collections" },
  { label: "Bags", href: "/#new-arrivals" },
  { label: "Shoes", href: "/#new-arrivals" },
  { label: "Services", href: "/#services" },
];

export type Collection = {
  id: string;
  title: string;
  eyebrow: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

export const hero = {
  eyebrow: "Autumn / Winter",
  title: "The Autumn Edit",
  description:
    "Outerwear, tailoring and leather goods for the new season.",
  image: unsplash("1539109136881-3be0616acf4b", 2200),
  alt: "Model in a pale blue coat in front of a cathedral",
};

export const collections: Collection[] = [
  {
    id: "women",
    eyebrow: "For Her",
    title: "Evening & Ready-to-Wear",
    cta: "Shop Women",
    href: "#new-arrivals",
    image: unsplash("1566174053879-31528523f8ae", 1400),
    alt: "Woman in an off-the-shoulder plum dress",
  },
  {
    id: "men",
    eyebrow: "For Him",
    title: "Modern Tailoring",
    cta: "Shop Men",
    href: "#new-arrivals",
    image: unsplash("1507679799987-c73779587ccf", 1400),
    alt: "Man adjusting the cuffs of a dark suit",
  },
];

/* ------------------------------------------------------------------ */
/* Homepage editorial content                                          */
/* ------------------------------------------------------------------ */

export const editorial = {
  eyebrow: "The Season Edit",
  title: "Layer up, effortlessly",
  description:
    "Soft knits, relaxed tailoring and considered outerwear. Discover the pieces that carry you from first frost to the new year.",
  cta: "Explore the Edit",
  href: "#new-arrivals",
  image: unsplash("1512436991641-6745cdb1723f", 1600),
  alt: "Rail of folded and hanging clothing in muted tones",
};

export type Service = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: "appointment",
    title: "Book an Appointment",
    description: "Private styling with an advisor, in store or online.",
    cta: "Choose your Experience",
    href: "#",
    image: unsplash("1441984904996-e0b6ba687e04", 1000),
    alt: "Boutique interior with garments on rails",
  },
  {
    id: "personalization",
    title: "Personalization",
    description: "Engrave or personalise selected accessories.",
    cta: "Explore Options",
    href: "#",
    image: unsplash("1523275335684-37898b6baf30", 1000),
    alt: "White watch with an interchangeable strap",
  },
  {
    id: "collect",
    title: "Collect In Store",
    description: "Order online and pick up at your nearest boutique.",
    cta: "Discover How",
    href: "#",
    image: unsplash("1490481651871-ab68de25d43d", 1000),
    alt: "Clothes hanging on a rail",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "May we help you?",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "My Order", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
  {
    title: "The Company",
    links: [
      { label: "About Aurelia", href: "#" },
      { label: "Code of Ethics", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Corporate Information", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Book an Appointment", href: "#" },
      { label: "Collect In Store", href: "#" },
      { label: "Personalization", href: "#" },
      { label: "Store Locator", href: "#" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Legal", href: "#" },
];
