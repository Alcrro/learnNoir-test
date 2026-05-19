# Subject: mathematics

The Mathematics curriculum. Provides math theory lessons with a sidebar-driven layout. Routes are registered under `/subjects/mathematics/:category/:module/:lessonSlug`.

---

## Responsibilities

- Route and layout structure for the Math curriculum
- Sidebar navigation (desktop + mobile) with chapter/section titles
- Math theory rendering (LaTeX formulas, proofs, theorems via lesson blocks)

---

## Structure

```
subjects/mathematics/
  router/
    math.routes.tsx             # Route slice: /mathematics/:category/:module/:lessonSlug
  pages/
    MathPage.tsx                # Math subject landing page
  components/
    MathPageLayoutContent.tsx   # Main content area for a math lesson
    layouts/
      MathLayout.tsx            # Outer layout with sidebar
    mathTheory/
      MathTheory.tsx            # Renders math lesson theory blocks
    notebookPage.scss           # Notebook-style styling for math pages
  navigation/
    sidebar/
      Sidebar.tsx               # Root sidebar component
      SidebarDesktop.tsx        # Collapsible desktop sidebar
      SidebarMobile.tsx         # Drawer sidebar for mobile
      SidebarTitle.tsx          # Chapter/section title in sidebar
```

---

## Routes

```
/subjects/mathematics/:category              → ModulesListPage (shared)
/subjects/mathematics/:category/:module      → LessonListPage (shared)
/subjects/mathematics/:category/:module/:lessonSlug → MathPage (via MathLayout)
```

---

## Math Theory Rendering

`MathTheory` uses the shared `ContentNodeRenderer` from the `lessons` feature to render blocks. Math-specific node types (formula, proof, theorem) are registered in `node-registry.tsx` in the lessons feature and rendered with LaTeX-aware components (`FormulaNode`, `ProofNode`, `TheoremNode`).
