# verifAI — Backend

Node.js + Express + Drizzle ORM + Neon Postgres + better-auth + Claude API.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in values (Neon connection string, OAuth keys, Anthropic key).
3. `npm run db:generate` then `npm run db:migrate` to create tables.
4. `npm run dev`

## Structure
See `/src` — each domain (`auth`, `claims`, `game`, `ai`, `search`, `score`, `profile`) is a self-contained module with its own routes/services, so features can be split into microservices later without a rewrite.

## Notes
- Images sent to "Check a Claim" are passed directly to Claude's vision input — no separate OCR service is needed for MVP.
- `web_search` tool is used by the verdict engine so answers are grounded in real sources, not model guesses.
