# Soulfest App

Soulfest is a custom-built, comprehensive music festival platform structured as a modern turborepo monorepo. It manages the public-facing information portal, the secure ticketing and sales system, and the dedicated admin portal for content and inventory management.

## 🏗️ Monorepo Structure

This repository uses **npm workspaces** and **Turborepo** to tightly integrate the frontend applications and shared logic.

### Applications (`apps/`)

- `public-site`: The main Next.js App Router website for festival news and marketing.
- `ticketing-app`: The Next.js App Router application handling the performance ticket purchasing flow and checkout.
- `admin-portal`: The Next.js App Router dashboard for staff to manage newsfeed content, ticketing inventory, and verify bank slip uploads.

### Shared Packages (`packages/`)

- `@soulfest/ui-core`: The shared UI library built over **Tailwind CSS** and **shadcn/ui** and **Framer Motion**. It enforces a consistent vibrant and glassmorphic aesthetic. Contains:
  - `BottomNavigation` — Generic, prop-driven sticky bottom tab bar (used by `ticketing-app`).
  - `utils` — `cn()` helper for merging Tailwind classes.
- `@soulfest/core-logic`: Shared business logic layer. This acts as our **Serverless Backend Hub**, encapsulating Appwrite Node integrations, database queries, and validation logic so that `ticketing-app` and `admin-portal` can securely invoke backend ops directly inside their Next.js routes. _(Note: The dedicated `api-server` workspace is currently marked as KIV for future websocket requirements, in favor of this highly efficient serverless pattern)._

---

## 🚀 Getting Started

Ensure you have [Node.js](https://nodejs.org/) (v18+) and standard `npm` installed.

### 1. Install Dependencies

From the root directory, simply run:

```bash
npm install
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
npm run dev
```

By default, Turborepo will start:

- `api-server` on `http://localhost:4000`
- `public-site` on `http://localhost:4001`
- `ticketing-app` on `http://localhost:4002`
- `admin-portal` on `http://localhost:4003`

#### Running a Single App

To run just one application, you can use the predefined npm scripts:

```bash
npm run dev:public
# or
npm run dev:admin
# or
npm run dev:ticketing
# or
npm run dev:api
```

---

## 🛠️ Build & Production

To build all apps and packages for production:

```bash
npm run build
```

#### Building a Single App

To build just one application, use the predefined npm scripts:

```bash
npm run build:public
# or
npm run build:admin
# or
npm run build:ticketing
```

Turborepo intelligently caches the builds, meaning if a specific app hasn't been changed, it will serve the build from cache instantly.

To run the production build locally:

```bash
npm start
```

---

## 🚀 Deployment

This monorepo is optimized for deployment on both **Appwrite** (Next.js SSR) and **Coolify** (Nixpacks).

### ☁️ Appwrite (SSR Mode)

Appwrite Site natively supports Next.js with `output: 'standalone'` configured in `next.config.ts`. Combined with Turborepo, the following configuration is used:

| Setting             | Value                                             |
| :------------------ | :------------------------------------------------ |
| **Build Command**   | `npm run deploy:public` (or `deploy:admin`, etc.) |
| **Build Output**    | `./apps/public-site/.next` (or relevant app path) |
| **Node.js Runtime** | `18` or later                                     |

### 🛠️ Coolify (Nixpacks Mode)

Coolify's Nixpacks builder handles monorepo structures natively.

| Setting            | Value                                |
| :----------------- | :----------------------------------- |
| **Base Directory** | `apps/public-site` (or relevant app) |
| **Build Command**  | `npm run build:public`               |
| **Build Output**   | _Leave Blank_                        |

---

## 🤖 AI Agent Context

Note: AI Coding Assistants should refer to `.agent/project_context.md` for persistent architectural specifications, aesthetic guidelines, and current development phase tracking.
