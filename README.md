# LearnNoir — Frontend

React 19 + Vite web application for the LearnNoir educational platform. Provides interactive lessons, algorithm visualisations, quizzes, coding exercises, a teacher dashboard, and subscription management.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Routing](#routing)
- [State Management](#state-management)
- [Theming](#theming)
- [Features](#features)
- [Subjects](#subjects)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Language | TypeScript 6 (strict) |
| Routing | React Router v7 |
| Server state | TanStack Query v5 |
| Client state | Zustand v5 |
| Styling | TailwindCSS 4 + SCSS modules |
| Animation | GSAP 3 + `@gsap/react` |
| Code editor | Monaco Editor (`@monaco-editor/react`) |
| Icons | Lucide React |
| HTTP | `fetch` (no Axios) |
| Error tracking | Sentry |
| Confetti | canvas-confetti |

---

## Architecture

The codebase is split into **features** (user-facing domains) and **subjects** (curriculum-specific views). Both follow an atomic design hierarchy for components.

### Feature structure

```
src/features/<name>/
  api/          <- fetch wrappers for backend endpoints
  components/
    atoms/      <- smallest UI units (buttons, badges, inputs)
    molecules/  <- composed atoms (form fields, cards)
    organisms/  <- full sections (tables, panels)
  hooks/        <- React Query hooks + controller hooks
  lib/          <- pure utilities, mappers, helpers
  pages/        <- route-level page components
  store/        <- Zustand slices (feature-local state)
  types/        <- TypeScript types
  router/       <- route definitions for this feature
```

### Subjects structure

```
src/subjects/<subject>/
  <topic>/
    components/   <- visualisers, lesson renderers
    hooks/        <- topic-specific hooks
    pages/        <- topic page components
  <subject>.routes.tsx
```

---

## Project Structure

```
frontend/src/
├── App.tsx                    # Root layout, global providers
├── router.tsx                 # Top-level router (createBrowserRouter)
├── main.tsx                   # React DOM entry point
├── ErrorBoundary.tsx
├── RouteErrorPage.tsx
├── components/                # Shared global components (Navbar, layouts, atoms)
├── content/                   # Static nav/sidebar/tab data
├── context/
│   └── ThemeProvider.tsx
├── hooks/                     # Cross-feature hooks (auth guard, typewriter, etc.)
├── libs/
│   ├── config.ts              # API base URL (VITE_API_URI)
│   ├── queryClient.ts         # TanStack Query client + persister config
│   └── utils/                 # cn(), slugToText, formatRelative, crumbs, etc.
├── shared/                    # Shared type contracts (lesson, block, activity)
├── store/                     # Global Zustand stores
├── styles/                    # SCSS design tokens + component styles
├── features/
│   ├── auth/
│   ├── categories/
│   ├── dashboards/
│   ├── home/
│   ├── lessons/
│   ├── modules/
│   ├── profiles/
│   ├── subjects/
│   └── subscriptions/
└── subjects/
    ├── computer-science/
    └── mathematics/
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Create .env
echo "VITE_API_URI=http://localhost:3000/api" > .env

# Start dev server (port 5173)
npm run dev

# Type-check
npm run typecheck

# Lint + typecheck together
npm run check

# Production build
npm run build
```

---

## Routing

Routes are defined with React Router v7 `createBrowserRouter`. Each feature owns its route slice and exports it to be composed into the root router.

```
/                                                → Home (landing page)
/pricing                                         → PricingPage
/payment/success                                 → PaymentSuccessPage

/auth/login                                      → LoginPage
/auth/register                                   → RegisterPage

/dashboard/*                                     → Teacher/admin dashboard (protected)

/subjects/                                       → SubjectsPage (catalog)
/subjects/:subject/                              → CategoriesListPage
/subjects/:subject/:category/                    → ModulesListPage
/subjects/:subject/:category/:module/            → LessonListPage
/subjects/:subject/:category/:module/:lessonSlug → LessonPage
```

Route loaders handle breadcrumb label resolution and category/module validation before render.

---

## State Management

| Store | Location | Purpose |
|---|---|---|
| `useLastLessonStore` | `store/` | Remembers the last visited lesson (persisted) |
| `useAlgorithmStore` | `store/` | Current algorithm state + step |
| `useLectureStore` | `store/` | Lecture/theory read state |
| `useFeedbackStore` | `store/` | Component feedback UI state |
| `useToggleStore` | `store/` | Generic sidebar/panel toggles |
| `useVisualAlgorithmUIStore` | `store/` | Visualiser UI settings |
| `useGuestProgressStore` | `features/lessons/store/` | Progress for unauthenticated users |
| `useLessonAIStore` | `features/lessons/store/` | AI review panel state |
| `useLessonEditStore` | `features/lessons/store/` | Teacher edit mode state |

Server state (API data) is managed entirely by **TanStack Query** with a `localStorage` persister for offline resilience.

---

## Theming

Themes are driven by CSS design tokens defined in `src/styles/tokens/`. Two themes exist — `light` and `dark` — toggled by `ThemeProvider` (wraps `next-themes`). The active theme class is applied to `<html>`. Components reference semantic tokens (`--text-primary`, `--border`, `--surface`, etc.) rather than raw Tailwind colours.

---

## Features

| Feature | Description | README |
|---|---|---|
| **auth** | Login, register, auth guard hooks | [README](src/features/auth/README.md) |
| **lessons** | Lesson viewer, editor, quiz, exercises | [README](src/features/lessons/README.md) |
| **dashboards** | Teacher dashboard (lessons, students, stats) | [README](src/features/dashboards/README.md) |
| **subjects** | Subject catalog with filters | [README](src/features/subjects/README.md) |
| **categories** | Category browser with grouped modules | [README](src/features/categories/README.md) |
| **modules** | Module listing per category | [README](src/features/modules/README.md) |
| **subscriptions** | Pricing page, paywall banner, payment success | [README](src/features/subscriptions/README.md) |
| **profiles** | User profile data | [README](src/features/profiles/README.md) |

---

## Subjects

| Subject | Description | README |
|---|---|---|
| **computer-science** | Algorithms + data structures with visualisers | [README](src/subjects/computer-science/README.md) |
| **mathematics** | Math theory lessons | [README](src/subjects/mathematics/README.md) |
