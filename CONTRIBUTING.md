# Contributing to Personspace

First off, thank you for considering contributing to Personspace! It's people like you that make this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Need Help?](#need-help)

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. Please be respectful and considerate in all interactions.

### Our Standards

- Be friendly and patient
- Be welcoming and inclusive
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/personspace.git
   cd personspace
   ```
3. **Install dependencies**:
   ```bash
   yarn install
   ```
4. **Set up environment variables** (see README.md)
5. **Create a branch** for your changes:
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots or GIFs** if applicable
- **Environment details** (OS, Node version, browser)
- **Error messages or logs**

**Use this template:**
```markdown
**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g. macOS 14.0]
- Node: [e.g. 18.17.0]
- Browser: [e.g. Chrome 120]
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please:
- **Check existing feature requests** first
- **Provide clear use cases** for the feature
- **Explain how it benefits users**
- **Consider implementation complexity**

### 📝 Improving Documentation

Documentation improvements are always appreciated:
- Fix typos or unclear explanations
- Add missing documentation
- Improve code examples
- Translate documentation

### 💻 Contributing Code

We love code contributions! Here's how:

1. **Pick an issue** or create one for your feature
2. **Comment on the issue** to claim it
3. **Follow the development workflow** (see below)
4. **Submit a pull request** when ready

---

## Development Workflow

### 1. Set Up Development Environment

```bash
# Install dependencies
yarn install

# Set up environment variables
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
# Edit .env files with your credentials

# Set up database
yarn workspace backend prisma:push
yarn workspace backend prisma:generate
```

### 2. Start Development Servers

```bash
# Option 1: Run all workspaces
yarn dev

# Option 2: Run individually
yarn dev --filter=backend  # Terminal 1
yarn dev --filter=web      # Terminal 2
```

### 3. Make Your Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Run linting
yarn lint

# Build to ensure no errors
yarn build --filter=web
yarn build --filter=backend
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

### 6. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Then create a Pull Request on GitHub.

---

## Coding Standards

### TypeScript

- **Use TypeScript** for all new files
- **Define proper types** - avoid `any`
- **Use interfaces** for object shapes
- **Use enums** for fixed sets of values

```typescript
// Good
interface User {
  id: string;
  email: string;
  displayName: string | null;
}

// Bad
const user: any = { ... };
```

### React Components

- **Use functional components** with hooks
- **Keep components focused** - single responsibility
- **Extract custom hooks** for reusable logic
- **Use proper prop types**

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### Naming Conventions

- **PascalCase** for components, interfaces, types, classes
- **camelCase** for variables, functions, hooks
- **UPPER_CASE** for constants
- **Suffix resolvers** with `Resolver` (e.g., `NotesResolver`)

```typescript
// Components
export function UserProfile() { ... }

// Hooks
export function useAuth() { ... }

// Constants
const MAX_NOTES = 100;

// Resolvers
@Resolver()
export class NotesResolver { ... }
```

### File Organization

```
components/
├── notes/
│   ├── NoteCard.tsx
│   ├── NoteList.tsx
│   ├── CreateNoteDialog.tsx
│   └── EditNoteDialog.tsx
└── auth/
    ├── LoginForm.tsx
    └── SignupForm.tsx
```

### Styling

- **Use TailwindCSS** utility classes
- **Use `clsx` or `cn`** for conditional classes
- **No inline styles** unless absolutely necessary
- **Follow Shadcn UI patterns** for components

```typescript
// Good
<div className="flex items-center gap-4 rounded-lg bg-background p-4">

// Good - conditional classes
<button className={cn(
  "rounded px-4 py-2",
  isActive && "bg-primary text-white"
)}>

// Avoid - inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

### Internationalization

- **All user-facing text** must use i18n
- **Add translations** to both `en.json` and `pt.json`
- **Use semantic keys** for translations

```typescript
// Good
const { t } = useTranslation();
<h1>{t("notes.title")}</h1>

// Bad - hardcoded text
<h1>Notes</h1>
```

### Error Handling

- **Always handle errors** gracefully
- **Show user-friendly messages**
- **Log errors** for debugging

```typescript
try {
  await updateNote({ variables: { input } });
  toast.success(t("notes.updateSuccess"));
} catch (error) {
  console.error("Failed to update note:", error);
  toast.error(t("notes.updateError"));
}
```

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (deps, config, etc.)
- **ci**: CI/CD changes

### Examples

```bash
# Feature
feat(notes): add note sharing functionality

# Bug fix
fix(auth): resolve token refresh race condition

# Documentation
docs(readme): add deployment instructions

# Chore
chore(deps): update Apollo Client to v4.0.7

# Breaking change
feat(api)!: change note sharing API structure

BREAKING CHANGE: shareNote mutation now requires userId instead of email
```

### Scope

Use the area of the codebase affected:
- `notes` - Note-related features
- `auth` - Authentication
- `ui` - UI components
- `api` - Backend API
- `deps` - Dependencies
- `config` - Configuration

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] All linting checks pass (`yarn lint`)
- [ ] Build succeeds without errors (`yarn build`)
- [ ] Commit messages follow conventional commits
- [ ] Documentation is updated if needed
- [ ] Translations added for new text (EN + PT)

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #123
Relates to #456

## How Has This Been Tested?
Describe the tests you ran and how to reproduce them.

## Screenshots (if applicable)
Add screenshots or GIFs demonstrating the changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added translations for any new text (EN + PT)
```

### Review Process

1. **Automated checks** will run (linting, build)
2. **Maintainer review** will be assigned
3. **Address feedback** by pushing new commits
4. **Approval** - Once approved, your PR will be merged

### After Merge

- Your contribution will be included in the next release
- You'll be added to the contributors list
- Thank you for making Personspace better! 🎉

---

## Project Structure

### Monorepo Layout

```
personspace/
├── apps/
│   ├── web/              # React frontend
│   └── backend/          # GraphQL backend
├── packages/
│   ├── ui/               # Shared components
│   ├── eslint-config-custom/
│   └── tsconfig/
└── ...
```

### Key Files

- `turbo.json` - Turborepo configuration
- `package.json` - Root workspace config
- `AGENTS.md` - AI agent guidelines
- `README.md` - Project documentation

### Frontend (`apps/web`)

```
src/
├── components/       # React components
├── pages/           # Route pages
├── contexts/        # React contexts
├── graphql/         # GraphQL queries/mutations
├── hooks/           # Custom hooks
├── languages/       # i18n translations
├── layout/          # Layout components
├── types/           # TypeScript types
└── main.tsx        # App entry point
```

### Backend (`apps/backend`)

```
src/
├── resolvers/       # GraphQL resolvers
├── dtos/            # Data transfer objects
├── middlewares/     # Auth, validation
├── helpers/         # Utility functions
├── types/           # Type definitions
└── server.ts       # Server entry point
```

---

## Testing

### Current State

- Automated tests are not yet implemented
- Manual testing is required for all changes

### Manual Testing Checklist

- [ ] Test in development mode (`yarn dev`)
- [ ] Test production build (`yarn build && yarn start`)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test authentication flow
- [ ] Test error scenarios

### Future Testing

We plan to add:
- Unit tests with Vitest
- Integration tests with React Testing Library
- E2E tests with Playwright

Contributions to set up testing infrastructure are welcome!

---

## Need Help?

### Resources

- **Documentation**: See README.md and AGENTS.md
- **Issues**: Check [existing issues](https://github.com/yourusername/personspace/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/yourusername/personspace/discussions)

### Questions?

- Create a new discussion
- Tag issues with `question` label
- Reach out to maintainers

### Stuck?

Don't worry! We're here to help:
1. Check the documentation
2. Search existing issues
3. Ask in discussions
4. Create a new issue with `help wanted` label

---

## Recognition

All contributors will be recognized in:
- Project README
- Release notes
- Contributors page (coming soon)

Thank you for contributing to Personspace! 🚀

---

**Happy coding!** ❤️