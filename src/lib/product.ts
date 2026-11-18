/**
 * UI-facing product shape. Pure types and helpers (no DB import), so any
 * component can use them. Rows are mapped to this in `@/db/queries/products`.
 */

export type ProductImage = { src: string; alt: string };

export type Product = {
  /** Public URL key: /products/[slug]. */
  slug: string;
  sku: string;
  name: string;
  /** Category display name. */
  category: string;
  /** Price in cents. */
  priceCents: number;
  /** Units available. 0 = sold out. */
  stock: number;
  badge?: string;
  description: string;
  details: string[];
  /** Listing/card image. */
  image: string;
  alt: string;
  /** Product page images. */
  gallery: ProductImage[];
};

export function productHref(product: Pick<Product, "slug">) {
  return `/products/${product.slug}`;
}
