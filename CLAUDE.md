# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # Type-check + production build
npm run lint         # Run ESLint
npm run typecheck    # Type-check without emitting
npm run check        # Lint + typecheck together
npm run preview      # Preview production build
```

The app expects a backend API at `http://localhost:3000/api` (set via `VITE_API_URI` in `.env`).

## Architecture

This is an educational platform for learning data structures and algorithms with interactive visualizations. React 19 + TypeScript + Vite + Tailwind CSS 4.

### Feature-first structure

`src/features/` is the primary location for business logic. Each feature is self-contained:

```
src/features/<feature>/
  api/        # Fetch-based API calls
  pages/      # Route-level components
  components/ # Feature-specific components
  types/      # Feature-specific types
  router/     # React Router route definitions
```

Features: `auth`, `computer-science`, `mathematics`, `modules`, `subjects`, `dashboards`, `lessons`, `profiles`, `services`.

### Component system

`src/components/` follows atomic design — `atoms/` → `molecules/` → `organisms/`. These are shared UI primitives reused across features.

### State management

- **Zustand** (`src/store/`) for global client state — algorithm visualization state, lecture progress, UI toggles. Stores use `persist` middleware to sync to localStorage.
- **TanStack React Query** for server data with localStorage persistence via `@tanstack/query-sync-storage-persister`.

### Algorithm visualizer

The core interactive feature lives in `src/features/computer-science/algorithms/`. It drives step-by-step sorting/searching visualizations using GSAP animations. The visualizer state (current step, array, comparisons, etc.) is managed in `src/store/useAlgorithmStore.ts`.

### AI service layer

OpenAI integration follows clean architecture in `src/features/services/` — repository interfaces, use cases, and infrastructure implementations are separated. Used for AI-powered explanations throughout the app.

### Styling

Tailwind CSS 4 via the Vite plugin (no `tailwind.config.ts` needed for most config). SCSS in `src/styles/` defines semantic tokens and theme definitions. `next-themes` handles dark/light mode via `src/context/`.

### Routing

React Router v7 with route definitions split per feature under each feature's `router/` directory, composed in `src/router.tsx`. Includes error boundaries and breadcrumb support.

### Utilities

`src/libs/utils/` — shared helpers including `clsx` + `tailwind-merge` integration. `src/hooks/` — custom hooks for auth state, typewriter effects, form handling.
