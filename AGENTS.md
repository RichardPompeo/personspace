# Repository Guidelines

## Project Structure & Module Organization
- `apps/web`: Next.js 15 client with Apollo and `styled-components`; feature folders live under `app` and `components`.
- `apps/backend`: TypeGraphQL + Apollo Server entry point in `src/server.ts`, resolvers in `src/resolvers`, and Prisma schema in `prisma/schema.prisma`.
- `packages/ui`: Shared React primitives (e.g., button variants) exported from `index.tsx` for reuse across apps.
- `packages/eslint-config-custom`: Centralized ESLint preset extending `next`, `turbo`, and `prettier`.
- `packages/tsconfig`: Base TS configs consumed by every workspace. Yarn workspaces and Turborepo orchestrate builds across these packages.

## Build, Test, and Development Commands
- `yarn install`: Sync dependencies across all workspaces.
- `yarn dev --filter=web`: Run the Next.js app locally with hot reload.
- `yarn dev --filter=backend`: Launch the TypeGraphQL server with `tsnd` for watch-mode reloads.
- `yarn lint`: Execute ESLint in every package via Turbo; fix high-priority issues before committing.
- `yarn build`: Produce production bundles for all workspaces; address errors before opening PRs.
- `yarn workspace backend prisma:generate`: Regenerate Prisma client after schema changes.

## Coding Style & Naming Conventions
- TypeScript is mandatory; prefer `PascalCase` for React components, `camelCase` for helpers, and suffix GraphQL classes with `Resolver`.
- Run `yarn format` (Prettier) before pushing; formatting defaults to 2-space indentation and double quotes.
- Favor `styled-components` for shared UI styles and keep props strongly typed in `packages/ui`.

## Testing Guidelines
- Automated tests are not yet wired; add unit tests alongside code as `*.spec.ts` or in `__tests__` folders and document required commands in the affected package.
- Validate backend resolver paths with `yarn dev --filter=backend`, and front-end flows via Storybook-style fixtures in `packages/ui` where possible.
- Treat linting as the current gating check; when introducing a test suite, include coverage targets in the PR description.

## Commit & Pull Request Guidelines
- Follow conventional commits (`feat:`, `fix:`, `chore:`) as seen in recent history; keep scopes short and verb-driven.
- Break large efforts into reviewable commits with passing lint/build status.
- Pull requests should summarize the change, link tracking issues, list manual verification steps, and include screenshots or GraphQL samples when altering UI or API contracts.

## Environment & Configuration Tips
- Backend services load Firebase and Prisma credentials from `.env`; coordinate secrets via `.env.example` without committing real keys.
- Turborepo caches respect `**/.env.*local`; when testing new env vars, restart the relevant `yarn dev` command.
- Ensure `prisma/schema.prisma` and generated artifacts remain in sync before deploying.
