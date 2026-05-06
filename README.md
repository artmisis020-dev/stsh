# Starshield

Monorepo for a Terminal KIT management system with a React frontend and NestJS backend.

The product lets clients submit Terminal KIT activation or deactivation requests, while administrators review users, process pending Terminal KIT actions, create provider requests, and enter provider results manually.

## Tech Stack

### Monorepo

- `pnpm` workspaces
- `Turborepo`
- `TypeScript 6.0.2`

### Frontend

- `React 19`
- `Vite`
- `React Router`
- `@tanstack/react-query`
- `Axios`
- `React Hook Form`
- `Tailwind CSS 4`
- lightweight internal i18n with `English` and `Ukrainian`

### Backend

- `NestJS`
- `Prisma`
- `SQLite` for current local development
- `PostgreSQL` as the target production / integration database
- `JWT`
- `bcryptjs`
- `class-validator` / `class-transformer`

### Shared

- shared DTOs
- shared enums
- shared domain contracts between frontend and backend

## Repository Structure

```text
.
├── apps/
│   ├── frontend/                  # React + Vite client app
│   │   ├── src/
│   │   │   ├── components/        # Reusable UI and feature components
│   │   │   ├── constants/         # App constants and validation helpers
│   │   │   ├── hooks/             # React Query and custom hooks
│   │   │   ├── i18n/              # Translation provider and i18n types
│   │   │   ├── locales/           # English and Ukrainian dictionaries
│   │   │   ├── pages/             # Route pages
│   │   │   ├── router/            # App router
│   │   │   ├── services/          # API client and HTTP services
│   │   │   └── types/             # Frontend-specific types
│   │   └── package.json
│   └── backend/                   # NestJS API
│       ├── prisma/
│       │   ├── schema.prisma      # Prisma schema
│       │   └── init.sql           # Initial SQL bootstrap script
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── client-requests/
│       │   │   ├── health/
│       │   │   ├── id-actions/    # Terminal KIT actions route/service module
│       │   │   ├── prisma/
│       │   │   ├── provider-requests/
│       │   │   └── users/
│       │   ├── app.module.ts
│       │   └── main.ts
│       └── package.json
├── packages/
│   ├── shared/                    # Shared DTOs and enums
│   └── config/                    # Workspace package placeholder
├── docs/
│   └── project.md                 # Product/domain spec
├── .env
├── package.json                   # Root scripts
├── turbo.json
├── tsconfig.base.json
└── README.md
```

## Current Frontend Pages

- `/login`
- `/register`
- `/terminal-kits`
- `/admin`

## Current Backend API Areas

- `/api/auth`
- `/api/users`
- `/api/client-requests`
- `/api/terminal-kit-actions`
- `/api/provider-requests`
- `/api/health`

## Requirements

Before running the project, make sure you have:

- `Node.js` installed
- `pnpm` installed

## Environment Variables

Root `.env` currently contains:

```env
# Frontend envs can live in apps/frontend/.env.
# This root file is intentionally kept minimal to avoid Prisma env conflicts.
```

Backend envs live in `apps/backend/.env`.
Frontend envs live in `apps/frontend/.env`.

## Installation

Install all workspace dependencies from the repository root:

```bash
pnpm install
```

## Running the Project

### Run frontend and backend together

From the repository root:

```bash
pnpm dev
```

This uses Turbo and starts all workspace `dev` scripts in parallel.

### Run only frontend

```bash
pnpm --filter @starshield/frontend dev
```

Frontend default dev server:

- `http://localhost:3000`

### Run only backend

```bash
pnpm --filter @starshield/backend dev
```

Backend default API server:

- `http://localhost:3003`
- API prefix: `/api`

## Useful Scripts

### Root

- `pnpm dev` — run all workspace dev scripts in parallel
- `pnpm build` — build all workspaces through Turbo
- `pnpm lint` — run lint scripts across workspaces
- `pnpm test` — run test scripts across workspaces
- `pnpm typecheck` — run typechecking across workspaces

### Frontend

- `pnpm --filter @starshield/frontend dev`
- `pnpm --filter @starshield/frontend build`
- `pnpm --filter @starshield/frontend preview`
- `pnpm --filter @starshield/frontend lint`
- `pnpm --filter @starshield/frontend typecheck`

### Backend

- `pnpm --filter @starshield/backend dev`
- `pnpm --filter @starshield/backend build`
- `pnpm --filter @starshield/backend start`
- `pnpm --filter @starshield/backend lint`
- `pnpm --filter @starshield/backend typecheck`
- `pnpm --filter @starshield/backend prisma:generate`
- `pnpm --filter @starshield/backend prisma:migrate:dev`
- `pnpm --filter @starshield/backend db:init`

## Database Setup

There are currently two main DB-related paths:

### Current local dev mode

The backend is currently configured to use `SQLite` through Prisma for faster local flow testing.

That means:

- no PostgreSQL server is required right now
- the local database file is created at `apps/backend/prisma/dev.db`
- `db:init` uses Prisma schema sync instead of `psql`

### Option 1: Initialize local SQLite schema

```bash
pnpm --filter @starshield/backend db:init
```

This now runs:

```bash
prisma db push --schema prisma/schema.prisma
```

### Option 2: Use Prisma workflow

Generate Prisma client:

```bash
pnpm --filter @starshield/backend prisma:generate
```

Create/apply local migrations:

```bash
pnpm --filter @starshield/backend prisma:migrate:dev
```

`apps/backend/prisma/init.sql` is still in the repository as a reference for the PostgreSQL-oriented schema direction, but the current local dev path is SQLite with Prisma.

## Notes About Current State

- The main auth, user approval, client request, pending action, and provider request flows are wired to Prisma/SQLite.
- The frontend still does not send auth tokens on client requests yet, so the backend currently uses a pragmatic "current client" lookup for local flow testing.
- The frontend already includes:
  - client auth pages
  - Terminal KIT request page
  - admin dashboard
  - English/Ukrainian language switching
- Terminal KIT naming has replaced the older business term `ID` in the domain model, shared contracts, and most UI/API areas.

## Main Domain Files

Useful places to start:

- Spec: [docs/project.md](docs/project.md)
- Frontend router: [apps/frontend/src/router/AppRouter.tsx](apps/frontend/src/router/AppRouter.tsx)
- Frontend i18n: [apps/frontend/src/i18n/I18nProvider.tsx](apps/frontend/src/i18n/I18nProvider.tsx)
- Backend app module: [apps/backend/src/app.module.ts](apps/backend/src/app.module.ts)
- Prisma schema: [apps/backend/prisma/schema.prisma](apps/backend/prisma/schema.prisma)
- Shared DTOs/enums: [packages/shared/src/index.ts](packages/shared/src/index.ts)

## Development Tips

- Run installs and workspace scripts from the repository root.
- If you change shared DTOs or enums, verify both frontend and backend compile.
- If you update Prisma schema, regenerate the client afterward.
- Keep UI strings in the translation dictionaries so both languages stay in sync.
