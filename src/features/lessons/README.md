# Feature: lessons

Core lesson viewer and editor. Renders lesson content as tabbed panels (Theory, Visualiser, Quiz, Exercises, Watch). Teachers get an inline edit bar and an AI review panel. Guest users accumulate progress locally and sync it on login.

---

## Responsibilities

- Fetch and display a lesson by slug
- Render lesson blocks in the correct tab (theory, quiz, exercises, watch)
- Teacher edit mode: inline field editing, block panel editors, AI content review
- Quiz session: MCQ and text input questions, scoring, progress tracking
- Exercise tab: Monaco editor, run/submit code, test case results
- Audio narration: play AI-generated audio from the Watch tab
- Progress tracking: upsert progress on lesson open/complete; sync guest progress on login
- Theory interactions V2: AI-generated interactive components (recall, prediction, elaboration)

---

## Structure

```
lessons/
  api/
    lessonsApi.ts                   # GET /api/lessons (list, by slug, by module)
    lessonBlocksApi.ts              # GET /api/lessons-block/lesson/:id
    lessonAIApi.ts                  # POST /api/lessons/ai/* (teacher AI assist)
    lessonAudioApi.ts               # GET/POST /api/lessons/:id/audio
    lessonTheoryInteractionsApi.ts  # GET/POST /api/lessons/:id/theory-interactions
    lessonComponentFeedbackApi.ts   # Feedback on theory components
    progressApi.ts                  # GET/POST /api/progress
  components/
    LessonHeader.tsx                # Title, meta, breadcrumb
    LessonFeatureTabs.tsx           # Tab bar (Theory / Viz / Quiz / Exercise / Watch)
    LessonTabContent.tsx            # Delegates to TAB_REGISTRY
    atoms/
    molecules/                      # LessonCard, LessonsListHeader, content nodes
    organisms/                      # LessonsGrid
    edit/                           # Teacher edit components (EditableField, panels, LessonEditBar, AIReviewPanel)
    tabs/
      ContentNodeRenderer.tsx       # Renders a single LessonContentNode
      node-registry.tsx             # Maps node type -> renderer component
      tab-registry.tsx              # Maps tab key -> render function
      theory-renderers.tsx          # Picks V1 or V2 theory renderer by category
      category-capabilities.ts      # Which tabs are available per category
      quiz/                         # Quiz session UI (MCQ, input, scoring, summary)
      exercise/                     # Exercise tab (Monaco, run/submit, test results)
  context/
    LessonContext.ts                # lessonSlug, lessonId, canEdit
  hooks/
    useLessonPageController.ts      # Orchestrates lesson + blocks queries
    useLessonPageQuery.ts           # GET lesson by slug
    useLessonBlocksQuery.ts         # GET blocks for lesson
    useLessonBySlugQuery.ts
    useLessonsByModuleQuery.ts
    useLessonPermissions.ts         # canEdit = teacher/admin + owns lesson
    useLessonEdit.ts                # Edit mode state + patch mutations
    useLessonAI.ts                  # AI review panel query/mutation
    useLessonAudio.ts               # Audio fetch + generate mutation
    useLessonProgressQuery.ts
    useMyLessonProgressQuery.ts
    useProgressMap.ts
    useUpdateBlockContent.ts        # Patch a single block field
    useLessonListPage.ts
  lib/
    resolveAvailableTabs.ts         # Filters TAB_REGISTRY by category capabilities
    moduleLoader.ts                 # React Router loader for module data
    syncGuestProgress.ts            # Merge guest store -> server on login
  pages/
    LessonPage.tsx                  # Main lesson view
    LessonListPage.tsx              # List of lessons in a module
    LessonPageLayout.tsx            # Layout shell (header + tabs + content)
  store/
    useGuestProgressStore.ts        # Zustand: unauthenticated progress (localStorage)
    useLessonAIStore.ts             # Zustand: AI panel open/content
    useLessonEditStore.ts           # Zustand: edit mode, dirty blocks
```

---

## Lesson Page Layout

```
LessonPage
  └── LessonPageLayout
        ├── LessonHeader          (title, badges, breadcrumb)
        ├── LessonFeatureTabs     (tab bar)
        │     theory | viz | quiz | exercises | watch
        └── LessonTabContent      (delegates to TAB_REGISTRY)
              ├── Theory tab  → resolveTheoryRenderer(category)
              │     V1: AlgorithmLessonTheoryV1 (CS algorithms)
              │     V2: AlgorithmLessonTheoryV2 (theory interactions)
              │     default: LessonTheoryContent
              ├── Viz tab     → VisualizerV2 (CS only)
              ├── Quiz tab    → LessonQuizContentV2
              ├── Exercise tab → ExerciseTab
              └── Watch tab   → LessonWatchContent
```

---

## Tab System

`TAB_REGISTRY` in `tab-registry.tsx` is a record of tab key → `{ render, isAvailable? }`. `resolveAvailableTabs()` filters the registry against `category-capabilities.ts` which maps category slugs to feature flags (`visualizer`, `exercises`, `code-playground`).

---

## Theory V2 Interaction Components

When the category has theory-interactions enabled, `AlgorithmLessonTheoryV2` renders AI-generated interactive blocks between theory nodes. Component types:

| Component | Description |
|---|---|
| `EmbeddedRecall` | Recall question mid-reading |
| `PredictPrompt` | Student predicts outcome before reveal |
| `ElaborationPrompt` | Open-ended reflection |
| `InlineConcreteExample` | Worked example |
| `TransferScenario` | Apply concept to a new situation |
| `ComplexityDerivation` | Step-through complexity reasoning |

Each component supports thumbs up/down feedback via `ComponentFeedback`.

---

## Exercise Tab

Monaco Editor split-panel layout:
- Left: problem list + problem detail (description, hints, test cases)
- Right: code editor + run/submit controls

Hooks: `useExerciseSession` manages selected exercise, code state, run output, and submission history.

---

## Quiz Tab

`useQuizSession` manages current question index, user answers, scoring. Supports MCQ (`quiz:mcq`) and short text input (`quiz:input`). Results show a `QuizSummary` with score, pass/fail, and related lessons.

---

## Guest Progress

Unauthenticated users accumulate progress in `useGuestProgressStore` (Zustand + localStorage). On login, `syncGuestProgress` sends all stored progress to the API and clears the local store.
