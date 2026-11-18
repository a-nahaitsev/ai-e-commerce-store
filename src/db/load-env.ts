/**
 * Side-effect import for standalone scripts. Import it first: `@/db` throws
 * at import time if `DATABASE_URL` is missing. Mirrors `drizzle.config.ts`.
 */
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });
