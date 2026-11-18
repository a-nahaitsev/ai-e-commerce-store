import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  // Origin checks (CSRF) and trusted redirects are derived from this.
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  // In-memory limits reset per serverless instance; keep counters in Postgres.
  rateLimit: { storage: "database" },
  // Must be the last plugin so server actions can set cookies.
  plugins: [nextCookies()],
});
