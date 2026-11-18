import { relations, sql } from "drizzle-orm";
import { check, integer, pgTable, timestamp } from "drizzle-orm/pg-core";

import { products } from "./products";

/** One row per product. Quantity 0 means sold out. */
export const productStock = pgTable(
  "product_stock",
  {
    productId: integer("product_id")
      .primaryKey()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check("product_stock_quantity_check", sql`${table.quantity} >= 0`),
  ],
);

export const productStockRelations = relations(productStock, ({ one }) => ({
  product: one(products, {
    fields: [productStock.productId],
    references: [products.id],
  }),
}));
