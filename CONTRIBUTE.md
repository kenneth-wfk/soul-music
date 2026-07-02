# Contributing to Soul Performing Music

Thank you for your interest in contributing!

## Getting Started

1. **Prerequisites**
   - Node.js >= 20.0.0
   - pnpm >= 10.0.0

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Run Development Server**
   ```bash
   # All apps
   pnpm run dev

   # Specific app
   pnpm run dev:soul-music-main
   pnpm run dev:2020-kham-info
   ```

4. **Build for Production**
   ```bash
   # All apps
   pnpm run build

   # Specific app
   pnpm run build:soul-music-main
   ```

## Project Structure

```
soulfest/
├── apps/                # Next.js applications
│   ├── soul-music-main/ # Music school landing page
│   ├── 2020-kham-info/  # Festival teaser page
│   └── 2026-kham-info/  # Festival landing page
├── packages/            # Shared packages
│   ├── ui-core/         # Shared UI components
│   └── core-logic/      # Shared business logic
└── docs/                # Documentation
```

## Code Guidelines

- Use TypeScript for all new code
- Follow the existing design system (glass-panel, vibrant colors)
- Use components from `packages/ui-core` when possible
- Write clear commit messages

## Commit Messages

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation updates
- `style:` Code style/formatting
- `refactor:` Code refactoring
- `test:` Testing updates
