# Repository Guidelines

## Project Structure & Module Organization

This is a **Turborepo monorepo** containing a full-stack personal space management application.

### Workspace Structure

- **`apps/web`**: React 19 + Vite client with:
  - Apollo Client for GraphQL communication
  - TailwindCSS 4.x for styling
  - React Router 7 for routing
  - Shadcn UI components via `packages/ui`
  - i18next for internationalization (EN/PT)
  - Firebase Authentication
  - PWA support via `vite-plugin-pwa`
  - Feature folders organized under `src/pages` and `src/components`
  
- **`apps/backend`**: TypeGraphQL + Apollo Server API with:
  - Entry point at `src/server.ts`
  - Resolvers in `src/resolvers` (Auth, Notes, NoteComments, NoteShare, User)
  - Prisma ORM with schema at `prisma/schema.prisma`
  - Firebase Admin SDK for authentication
  - Express server integration
  
- **`packages/ui`**: Shared React component library
  - Radix UI primitives (Dialog, Avatar, Switch, Tooltip, etc.)
  - TailwindCSS 4.x styling
  - Shadcn UI components (Button, Input, Textarea, Label, etc.)
  - Sonner for toast notifications
  - Exported from `src/index.tsx` for reuse across apps
  
- **`packages/eslint-config-custom`**: Centralized ESLint preset extending Turbo and Prettier

- **`packages/tsconfig`**: Base TypeScript configurations consumed by every workspace

Yarn workspaces and Turborepo orchestrate builds and dependency management across all packages.

## Build, Test, and Development Commands

### Installation
```bash
yarn install
```

### Development
```bash
# Run web client (Vite dev server)
yarn dev --filter=web

# Run backend server (TypeGraphQL + Apollo with ts-node-dev)
yarn dev --filter=backend

# Run all workspaces concurrently
yarn dev
```

### Build & Production
```bash
# Build all workspaces for production
yarn build

# Build specific workspace
yarn build --filter=web
yarn build --filter=backend

# Start production backend server
yarn start
```

### Linting & Formatting
```bash
# Run ESLint across all workspaces via Turbo
yarn lint

# Format all files with Prettier
yarn format
```

### Database & Prisma
```bash
# Regenerate Prisma client after schema changes
yarn workspace backend prisma:generate

# Push schema changes to database
yarn workspace backend prisma:push

# Deploy migrations to production
yarn workspace backend prisma:migrate

# Pull schema from existing database
yarn workspace backend prisma:pull
```

### UI Components
```bash
# Add new Shadcn component to packages/ui
cd packages/ui
npx shadcn@latest add <component-name>
```

## Coding Style & Naming Conventions

### TypeScript Standards
- TypeScript is **mandatory** across all workspaces
- Prefer `PascalCase` for React components and TypeScript classes
- Use `camelCase` for functions, variables, and helpers
- Suffix GraphQL resolver classes with `Resolver` (e.g., `NotesResolver`, `AuthenticationResolver`)

### React Best Practices
- Use functional components with hooks
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks under `src/hooks`
- Place shared UI primitives in `packages/ui`

### Styling
- Use **TailwindCSS** utility classes for styling
- Tailwind configs per workspace: `apps/web/tailwind.config.ts`, `packages/ui/tailwind.config.ts`
- Use `clsx` or `tailwind-merge` for conditional class names
- Radix UI components provide accessible primitives
- **No styled-components** - this project uses Tailwind exclusively

### Formatting
- Run `yarn format` (Prettier) before committing
- 2-space indentation (enforced by Prettier)
- Double quotes for strings
- Trailing commas where valid
- Husky pre-commit hooks enforce formatting via lint-staged

### Internationalization
- All user-facing strings must use i18next translation keys
- Add translations to both `apps/web/src/languages/en.json` and `pt.json`
- Use `useTranslation()` hook: `const { t } = useTranslation()`
- Namespace translations by feature (e.g., `notes.createNote.title`)

## Testing Guidelines

### Current State
- Automated test suites are not yet configured
- Manual testing required for new features

### Future Testing Strategy
- Add unit tests as `*.spec.ts` or `*.test.tsx` files alongside source code
- Use `__tests__` folders for larger test suites
- Document required test commands in affected package's `package.json`
- Validate backend resolver logic with `yarn dev --filter=backend` and GraphQL playground
- Test frontend flows manually via the running app

### Quality Gates
- **ESLint** is the current gating check - all code must pass linting
- Fix high-priority lint issues before committing
- When introducing test suites, include coverage targets in PR descriptions

## Commit & Pull Request Guidelines

### Commit Messages
- Follow **Conventional Commits** format:
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `chore:` - Maintenance tasks (deps, config)
  - `docs:` - Documentation updates
  - `refactor:` - Code refactoring without behavior changes
  - `style:` - Formatting, missing semicolons, etc.
  - `test:` - Adding or updating tests
  - `perf:` - Performance improvements

### Examples
```
feat(notes): add note sharing functionality
fix(auth): resolve token refresh race condition
chore(deps): update Apollo Client to v4.0.7
docs(readme): add deployment instructions
```

### Pull Request Standards
- **Summary**: Clear description of what changed and why
- **Linked Issues**: Reference related GitHub issues or tickets
- **Testing**: List manual verification steps performed
- **Screenshots/Videos**: Include for UI changes
- **GraphQL Samples**: Show query/mutation examples for API changes
- **Breaking Changes**: Clearly document any breaking changes
- **Checklist**: Ensure lint passes, build succeeds, and manual testing completed

### Review Guidelines
- Break large efforts into smaller, reviewable commits
- Keep PRs focused on a single feature or fix
- Ensure all checks pass before requesting review
- Respond to review feedback promptly

## Environment & Configuration

### Environment Variables

#### Backend (`apps/backend/.env`)
```bash
# Firebase Admin SDK
API_KEY=your_firebase_api_key
AUTH_DOMAIN=your_project.firebaseapp.com
PROJECT_ID=your_firebase_project_id
STORAGE_BUCKET=your_project.appspot.com
MESSAGING_SENDER_ID=your_sender_id
APP_ID=your_app_id
MEASUREMENT_ID=your_measurement_id

# Prisma Database
DATABASE_URL="postgresql://user:password@host:port/database"
```

#### Web Client (`apps/web/.env`)
```bash
# Firebase Client SDK
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Configuration Best Practices
- **Never commit** real credentials - use `.env.example` as template
- Copy `.env.example` to `.env` in each workspace and fill in values
- Backend loads Firebase credentials and Prisma connection string from `.env`
- Web client uses `VITE_` prefixed env vars (Vite requirement)
- Turborepo respects `**/.env.*local` patterns in cache configuration
- When adding new env vars, update `.env.example` files
- Restart dev servers after changing environment variables

### GraphQL & Apollo

#### Client Setup (Web)
- Apollo Client initialized in `src/main.tsx`
- Authentication context provided via `AuthProvider`
- Queries and mutations organized in `src/graphql`
- Bearer token authentication via localStorage `idToken`

#### Server Setup (Backend)
- TypeGraphQL schema built from resolver classes
- Apollo Server integrated with Express
- Firebase Admin SDK validates authentication tokens
- CORS configured for cross-origin requests

### Database & Prisma
- Schema defined in `apps/backend/prisma/schema.prisma`
- Run `yarn workspace backend prisma:generate` after schema changes
- Keep Prisma Client in sync before deploying
- Use migrations for production schema changes

## Architecture Patterns

### Frontend Architecture
- **Pages**: Top-level route components in `src/pages`
- **Components**: Reusable components in `src/components`, organized by feature
- **Layout**: Shell components in `src/layout` (Navbar, Navigation, etc.)
- **Contexts**: React Context providers in `src/contexts`
- **Hooks**: Custom hooks in `src/hooks`
- **GraphQL**: Queries and mutations in `src/graphql`
- **Types**: TypeScript interfaces in `src/types`

### Backend Architecture
- **Resolvers**: GraphQL resolvers handle business logic
- **DTOs**: Input/output types in `src/dtos`
- **Middlewares**: Auth and validation middleware in `src/middlewares`
- **Helpers**: Utility functions in `src/helpers`
- **Types**: Shared types in `src/types`

### Shared UI Pattern
- Build generic, reusable components in `packages/ui`
- Keep components composable and unopinionated
- Export from `packages/ui/src/index.tsx`
- Import in apps: `import { Button, Dialog } from "ui"`

## Deployment

### Prerequisites
- Node.js 18+ (specified in `.nvmrc`)
- Yarn 1.22.22
- PostgreSQL database
- Firebase project with Authentication enabled

### Production Build
```bash
# Build all workspaces
yarn build

# Deploy backend (includes Prisma migration)
yarn workspace backend deploy
```

### Vercel Configuration
- `vercel.json` configures deployment settings
- Web client builds to `apps/web/dist`
- Backend can be deployed separately or as serverless functions

## Features

### Current Features
- 🔐 **Authentication**: Firebase-based user authentication
- 📝 **Notes**: Create, edit, delete, and organize personal notes
- 🎨 **Color Coding**: Customizable note colors
- 💬 **Comments**: Add comments to notes
- 🤝 **Sharing**: Share notes with other users
- 🌍 **i18n**: Multi-language support (English/Portuguese)
- 📱 **PWA**: Progressive Web App with offline capabilities
- 🎨 **Dark Mode**: System-aware theme support

### Roadmap
- Calendar integration
- Contact management
- Schedule/agenda features
- Real-time collaboration
- Mobile apps (React Native)

## Troubleshooting

### Common Issues

**Build Errors**
- Run `yarn install` to ensure dependencies are up to date
- Clear Turbo cache: `rm -rf .turbo`
- Clear node_modules: `rm -rf node_modules && yarn install`

**Prisma Issues**
- Regenerate client: `yarn workspace backend prisma:generate`
- Check DATABASE_URL in `apps/backend/.env`
- Ensure PostgreSQL is running

**Authentication Errors**
- Verify Firebase config in both web and backend `.env` files
- Check Firebase Admin SDK service account permissions
- Ensure Firebase Authentication is enabled in Firebase Console

**GraphQL Errors**
- Check backend server is running on correct port
- Verify Apollo Client endpoint configuration
- Check browser console for detailed error messages