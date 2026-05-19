# Feature: profiles

Fetches and displays user profile data. Profile information (display name, avatar, role) is used across the app by other features — the Navbar, auth guards, and permission checks all depend on the profile.

---

## Responsibilities

- Fetch the current user's profile by ID
- Expose the `ProfileImage` component for avatar display
- Provide the `UserProfile` type used across the app

---

## Structure

```
profiles/
  api/
    getProfile.ts               # GET /api/profiles/:id
  components/
    ProfileImage.tsx            # Renders avatar with fallback initials
  hooks/
    UseGetProfile.tsx           # TanStack Query: GET /api/profiles/:id
  types/
    UserProfile.type.ts         # { id, email, displayName, avatarUrl, role, createdAt }
```

---

## Notes

Profile data for the **authenticated user** is fetched via `useGetMe()` in the `auth` feature (which calls `GET /api/auth/me` and returns the full profile). The `profiles` feature is used when fetching a profile by explicit ID — for example, viewing another user's public profile or for admin operations.
