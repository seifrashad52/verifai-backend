# verifAI — Mobile

React Native (Expo) app with 4 bottom tabs: Play, Search (Check a Claim), Score, Profile.

## Setup
1. `npm install`
2. Create `.env` with `EXPO_PUBLIC_API_URL=http://<your-backend-host>:3000`
3. `npm start`

## Structure
- `src/screens` — one folder per tab + Auth + Reveal
- `src/navigation` — bottom tabs + (to add) auth stack
- `src/api` — axios client talking to the backend
- `src/store` — zustand stores (auth session, game progress cache)
