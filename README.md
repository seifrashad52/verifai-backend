# verifAI — Backend

Node.js + Express + Drizzle ORM + Neon Postgres + better-auth + Claude API.

> Full team onboarding: see [`../SETUP.md`](../SETUP.md)

## Quick start
```bash
npm install
cp .env.example .env   # EXPO_PUBLIC_API_URL=http://<your-ip>:3000
npm start
```

## Structure
- `src/screens` — one folder per tab + Auth + Reveal
- `src/navigation` — RootNavigator (auth gate) + BottomTabs
- `src/api` — axios client with auth interceptor
- `src/store` — Zustand auth store
- `src/types` — shared TypeScript types

## Current state (M1)
- Auth gate: shows SignIn when no session, tabs when authenticated
- SignIn screen is a stub — wire to better-auth client next
