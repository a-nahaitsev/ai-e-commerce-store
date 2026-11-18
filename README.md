# AI E-Commerce Store

Next.js (App Router) + TypeScript + Tailwind CSS + Better Auth + Drizzle ORM + Postgres (Neon).

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | ESLint / TypeScript |
| `npm run db:generate` / `db:migrate` / `db:push` / `db:studio` | Drizzle Kit |

## Structure

- `src/db/index.ts` – Drizzle client (Neon HTTP driver)
- `src/db/schema/` – table definitions (empty for now)
- `src/lib/auth.ts` – Better Auth server instance
- `src/lib/auth-client.ts` – Better Auth React client
- `src/app/api/auth/[...all]/route.ts` – Better Auth route handler
- `drizzle.config.ts` – Drizzle Kit config
