import type { LessonDTO } from "../api/lessonsApi";
import { useLessonsByModuleQuery } from "./useLessonsByModuleQuery";
import { useProgressMap } from "./useProgressMap";

type Params = {
	subject: string;
	category: string;
	moduleSlug: string;
};

export function useLessonListPage({ subject, category, moduleSlug }: Params) {
	const { data: lessons = [], isLoading, isError } = useLessonsByModuleQuery(moduleSlug);

	const progressMap = useProgressMap(lessons.map((l) => l.id));

	const completedCount = Object.values(progressMap).filter(
		(p) => p?.status === "completed",
	).length;

	const buildHref = (lesson: LessonDTO) =>
		`/subjects/${subject}/${category}/${moduleSlug}/${lesson.slug}`;

	return { lessons, progressMap, completedCount, buildHref, isLoading, isError };
}
