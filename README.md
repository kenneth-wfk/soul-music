# Soul Performing Music - Apps Solutions

This is a modern monorepo apps solution for Soul Performing Music. The solutions cover for Soul Performing Music School, as well as special events such as Soulfest etc. It contains public-facing information portal, music school management system, event ticketing system, event public-facing portal and related admin portal as needed

The content after this line will need revision and update.


## 🏗️ Monorepo Structure

This repository uses **pnpm workspaces** and **Turborepo** to tightly integrate the frontend applications and shared logic.

### Applications (`apps/`)

- `soul-music-main`: The music school landing page.
- `2020-kham-info`: The music and art festival landing page for teasing upcoming events.

### Shared Packages (`packages/`)

- `@soulfest/ui-core`: The shared UI library built over **Tailwind CSS** and **shadcn/ui** and **Framer Motion**. It enforces a consistent vibrant and glassmorphic aesthetic. Contains:
  - `BottomNavigation` — Generic, prop-driven sticky bottom tab bar (used by `ticketing-app`).
  - `utils` — `cn()` helper for merging Tailwind classes.
- `@soulfest/core-logic`: Shared business logic layer. This acts as our **Serverless Backend Hub**, encapsulating Appwrite Node integrations, database queries, and validation logic so that `ticketing-app` and `admin-portal` can securely invoke backend ops directly inside their Next.js routes. _(Note: The dedicated `api-server` workspace is currently marked as KIV for future websocket requirements, in favor of this highly efficient serverless pattern)._

---

## 🚀 Getting Started

Ensure you have [Node.js](https://nodejs.org/) (v18+) and `pnpm` installed.

### 1. Install Dependencies

From the root directory, simply run:

```bash
pnpm install
```

This will automatically traverse the workspaces and install all required modules for the apps and shared packages.

### 2. Configure Environment Variables

Copy the example environment file to create your own local configuration:

```bash
cp .env.example .env.local
```

Then, update `.env.local` with your Appwrite API credentials so the system can connect to the database.

### 3. Start Development Servers

You can spin up all applications simultaneously with Turborepo:

```bash
pnpm run dev
```

By default, Turborepo will start both applications.

#### Running a Single App

To run just one application, you can use the predefined pnpm scripts:

```bash
pnpm run dev:soul-music-main
# or
pnpm run dev:2020-kham-info
```

---

## 🛠️ Build & Production

To build all apps and packages for production:

```bash
pnpm run build
```

#### Building a Single App

To build just one application, use the predefined pnpm scripts:

```bash
pnpm run build:soul-music-main
# or
pnpm run build:2020-kham-info
```

Turborepo intelligently caches the builds, meaning if a specific app hasn't been changed, it will serve the build from cache instantly.

---

## 🚀 Deployment

This monorepo is optimized for deployment on both **Appwrite** (Next.js SSR) and **Coolify** (Nixpacks).

### ☁️ Appwrite (SSR Mode)

Appwrite Site natively supports Next.js with `output: 'standalone'` configured in `next.config.ts`. Combined with Turborepo, the following configuration is used:

| Setting             | Value                                             |
| :------------------ | :------------------------------------------------ |
| **Build Command**   | `pnpm run build` (or relevant build command)      |
| **Build Output**    | `./apps/soul-music-main/.next` (or relevant app path) |
| **Node.js Runtime** | `18` or later                                     |

### 🛠️ Coolify (Nixpacks Mode)

Coolify's Nixpacks builder handles monorepo structures natively.

| Setting            | Value                                |
| :----------------- | :----------------------------------- |
| **Base Directory** | `apps/soul-music-main` (or relevant app) |
| **Build Command**  | `pnpm run build:soul-music-main`     |
| **Build Output**   | _Leave Blank_                        |

---

## 🤖 AI Agent Context

Note: AI Coding Assistants should refer to `.agent/project_context.md` for persistent architectural specifications, aesthetic guidelines, and current development phase tracking.
