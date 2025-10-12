# Personspace Monorepo

Turborepo workspace containing the Vite-powered web client, the TypeGraphQL backend, and shared UI/tooling packages.

## Workspace Layout

- `apps/web` – React + Vite frontend with Apollo, TailwindCSS, React Router (data APIs), and Shadcn UI
- `apps/backend` – TypeGraphQL + Apollo Server API
- `packages/ui` – Shared Tailwind-based React component library (buttons, layout shell, modals)
- `packages/eslint-config-custom` – Centralised ESLint preset for all workspaces
- `packages/tsconfig` – Base TypeScript configs consumed by each package/app

## Install

```bash
yarn install
```

## Develop

Run both backend and web clients:

```bash
yarn dev --filter=backend
# in another terminal
yarn dev --filter=web
```

`yarn dev` at the root still delegates to Turborepo if you want everything at once.

## Build & Lint

```bash
yarn build
yarn lint
```

## Tailwind & Shadcn UI

Tailwind is configured per package (`apps/web/tailwind.config.ts`, `packages/ui/tailwind.config.ts`). Shared primitives rely on Shadcn UI components exposed from `packages/ui`, so add new primitives via `npx shadcn add component-name` inside that workspace when needed.

## GraphQL & Apollo

The web client initialises an Apollo Client in `src/main.tsx` and shares context via `AuthProvider`. Update `src/graphql` for new queries or mutations and run `yarn workspace backend prisma:generate` if schema changes.

## Quick Commands

- Install dependencies: `yarn install`
- Start development (web): `yarn dev --filter=web`
- Start development (backend): `yarn dev --filter=backend`
- Build all workspaces: `yarn build`
- Add a Shadcn component (from `packages/ui`): `npx shadcn@latest add component-name`
