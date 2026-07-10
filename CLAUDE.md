@AGENTS.md

# Well, Actually. — Project Guide

## Overview
A pedantic British English teaching site. First feature: infinite preposition card game with spaced repetition and AI-generated contextual roasts.

## Tech Stack
- **Runtime**: Bun
- **Framework**: Next.js 15+ (App Router, TypeScript)
- **Styling**: Tailwind CSS for utilities + custom CSS (Academic Parchment theme)
- **AI**: Vercel AI SDK (`ai`) + `@ai-sdk/openai` provider pointed at OpenRouter
- **Persistence**: localStorage only

## Architecture
- `src/app/` — Next.js App Router pages and API routes
- `src/components/` — React components (TopicCard, GameCard, BullyMessage, etc.)
- `src/lib/` — Pure logic (game engine, types, storage, card data)
- `src/lib/cards/` — Card data files organized by category

## Key Patterns
- Game engine (`lib/engine.ts`) uses pure functions — no side effects
- Card data is static TypeScript — no database
- Bully responses stream via Vercel AI SDK from OpenRouter
- Game state persisted to localStorage per topic

## Environment Variables
- `OPENROUTER_API_KEY` — Required for AI bully responses. Locally lives in `.dev.vars` (gitignored); in production it's a Worker secret (`bunx wrangler secret put OPENROUTER_API_KEY`).
- On Cloudflare Workers, `process.env` is only populated once request handling starts — never read env vars at module scope (see `src/lib/openrouter.ts`).

## Commands
- `bun dev` — Start dev server
- `bun run build` — Production build
- `bun run lint` — ESLint
- `bun run preview` — Build and run in workerd (the real Cloudflare runtime) on localhost:8787
- `bun run deploy` — Build and deploy to Cloudflare Workers

## Deployment
Cloudflare Workers via the OpenNext adapter (`@opennextjs/cloudflare`). Config: `wrangler.jsonc` + `open-next.config.ts`. No R2/ISR caching — pages are static, dynamic bits are API routes. Keep `compatibility_date` at or below the newest date the local workerd binary supports, otherwise `preview` fails to start.
