import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { products } from "./products";

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
