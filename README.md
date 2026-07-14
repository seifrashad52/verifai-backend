# verifAI — Backend

Node.js + Express + Drizzle ORM + Neon Postgres + better-auth + Claude API.

> Full team onboarding: see [`../SETUP.md`](../SETUP.md)

## Quick start
```bash
npm install
cp .env.example .env   # fill in Neon URL + BETTER_AUTH_SECRET
npm run db:migrate     # push schema to Neon
npm run dev            # http://localhost:3000
```

## Verify
- `GET /health` → `{ "status": "ok" }`
- `GET /api/auth/ok` → `{ "ok": true }`

## API routes (stubs for parallel dev)

| Prefix | Module | Status |
|---|---|---|
| `/api/auth/*` | better-auth (email, Google, Facebook) | Ready |
| `/api/claims/*` | Check a Claim | M2 stub |
| `/api/game/*` | Countries, levels, reveal | M3 stub |
| `/api/score/*` | Score aggregation | M4 stub |
| `/api/profile/*` | User info, session | Partial |

## Structure
Each domain under `src/modules/` has its own `routes.ts` so features can be split into microservices later.

## Notes
- Images sent to "Check a Claim" are passed directly to Claude's vision input — no separate OCR service is needed for MVP.
- `web_search` tool is used by the verdict engine so answers are grounded in real sources, not model guesses.
- Mount better-auth **before** `express.json()` — see `src/index.ts`.
