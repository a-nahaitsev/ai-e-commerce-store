/**
 * Loads the sample catalogue. Idempotent: categories and products are
 * upserted by slug and stock by product, so re-running resets the sample rows
 * to the values in `seed-data.ts`. Run with `npm run db:seed`.
 */
import "./load-env";

import { sql } from "drizzle-orm";

import { db } from "@/db";
import { categories, productStock, products } from "@/db/schema";
import { seedCategories, seedProducts } from "@/db/seed-data";

async function main() {
  // Categories
  const categoryRows = await db
    .insert(categories)
    .values(seedCategories)
    .onConflictDoUpdate({
      target: categories.slug,
      set: { name: sql`excluded.name` },
    })
    .returning({ id: categories.id, slug: categories.slug });

  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  // Products and stock, in display order (identity ids follow insert order).
  for (const { categorySlug, stock, ...product } of seedProducts) {
    const categoryId = categoryIds.get(categorySlug);
    if (categoryId === undefined) {
      throw new Error(`Unknown category "${categorySlug}" for ${product.slug}`);
    }

    const values = { ...product, categoryId };
    const [row] = await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({
        target: products.slug,
        set: { ...values, updatedAt: new Date() },
      })
      .returning({ id: products.id });

    await db
      .insert(productStock)
      .values({ productId: row.id, quantity: stock })
      .onConflictDoUpdate({
        target: productStock.productId,
        set: { quantity: stock, updatedAt: new Date() },
      });
  }

  const count = await db.$count(products);

  console.log(
    `Seeded ${categoryRows.length} categories and ${seedProducts.length} products (${count} products in table).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
