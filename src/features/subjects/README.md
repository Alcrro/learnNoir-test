# Feature: subjects

Subject catalog — the top-level content directory. Displays all available subjects (Computer Science, Mathematics, etc.) with filtering by difficulty, track, and search. Each subject card links into the subject's category/module tree.

---

## Responsibilities

- Fetch and display all subjects from the API
- Filter subjects by search query, difficulty, and track
- Show catalog-level stats (total lessons, students, etc.)
- Map subject metadata (icons, colours, availability status)

---

## Structure

```
subjects/
  api/
    subjectsApi.ts              # GET /api/subjects
  components/
    SubjectIcon.tsx
    PopularBadge.tsx
    atoms/                      # SubjectChipBtn, search/filter buttons, empty state
    layouts/
      SubjectsLayout.tsx        # Outer layout shell for /subjects/*
    molecules/                  # SubjectFiltersControls, SubjectInput, SubjectProgressBar, ...
    organisms/
      SubjectsCatalogHero.tsx
      SubjectsCatalogFilters.tsx
      SubjectsCatalogStats.tsx
      AllSubjectsSection.tsx
      FeaturedSubjectsSection.tsx
      SubjectOverviewCard.tsx   # Single subject card with icon, stats, progress bar
      SubjectsFilter.tsx
      SubjectsStats.tsx
  data/
    subjects.data.ts            # Static subject list (fallback / seeding)
    subjectsCatalog.data.ts     # Catalog metadata
    subjectRegistry.ts          # Maps subject slug -> icon + colour
    subjectMetadata.ts          # Difficulty, track labels per subject
    SubjectIconCardMapper.ts
    subjectCardIconsMapper.tsx
    subjectCardClassname.ts
    subjectAccestMapper.ts      # Availability (free / pro / coming soon)
    subjectCalatokStatsMapper.ts
  hooks/
    useSubjectsQuery.ts         # TanStack Query: GET /api/subjects
    useSubjectsCatalog.ts       # Combines query + filter state + derived UI data
  lib/
    filterSubjectsCatalog.ts    # Pure filter function (search + difficulty + track)
    buildSubjectsCatalogStats.ts
    getSubjectProgress.ts
    getSubjectsStatus.ts        # Determines free/pro/coming-soon badge
    getAvailabilityCopy.ts
    getTrackCopy.ts
    subjectLoader.ts            # React Router loader (validates subject param)
  mapper/
    mapSubjectCardToSubjectDomain.ts
  pages/
    SubjectsPage.tsx            # Renders hero + filters + subject grid
```

---

## Pages & Routes

| Path | Description |
|---|---|
| `/subjects` | Full subject catalog with search and filters |
| `/subjects/:subject` | Subject landing (CategoriesListPage from categories feature) |

---

## Filtering

`useSubjectsCatalog` manages three filter dimensions:

| Filter | Type | Description |
|---|---|---|
| search | `string` | Free text match on title/description |
| difficulty | `"all" \| "beginner" \| "intermediate" \| "advanced"` | |
| track | `"all" \| "algorithms" \| "data-structures" \| ...` | Topic track |

All filtering is done client-side on the already-fetched subject list.

---

## Subject Availability

Each subject has an availability status derived from `getSubjectsStatus()`:

| Status | Badge | Access |
|---|---|---|
| `free` | None | Available to all |
| `pro` | Pro badge | Requires subscription |
| `coming-soon` | Coming Soon badge | Not yet available |
