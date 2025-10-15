<div align="center">

<img src="apps/web/public/logo.png" width="100" alt="Personspace Logo" />

# 🚀 Personspace

**Your personal space, organized and accessible**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16-e10098)](https://graphql.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.5-ef4444)](https://turbo.build/repo)

[Live Demo](#) • [Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

</div>

---

## 📖 About

**Personspace** is a modern, full-stack personal productivity application built as a professional portfolio project. It demonstrates best practices in monorepo architecture, GraphQL API design, real-time collaboration, and internationalization.

The application provides a unified platform for managing notes, organizing tasks, and collaborating with others—all with a beautiful, responsive UI and progressive web app capabilities.

### Why This Project?

This project showcases:
- ✅ **Full-stack TypeScript** development from frontend to backend
- ✅ **Monorepo architecture** with Turborepo for scalable codebases
- ✅ **GraphQL API design** with type-safe resolvers and queries
- ✅ **Modern React patterns** with hooks, context, and routing
- ✅ **Database modeling** with Prisma ORM
- ✅ **Authentication & authorization** using Firebase
- ✅ **Internationalization** supporting multiple languages
- ✅ **Progressive Web App** with offline capabilities
- ✅ **Clean code practices** with ESLint, Prettier, and TypeScript

---

## ✨ Features

### 📝 Notes Management
- Create, edit, and delete personal notes
- Rich text editing with formatted content
- Color-coded organization for visual categorization
- Search and filter capabilities

### 🤝 Collaboration
- Share notes with other users via email
- Real-time comments and discussions
- Manage sharing permissions

### 🌍 Internationalization
- Full multi-language support (English & Portuguese)
- Automatic language detection
- Easy to extend with additional languages

### 🔐 Authentication & Security
- Firebase Authentication integration
- Secure JWT token-based API access
- Protected routes and authorization middleware

### 📱 Progressive Web App
- Installable on desktop and mobile devices
- Offline functionality with service workers
- Responsive design for all screen sizes
- Native-like user experience

### 🎨 Modern UI/UX
- Clean, intuitive interface built with Shadcn UI
- TailwindCSS for flexible, utility-first styling
- Radix UI primitives for accessibility
- Dark mode support (system-aware)
- Smooth animations and transitions

---

## 🛠 Tech Stack

### Frontend (`apps/web`)
- **React 19** - Latest React with concurrent features
- **Vite 6** - Lightning-fast build tool and dev server
- **TypeScript 5.9** - Type-safe JavaScript
- **Apollo Client** - GraphQL state management
- **React Router 7** - Declarative routing with data APIs
- **TailwindCSS 4** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible component library
- **i18next** - Internationalization framework
- **Vite PWA** - Progressive Web App support

### Backend (`apps/backend`)
- **Node.js + Express** - Web server framework
- **TypeGraphQL** - TypeScript-first GraphQL schema
- **Apollo Server** - Production-ready GraphQL server
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Robust relational database
- **Firebase Admin** - Authentication & authorization
- **class-validator** - Decorator-based validation

### Shared Packages
- **`packages/ui`** - Shared React component library
- **`packages/eslint-config-custom`** - Unified linting rules
- **`packages/tsconfig`** - Shared TypeScript configurations

### Development Tools
- **Turborepo** - High-performance monorepo build system
- **Yarn Workspaces** - Dependency management
- **ESLint** - Code quality and consistency
- **Prettier** - Opinionated code formatting
- **Husky** - Git hooks for quality gates
- **lint-staged** - Run linters on staged files

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **Yarn** 1.22.22 or higher (`npm install -g yarn`)
- **PostgreSQL** database
- **Firebase** project with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personspace.git
   cd personspace
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**

   **Backend** (`apps/backend/.env`):
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```
   Edit `apps/backend/.env` with your credentials:
   ```env
   # Firebase Admin SDK
   API_KEY=your_firebase_api_key
   AUTH_DOMAIN=your_project.firebaseapp.com
   PROJECT_ID=your_firebase_project_id
   STORAGE_BUCKET=your_project.appspot.com
   MESSAGING_SENDER_ID=your_sender_id
   APP_ID=your_app_id
   MEASUREMENT_ID=your_measurement_id

   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/personspace"
   ```

   **Web Client** (`apps/web/.env`):
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```
   Edit `apps/web/.env` with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Set up the database**
   ```bash
   yarn workspace backend prisma:push
   yarn workspace backend prisma:generate
   ```

5. **Start development servers**

   **Option 1: Run all workspaces**
   ```bash
   yarn dev
   ```

   **Option 2: Run individually**
   ```bash
   # Terminal 1 - Backend
   yarn dev --filter=backend

   # Terminal 2 - Web Client
   yarn dev --filter=web
   ```

6. **Open the application**
   - Web client: http://localhost:5173
   - GraphQL playground: http://localhost:4000/graphql

---

## 📦 Project Structure

```
personspace/
├── apps/
│   ├── web/                 # React + Vite web application
│   │   ├── src/
│   │   │   ├── components/  # Reusable React components
│   │   │   ├── pages/       # Route-level page components
│   │   │   ├── contexts/    # React Context providers
│   │   │   ├── graphql/     # GraphQL queries & mutations
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── languages/   # i18n translation files
│   │   │   ├── layout/      # Layout shell components
│   │   │   └── types/       # TypeScript type definitions
│   │   └── vite.config.ts
│   │
│   └── backend/             # TypeGraphQL + Apollo Server
│       ├── src/
│       │   ├── resolvers/   # GraphQL resolvers
│       │   ├── dtos/        # Data transfer objects
│       │   ├── middlewares/ # Auth & validation middleware
│       │   ├── helpers/     # Utility functions
│       │   └── server.ts    # Server entry point
│       └── prisma/
│           └── schema.prisma # Database schema
│
├── packages/
│   ├── ui/                  # Shared React component library
│   │   └── src/
│   │       ├── components/  # Shadcn UI components
│   │       └── index.tsx    # Package exports
│   │
│   ├── eslint-config-custom/  # Shared ESLint configuration
│   └── tsconfig/              # Shared TypeScript configs
│
├── turbo.json              # Turborepo pipeline configuration
├── package.json            # Root workspace configuration
└── yarn.lock              # Dependency lock file
```

---

## 🔧 Available Scripts

### Root Level Commands

```bash
# Install dependencies
yarn install

# Run all workspaces in development
yarn dev

# Build all workspaces for production
yarn build

# Run linting across all workspaces
yarn lint

# Format code with Prettier
yarn format

# Start production backend server
yarn start
```

### Workspace-Specific Commands

```bash
# Web client
yarn dev --filter=web         # Start Vite dev server
yarn build --filter=web       # Build for production

# Backend
yarn dev --filter=backend     # Start with hot reload
yarn build --filter=backend   # Build for production

# Database operations
yarn workspace backend prisma:generate  # Generate Prisma client
yarn workspace backend prisma:push      # Push schema changes
yarn workspace backend prisma:migrate   # Run migrations

# UI components
cd packages/ui
npx shadcn@latest add <component>  # Add Shadcn component
```

---

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:

- **User** - User accounts with Firebase authentication
- **Note** - Personal notes with rich content
- **NoteComment** - Comments on shared notes
- **NoteShare** - Sharing relationships between users and notes

See `apps/backend/prisma/schema.prisma` for the complete schema definition.

---

## 🌐 API Documentation

The GraphQL API is self-documenting. Start the backend and visit:

```
http://localhost:4000/graphql
```

### Key Queries
- `me` - Get current authenticated user
- `notes` - Fetch user's notes
- `sharedNotes` - Get notes shared with user
- `noteComments` - Retrieve comments on a note

### Key Mutations
- `createNote` - Create a new note
- `updateNote` - Update existing note
- `deleteNote` - Remove a note
- `shareNote` - Share note with another user
- `addNoteComment` - Add comment to a note

---

## 🚢 Deployment

### Vercel (Recommended for Frontend)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy web client**
   ```bash
   cd apps/web
   vercel --prod
   ```

### Backend Deployment

The backend can be deployed to any Node.js hosting provider:

- **Railway** - Simple PostgreSQL + Node.js deployment
- **Render** - Free tier available with PostgreSQL
- **Heroku** - Classic PaaS option
- **AWS/GCP/Azure** - Enterprise-grade infrastructure

**Production deployment checklist:**
1. Run database migrations: `yarn workspace backend prisma:migrate`
2. Build backend: `yarn build --filter=backend`
3. Set environment variables on hosting platform
4. Start server: `yarn start`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/personspace/issues).

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Adding tests

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

<img src="https://contrib.rocks/image?repo=RichardPompeo/personspace" alt="image of authors"/> 

**Richard Pompeo**

- LinkedIn: [linkedin.com/in/richardpompeoquintanavalenca](https://www.linkedin.com/in/richardpompeoquintanavalenca/)
- GitHub: [github.com/richardpompeo](https://github.com/RichardPompeo/)
- Portfolio: [richardpompeo.com.br](https://richardpompeo.com.br/)

**Mauricio Felipe**

- LinkedIn: [linkedin.com/in/mfelipesilva](https://www.linkedin.com/in/mfelipesilva/)
- GitHub: [github.com/mutadofs](https://github.com/mutadofs/)
- Portfolio: [mfelipesilva-v2.com.br](https://mfelipesilva-v2.vercel.app/)


---

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Vercel](https://vercel.com/) for Turborepo and hosting
- [Firebase](https://firebase.google.com/) for authentication services
- The amazing open-source community

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and TypeScript

</div>
