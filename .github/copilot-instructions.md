# Copilot / AI agent instructions for this repository

Purpose
- Short, actionable guidance to get an AI coding agent productive quickly.

Quick start (key commands)
- Install deps: `npm install`
- Dev (server + Vite middleware): `npm run dev` (runs `server/index-dev.ts` with Vite in middleware mode)
- Build: `npm run build` (Vite builds client; `esbuild` bundles `server/index-prod.ts` → `dist/index.js`)
- Start production bundle: `npm start` (`node dist/index.js`)
- Type-check: `npm run check`
- Push Drizzle migrations: `npm run db:push`

Big picture
- Monorepo split: `client/` (React + Vite) + `server/` (Express). Both are served by the Express server in dev via Vite middleware.
- Shared validation and types live in `shared/` (imported with `@shared/*`). Keep `shared/schema.ts` as the single source of truth for Zod + Drizzle schemas.

Key files & where to start
- `server/index-dev.ts` — dev entry: creates Vite middleware and mounts it on Express.
- `server/app.ts` — logging, error handling, PORT default (5000).
- `server/routes.ts` — API surface and how `storage` is used.
- `server/storage.ts` — currently `MemStorage` (in-memory). Swap for DB-backed storage here.
- `shared/schema.ts` — Zod schemas; update here when adding/changing API payloads.
- `client/src/components/chatbot/` — chatbot UI and lead collection components (`ChatbotModal.tsx`, `ChatInput.tsx`, `ChatMessage.tsx`).

Conventions and important patterns
- ESM project (`"type": "module"`): use `import`/`export` and existing `import.meta.dirname` helpers.
- Path aliases: `@/*` → `client/src/*`, `@shared/*` → `shared/*`. Prefer these over deep relative imports.
- Validation: routes call `insertLeadSchema.parse(req.body)` (do not duplicate validation logic). Update `shared/schema.ts` for schema changes.
- UI: Radix + Tailwind; follow `class-variance-authority` patterns used in `client/src/components/ui/`.

Dev notes & workflows
- Hot reload: client edits are HMR'd via Vite middleware. Server code changes require restarting `npm run dev`.
- Production test: run `npm run build` then `npm start` — the server serves `dist/public` and expects `dist/index.js`.

API example (from `server/routes.ts`)
- POST `/api/leads` — validated by `insertLeadSchema` in `shared/schema.ts`.
  Example curl:

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@test.com","phone":"0123456789","skuRange":"1-10","channels":["email"]}'
```

When editing server + client together
- Make code edits, then:
  - For dev: restart `npm run dev` when server files change.
  - For production-like testing: `npm run build` → `npm start`.

If you need to change storage
- Edit `server/storage.ts` to provide a DB-backed implementation and export it as `storage`. Use `shared/schema.ts` for schema changes and `npm run db:push` for migrations.

If anything is unclear or you want follow-up edits (examples, DB integration, or new endpoints), tell me which area to expand.
