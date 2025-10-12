# Web App (Vite + React)

## Prerequisites

- `yarn install`

## Local Development

```bash
yarn dev --filter=web
```

This starts Vite in dev mode with React Refresh and TailwindCSS enabled. The app listens on [http://localhost:5173](http://localhost:5173) by default.

## Production Build

```bash
yarn build --filter=web
```

Outputs a static bundle to `apps/web/dist`. Preview it locally with:

```bash
yarn dev --filter=web -- --host
# or
yarn workspace web preview
```

## Styling

- The project uses TailwindCSS (`tailwind.config.ts`) with tokens that mirror the previous theme colors.
- Utility classes live beside the components; shared primitives come from `packages/ui` and are backed by Shadcn UI primitives.

## Routing
React Router's data APIs define routes in `src/Router.tsx` (via `createBrowserRouter`). Update that file and `src/layout/RootLayout.tsx` when introducing new pages or nested layouts.
