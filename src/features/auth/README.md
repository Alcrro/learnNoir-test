# Feature: auth

Handles authentication UI — login, registration, logout, and auth state. The backend sets an `httpOnly` cookie; the frontend reads auth state through a React Query hook that calls `GET /api/auth/me`.

---

## Responsibilities

- Login and register forms with validation feedback
- `useGetMe` hook exposing the authenticated user across the app
- `GuestGuard` — redirects already-authenticated users away from auth pages
- `protectedRoute` / `requireAuth` hooks for guarding dashboard routes
- Login modal (triggered from the Navbar for inline login without leaving the page)
- Redirect countdown after successful register/login

---

## Structure

```
auth/
  api/
    login.api.ts              # POST /api/auth/login
    logout.api.ts             # POST /api/auth/logout
    me.api.ts                 # GET /api/auth/me
    registration.api.ts       # POST /api/auth/register
  components/
    Login.tsx / Register.tsx  # Page-level containers
    GuestGuard.tsx            # Redirects auth'd users to /subjects
    AuthFeedback.tsx          # Success/error message display
    atoms/                    # AuthAlreadySignedIn, AuthFeatureCard
    forms/                    # LoginForm, LogoutForm, RegisterForm
    modal/                    # LoginModal, Modal
    molecules/                # AuthNavbar, EmailFormGroup, PasswordFormGroup
    organisms/                # AuthFormPanel, AuthInfoPanel
  hooks/
    useAuth.ts                # Re-exports useGetMe for convenience
    useLogin.ts               # Mutation + error state for login
    useLoginPage.ts           # Login page controller (redirect logic)
    useLogout.ts              # Mutation + redirect after logout
    useRedirectCountdown.ts   # Countdown timer before auto-redirect
    useRegisterPage.ts        # Register page controller
    useRegistration.ts        # Mutation + error state for registration
  lib/
    authApi.shared.ts         # Shared fetch config (credentials: "include")
    authContent.ts            # Static copy for auth pages
    authQueryKeys.ts          # TanStack Query key factory
    authRedirect.ts           # Redirect helpers
  pages/
    LoginPage.tsx
    RegisterPage.tsx
  router/
    auth.routes.tsx           # /auth/login, /auth/register
  types/
    LoginTypes.type.ts
```

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/auth/login` | `LoginPage` | Email + password login |
| `/auth/register` | `RegisterPage` | New account registration |

Both pages are wrapped in `GuestGuard` — authenticated users are redirected to `/subjects`.

---

## Key Hooks

| Hook | Purpose |
|---|---|
| `useGetMe()` | TanStack Query — fetches `/api/auth/me`, stale after 10 min, refetches every 5 min |
| `useLogin()` | Mutation wrapping `POST /api/auth/login` |
| `useLogout()` | Mutation wrapping `POST /api/auth/logout`, clears query cache |
| `useRegistration()` | Mutation wrapping `POST /api/auth/register` |

---

## Auth State across the app

Any component that needs the current user calls `useGetMe()` (or `useAuth()` which re-exports it). The result contains `{ data: user, isLoading, isError }`. The `user` object has `id`, `email`, `role`, `displayName`, `avatarUrl`.

Cookie forwarding requires `credentials: "include"` on every fetch — this is set in `authApi.shared.ts` and reused by all auth API functions.
