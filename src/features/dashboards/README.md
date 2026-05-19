# Feature: dashboards

Teacher and admin dashboard. Shows lesson management, student roster, stats, and analytics. All routes are protected — requires `teacher` or `admin` role.

---

## Responsibilities

- List and manage teacher's own lessons (create, edit, publish, review)
- View enrolled students and their progress
- Display teaching stats (total lessons, published, students, avg score)
- Lesson history drawer (edit audit trail)
- Dashboard navigation with sidebar

---

## Structure

```
dashboards/
  api/
    lessonsApi.ts             # Lesson CRUD calls (create, update, delete, publish)
    teacherApi.ts             # GET /api/lessons/mine, stats, students
    modulesApi.ts             # GET /api/modules (for lesson form module selector)
    client.ts                 # Shared fetch config
  components/
    DashboardUI.tsx           # Root layout with sidebar + nav
    Overview.tsx / Lessons.tsx / Students.tsx / Analytics.tsx / Settings.tsx / Courses.tsx
    atoms/                    # ActiveToggle, LessonStatusBadge, StatCounter, QuickActionCard, ...
    molecules/
      DashboardNavbar.tsx
      LessonCard.tsx / LessonDashboardCard.tsx
      LessonFormModal.tsx     # Create/edit lesson modal with Zod-validated form
      LessonHistoryDrawer.tsx # Slide-in audit trail for a lesson
      StudentRow.tsx
      CourseCard.tsx
      SidebarItems.tsx
    organisms/
      LessonList.tsx
      LessonStatsBar.tsx
      StudentTable.tsx
      RosterPulseTable.tsx
      StudentLessonProgressTable.tsx
      TopPerformersPanel.tsx
  data/
    dashboardData.ts          # Static sidebar nav items, quick action cards
  hooks/
    useTeacherLessons.ts      # TanStack Query: GET /api/lessons/mine
    useTeacherStats.ts        # TanStack Query: GET /api/lessons/mine/stats
    useTeacherStudents.ts     # TanStack Query: GET /api/lessons/mine/students
    useLessonsPageController.ts # Combines lessons query + modal + CRUD actions
    useLessonForm.ts          # Form state for create/edit modal
    useLessonHistory.ts       # Drawer open state + history query
    useModules.ts             # GET /api/modules for form dropdown
  lib/
    dashboardContext.ts       # React context for active sidebar section
    lessonStats.ts            # Stat computation helpers
    studentStats.ts
    slugify.ts
  pages/
    OverviewPage.tsx
    LessonsPage.tsx
    StudentsPage.tsx
  router/
    dashboardRoutes.tsx       # /dashboard/* routes (all protected)
  types/
    teacher.types.ts
```

---

## Routes

All routes require auth + `teacher` or `admin` role (enforced by `requireAuth` hook in the route guard).

| Path | Page | Description |
|---|---|---|
| `/dashboard` | `OverviewPage` | Stats summary, quick actions |
| `/dashboard/lessons` | `LessonsPage` | Lesson list + create/edit/delete |
| `/dashboard/students` | `StudentsPage` | Student roster + progress |

---

## Lesson Form Modal

`LessonFormModal` handles both create and edit in a single component. Fields: title, slug, module (dropdown), status. On submit, calls `POST /api/lessons` or `PUT /api/lessons/:id`. Invalidates the `teacher-lessons` query on success.

---

## Lesson Status Flow (in the UI)

Status badge colours:
- `draft` — grey
- `review` — yellow
- `published` — green

Teachers can move a lesson forward through the workflow via action buttons on `LessonDashboardCard`.
