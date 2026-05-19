# Feature: categories

Displays content categories within a subject, with grouped modules. Sits one level below subjects in the navigation hierarchy.

---

## Responsibilities

- Fetch categories (optionally with nested modules) from the API
- Render a filterable list of categories for a subject
- Group modules by their parent category for the sidebar / navigation tree

---

## Structure

```
categories/
  api/
    categoriesApi.ts            # GET /api/categories, GET /api/categories/with-modules
  components/
    molecules/
      CategoriesFilterSummary.tsx
      CategoriesHeader.tsx
    organisms/
      CategoriesEmptyState.tsx
      CategorySection.tsx       # Renders one category with its module cards
  hooks/
    useCategoriesQuery.ts       # TanStack Query: GET /api/categories
    useCatalogSubjectsQuery.ts  # Fetches categories-with-modules for nav tree
  lib/
    buildCategories.ts          # Shapes raw API data for rendering
    categoriesApplyFilters.ts   # Client-side filter logic
    groupByCategory.ts          # Groups modules under their category
    mapCatalogToSubjects.ts     # Maps catalog response to subject-scoped view
  pages/
    CategoriesPage.tsx
    CategoriesListPage.tsx      # Default index for /subjects/:subject
    CategoryPage.tsx            # Single category view
```

---

## Pages & Routes

| Path | Component | Description |
|---|---|---|
| `/subjects/:subject` | `CategoriesListPage` | All categories for the subject |
| `/subjects/:subject/:category` | Handled by `computerScienceRoutes` / `mathematicsRoutes` | Category drill-down |

---

## Data Flow

```
useCategoriesQuery()
  └── GET /api/categories
        └── buildCategories() → category[] with module lists
              └── CategorySection × N (one per category)
```

`useCatalogSubjectsQuery` uses `GET /api/categories/with-modules` to build the full sidebar navigation tree in a single request.
