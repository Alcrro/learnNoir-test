import { useQueries } from "@tanstack/react-query";
import type { LessonDTO } from "../api/lessonsApi";
import { progressApi, type LessonProgress } from "../api/progressApi";
import { useLessonsByModuleQuery } from "./useLessonsByModuleQuery";

type Params = {
	subject: string;
	category: string;
	moduleSlug: string;
};

export function useLessonListPage({ subject, category, moduleSlug }: Params) {
	const { data: lessons = [], isLoading, isError } = useLessonsByModuleQuery(moduleSlug);

	// Fetch progress for every lesson in parallel once the lesson list is ready.
	// Each query is keyed by lessonId so results are cached individually.
	const progressQueries = useQueries({
		queries: lessons.map((lesson) => ({
			queryKey: ["lesson-progress", lesson.id],
			queryFn: () => progressApi.getByLesson(lesson.id),
			staleTime: 60 * 1000,
		})),
	});

	// Build a map from lessonId → progress for O(1) lookup in the grid.
	// undefined means still loading — the card shows no bar until data arrives.
	const progressMap: Record<string, LessonProgress | null> = {};
	lessons.forEach((lesson, i) => {
		const result = progressQueries[i];
		if (result && !result.isLoading) {
			progressMap[lesson.id] = result.data ?? null;
		}
	});

	const completedCount = Object.values(progressMap).filter(
		(p) => p?.status === "completed",
	).length;

	const buildHref = (lesson: LessonDTO) =>
		`/subjects/${subject}/${category}/${moduleSlug}/${lesson.slug}`;

	return { lessons, progressMap, completedCount, buildHref, isLoading, isError };
}
