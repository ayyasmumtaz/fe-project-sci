# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start Vite dev server
npm run build         # type-check (tsc -b) then production build
npm run preview       # preview production build
npm run lint           # eslint .
npm run lint:fix       # eslint . --fix
npm run format         # prettier --write .
npx shadcn add <name>  # add a shadcn/ui component into src/components/ui
```

No test runner is configured in this repo.

Husky runs `lint-staged` on pre-commit, which auto-fixes `*.{js,jsx,ts,tsx}` via `eslint --fix`.

## Architecture

This is a React + Vite + TypeScript boilerplate, currently stripped down to a bare skeleton (folders exist, most feature implementations were intentionally removed so it can be rebuilt as a learning exercise). The intended architecture, once features are rebuilt, is **feature-based**:

- `src/features/<name>/` — one folder per domain feature (e.g. `auth`, `dashboard`), each internally split into `api/` (service calls via `src/lib/api.ts`), `hooks/` (TanStack Query hooks), `schema/` (Zod schemas), `store/` (Zustand stores), `types/`, and a top-level `<name>-page.tsx`.
- `src/components/ui/` — shadcn/ui primitives, added via `npx shadcn add`, not hand-written.
- `src/components/layouts/` and `src/components/forms/` — shared layout shells and cross-feature form components.
- `src/routes/` — routing is centralized: `route-paths.ts` defines path constants, `app-routes.tsx` composes `publicRoutes` / `privateRoutes` / `fallbackRoute` route arrays, `protected-route.tsx` gates private routes on auth, `index.ts` builds the router via `createBrowserRouter`. New pages are wired in by adding a path constant and a route entry here, not by editing `App.tsx`.
- `src/lib/api.ts` — single shared axios instance with request/response interceptors (bearer token injection from `localStorage`, 401 → redirect). Feature `api/` services should import this instance rather than calling axios directly.
- `src/lib/react-query.ts` — single shared `QueryClient`, provided in `App.tsx` via `QueryClientProvider`.
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge) used for all conditional className composition.

## Conventions (enforced by ESLint)

- **Absolute imports only** for internal modules: `@/...` (maps to `src/*`), never relative `./` or `../` — enforced by `no-restricted-imports`.
- **Import order** is auto-sorted by `simple-import-sort` (fixed via `lint:fix`, not something to hand-arrange).
- **Type-only imports** must use `import type` (`@typescript-eslint/consistent-type-imports`).
- No circular imports (`import/no-cycle`).
- `console.log` is disallowed; only `console.warn`/`console.error` are allowed.
- Path alias `@/*` → `./src/*` is defined in both `vite.config.ts` and `tsconfig.app.json` — keep them in sync if changed.

## shadcn/ui config

Configured via `components.json`: style `new-york`, base color `neutral`, icon library `lucide`, CSS variables enabled, target stylesheet `src/styles/index.css`. Aliases map `components`→`@/components`, `ui`→`@/components/ui`, `lib`→`@/lib`, `hooks`→`@/hooks`, `utils`→`@/lib/utils`.
