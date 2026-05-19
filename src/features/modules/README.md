# Feature: modules

Displays course modules within a category. Modules are the grouping layer between categories and individual lessons.

---

## Responsibilities

- Fetch modules for a category from the API
- Render a grid of module cards with title, lesson count, and progress
- Serve as the index page for `/subjects/:subject/:category`

---

## Structure

```
modules/
  components/
    layouts/
      ModulesLayout.tsx         # Layout shell for module views
    molecules/
      ModuleCard.tsx            # Single module card
      ModulesListHeader.tsx
    organisms/
      ModulesGrid.tsx           # Responsive grid of ModuleCards
  data/
    modules.data.ts             # Static fallback module data
  hooks/
    useCategoryModules.ts       # TanStack Query: GET /api/modules (filtered by category)
  pages/
    ModulesListPage.tsx         # /subjects/:subject/:category (index)
    ModulesPage.tsx
```

---

## Pages & Routes

| Path | Component | Description |
|---|---|---|
| `/subjects/:subject/:category` | `ModulesListPage` | Grid of modules for the category |

---

## Module Card

Each `ModuleCard` shows: title, description, lesson count, difficulty badge, and a progress bar (if the user is logged in and has started the module).
