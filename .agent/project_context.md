# Soulfest Context & AI Memory

## Core Objective
Soulfest is a music festival platform encompassing a public site, a ticketing system, and an admin portal. 

## Technical Architecture
- **Monorepo**: Turborepo inside npm workspaces.
- **Frontend Applications**: Next.js App Router for `public-site`, `ticketing-app`, and `admin-portal`.
- **UI System**: `shadcn/ui` with Tailwind CSS, utilizing Framer Motion for highly-polished, premium glassmorphic animations and a "WOW" experience.
- **Backend & DB**: Appwrite for authentication/DB.
- **API Strategy (Serverless First)**: Instead of relying on a running Express `api-server` daemon, core backend business logic (checkout handling, validation) is centralized in `packages/core-logic` and invoked securely by Next.js Server Route Handlers `api/...` residing in each app. The `api-server` package is currently KIV (Keep in View) for potential future heavy-WebSocket needs.
- **Payments**: Initial support for manual bank slip uploads, to be transitioned to Stripe/eGHL later.

## Important Notes for AI Agents
- **Aesthetics & Branding:** The event is the "Kampar Heritage and Music Festival". Maintain a light, bright, vibrant community aesthetic (Sky Blue, Sunshine Yellow, Playful Pink). Avoid dark, aggressive, "corporate" or "underground techno" themes.
- Animations and transitions should be fluid but not overwhelming (light frosted glassmorphism, sunny gradients).
- **Maximum Reusability:** Every shared UI component, utility function, and Tailwind configuration must reside in `packages/ui-core`. Do not duplicate component logic across the apps.
- **Shared Logic:** Database clients, API fetchers, and complex business logic must be centralized in `packages/core-logic`.
- **Environment Driven Configuration:** No hardcoded URLs, ports, secrets, or API tokens. Everything configurable MUST be extracted to `.env.local` and `.env.example`. Next.js frontend variables should be prefixed with `NEXT_PUBLIC_`.

## Port Configuration
- `api-server`: `:4000`
- `public-site`: `:4001`
- `ticketing-app`: `:4002`
- `admin-portal`: `:4003`
- All ports are configurable via the `.env` file. Do NOT hardcode them.
- `ALLOWED_ORIGINS` must be set — the api-server will throw a fatal error if missing (fail-fast pattern).

## Shared Components in `@soulfest/ui-core`
- `BottomNavigation`: Generic tab-based bottom nav. Accepts `tabs: NavTab[]`, `activeTabId`, `onTabChange`, and optional `maxWidth`. Used by `ticketing-app`. Must be the only implementation for any future app that needs a bottom nav.
- Import with: `import { BottomNavigation, NavTab } from '@soulfest/ui-core'`

## App-Specific Notes
- **`ticketing-app`**: Mobile-first app shell. Container is `max-w-[768px]` (tablet portrait). Uses `BottomNavigation` from `@soulfest/ui-core`. Has 3 tabs: Tickets (QR), History, Profile.
- **`admin-portal`**: Dark blue/slate professional theme. Key feature: bank slip verification queue with Approve/Reject actions.
- **`public-site`**: Light, vibrant Kampar Heritage branding (Sky Blue, Sunshine Yellow, Playful Pink). Glassmorphic hero. Fonts served locally via `next/font/google`.

## Progress Log
- **[Init]**: Monorepo workspace (Turborepo + NPM) configured.
- **[Apps Scaffolded]**: `public-site`, `admin-portal`, `ticketing-app` Next.js apps fully scaffolded.
- **[Packages Scaffolded]**: `ui-core` and `core-logic` created and linked.
- **[Dev Environment]**: README, Turborepo scripts, and `.env.example` finalized.
- **[UI Mocks Complete]**: All three apps have full mocked UIs.
  - `public-site`: Hero + newsfeed, bright heritage theme.
  - `ticketing-app`: Mobile app shell with Tickets/History/Profile tabs + bank slip upload flow.
  - `admin-portal`: Dark dashboard with bank slip verification queue table.
- **[ui-core BottomNavigation]**: Generic `BottomNavigation` component extracted from ticketing-app into `packages/ui-core`. Old local component deleted.
- **[Next - Phase 4]**: Await Appwrite credentials to initialize DB schemas and replace mock arrays with live SDK data.
