"use cache";

/**
 * Cached, read-only product queries for the storefront. Every export here is
 * cached (module-level directive), so exports must be async functions; shared
 * types live in `@/lib/product`. After a product or stock write, call
 * `updateTag("products")` so the cached pages refresh.
 */
import { asc, eq, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { products } from "@/db/schema";
import type { Product } from "@/lib/product";

const withRelations = { category: true, stock: true } as const;

type ProductRow = Awaited<
  ReturnType<typeof db.query.products.findFirst<{ with: typeof withRelations }>>
>;

function toProduct(row: NonNullable<ProductRow>): Product {
  return {
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    category: row.category.name,
    priceCents: row.priceCents,
    stock: row.stock?.quantity ?? 0,
    badge: row.badge ?? undefined,
    description: row.description,
    details: row.details,
    image: row.imageUrl,
    alt: row.imageAlt,
    gallery: row.gallery,
  };
}

function tagProducts() {
  cacheLife("hours");
  cacheTag("products");
}

/** All products in display order. */
export async function getProducts(): Promise<Product[]> {
  tagProducts();
  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: asc(products.id),
  });
  return rows.map(toProduct);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  tagProducts();
  const row = await db.query.products.findFirst({
    with: withRelations,
    where: eq(products.slug, slug),
  });
  return row ? toProduct(row) : undefined;
}

/** Same-category products first, then the rest, excluding the current one. */
export async function getRelatedProducts(
  slug: string,
  limit = 4,
): Promise<Product[]> {
  tagProducts();
  const current = await db.query.products.findFirst({
    columns: { id: true, categoryId: true },
    where: eq(products.slug, slug),
  });
  if (!current) return [];

  const rows = await db.query.products.findMany({
    with: withRelations,
    where: sql`${products.id} <> ${current.id}`,
    orderBy: [
      sql`(${products.categoryId} = ${current.categoryId}) desc`,
      asc(products.id),
    ],
    limit,
  });
  return rows.map(toProduct);
}

/** Slugs of every product, for `generateStaticParams`. */
export async function getProductSlugs(): Promise<string[]> {
  tagProducts();
  const rows = await db.query.products.findMany({
    columns: { slug: true },
    orderBy: asc(products.id),
  });
  return rows.map((row) => row.slug);
}
