# Subject: computer-science

The Computer Science curriculum. Contains algorithm visualisations, a programming catalog, and data structures. Routes are registered under `/subjects/computer-science/:category/:module/:lessonSlug`.

---

## Responsibilities

- Route and layout structure for the CS curriculum
- Algorithm visualiser (step-through, GSAP animations, multiple display modes)
- Algorithm lesson theory (V1 and V2 layouts)
- Programming lesson catalog (browse CS lessons with filters)
- Data structures (stack, queue, etc. — animations)
- Breadcrumb + category validation on route entry

---

## Structure

```
subjects/computer-science/
  computerScience.routes.tsx      # Route slice: /:category/:module/:lessonSlug
  pages/
    ComputerScience.tsx           # CS landing page
  components/
    layouts/
      CategoriesLayout.tsx
  visualizer/                     # Core visualiser engine (GSAP-based)
    engine/                       # Step control: nextStep, prevStep, startPlayback, reset, highlight
    hooks/                        # useAlgorithmController, useArraySettings, useBubbleSortAnimation, ...
  dataStructures/
    animations/StackAnimation.tsx
    dataStructureComponentsMapper.ts
    dataStructuresRoutesMapper.ts
  algorithms/                     # Algorithm-specific content and visualiser
  catalog/                        # Programming lesson catalog
```

---

## algorithms/

The main learning area for CS algorithms.

```
algorithms/
  bubble-sort/                    # Self-contained algorithm module
    domain/bubbleSort.ts          # Pure sorting logic + step generation
    visualization/
      BubbleSortAnimation.tsx
      Visualizer.tsx
    docs/                         # Static algorithm documentation content
  components/
    visualizers/                  # Array visualiser (bar, box, pillar, vertical bar)
    visualizer-v2/                # V2 visualiser (canvas-based, registry-driven)
      VisualizerV2.tsx
      registry/                   # algorithmCanvasRegistry, algorithmStepRegistry, pseudocodeRegistry
      organisms/                  # VisualizerCanvas, PseudocodePanel
    lesson/
      AlgorithmLessonTheoryV1.tsx # V1: reveal-based theory (ConceptReveal, StepsReveal, ...)
      AlgorithmLessonTheoryV2.tsx # V2: AI interaction theory (EmbeddedRecall, PredictPrompt, ...)
      theory-v2/                  # V2 interactive components
        EmbeddedRecall.tsx
        PredictPrompt.tsx
        ElaborationPrompt.tsx
        InlineConcreteExample.tsx
        TransferScenario.tsx
        ComplexityDerivation.tsx
        ComponentFeedback.tsx     # Thumbs up/down per component
      AlgorithmFeatureTabs.tsx    # Theory | Viz | Quiz | Code tabs (algorithm-specific)
      AlgorithmDocsIntroduction.tsx
      AlgorithmStepDocs.tsx
    interactions/                 # Drag interactions, step interactions (legacy V1)
  data/
    algorithmsData.ts             # Algorithm metadata (name, complexity, category)
    algorithmTabsMapper.tsx       # Maps algorithm slug -> tab config
    algorithmComplexitiesRegistry.ts
    pseudocode.ts                 # Pseudocode strings per algorithm
    featureTab.ts
  hooks/
    useAlgorithmLessonOverrides.ts  # Overrides tab layout for algorithm lessons
    useAlgorithmTheoryController.ts
    useTheoryInteractions.ts        # Fetches + manages V2 theory interaction components
    useComponentFeedback.ts
    useTheoryProgressReducer.ts     # Tracks which theory components are completed
    useLessonReadProgress.ts
    useLessonTheoryModel.ts
  pages/
    AlgorithmPage.tsx
    AlgorithmPageLayout.tsx
    AlgorithmsListPage.tsx
```

### Visualiser V2

Registry-driven system where each algorithm registers:
- `algorithmCanvasRegistry` — which canvas component to use (ArrayCanvas, GraphCanvas, TreeCanvas)
- `algorithmStepRegistry` — step-by-step data generator
- `pseudocodeRegistry` — pseudocode string per algorithm

`VisualizerV2` looks up the current algorithm from the URL, pulls from all three registries, and renders the canvas + pseudocode panel + step controls.

### Theory V1 vs V2

| Version | Renderer | Triggered by |
|---|---|---|
| V1 | `AlgorithmLessonTheoryV1` | Categories without `theory-interactions` capability |
| V2 | `AlgorithmLessonTheoryV2` | Categories with `theory-interactions` capability |

V2 intersperses AI-generated interactive components between standard theory blocks.

---

## catalog/

Programming lesson browser — a searchable, filterable grid of CS lessons fetched from the backend.

```
catalog/
  api/getProgrammingCatalog.ts     # GET /api/lessons (with CS category filter)
  components/
    ProgrammingCatalogPage.tsx
    ProgrammingCatalogFilters.tsx
    ProgrammingCatalogSection.tsx
    ProgrammingLessonCard.tsx
  hooks/
    useProgrammingCatalogQuery.ts
  lib/                             # normalizeLesson, catalogUtils, getLessonFromPayload, ...
  data/
    programmingCatalogFallback.ts  # Static fallback when API is unavailable
```

---

## Routes

```
/subjects/computer-science/:category              → ModulesListPage
/subjects/computer-science/:category/:module      → LessonListPage
/subjects/computer-science/:category/:module/:lessonSlug → LessonPage
```

Category param is validated by the `validateCategory` loader before render.
