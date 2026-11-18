import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { categories } from "./categories";
import { productStock } from "./product-stock";

export type ProductImageData = { src: string; alt: string };

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    /** Public URL key: /products/[slug]. */
    slug: text("slug").notNull().unique(),
    sku: text("sku").notNull().unique(),
    name: text("name").notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    /** Price in minor units (cents). */
    priceCents: integer("price_cents").notNull(),
    badge: text("badge"),
    description: text("description").notNull(),
    details: text("details").array().notNull().default(sql`'{}'::text[]`),
    /** Listing/card image. */
    imageUrl: text("image_url").notNull(),
    imageAlt: text("image_alt").notNull(),
    /** Product page images, in display order. */
    gallery: jsonb("gallery")
      .$type<ProductImageData[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_cents_check", sql`${table.priceCents} >= 0`),
  ],
);

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  stock: one(productStock),
}));
