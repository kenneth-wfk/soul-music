# AI Agent Instructions & Context

## Project Overview
This is the monorepo for Soul Performing Music, containing applications for music school management, event ticketing, and public-facing websites.

## Key Apps
- **apps/soul-music-main**: Music school landing page (production app)
- **apps/2020-kham-info**: Music & arts festival teaser page
- **apps/2026-kham-info**: Festival landing page
- **archive/**: Older versions & archived apps

## Packages
- **packages/ui-core**: Shared UI components (Tailwind + shadcn/ui + Framer Motion)
- **packages/core-logic**: Shared business logic & Appwrite integrations

## Guidelines for Agents
1. Follow the project context in `.agent/project_context.md`
2. Maintain consistent design system (glass-panel, vibrant colors: teal #008080, pink #FF1493, gold #FFD700)
3. Use pnpm for package management
4. Use Turbo for monorepo tasks

## Next.js Notes
This project uses Next.js 16 with App Router. Check `node_modules/next/dist/docs/` for specific API details.
