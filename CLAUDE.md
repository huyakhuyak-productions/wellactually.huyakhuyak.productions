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
- `OPENROUTER_API_KEY` — Required for AI bully responses

## Commands
- `bun dev` — Start dev server
- `bun run build` — Production build
- `bun run lint` — ESLint
