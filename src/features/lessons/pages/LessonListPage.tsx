import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import { useLessonsByModuleQuery } from "../hooks/useLessonsByModuleQuery";
import { progressApi } from "../api/progressApi";
import type { LessonProgress } from "../api/progressApi";
import { LessonsGrid } from "../components/organisms/LessonsGrid";
import { LessonsListHeader } from "../components/molecules/LessonsListHeader";
import type { LessonDTO } from "../api/lessonsApi";

const LessonListPage = () => {
	const {
		subject = "computer-science",
		category = "",
		module: moduleSlug = "",
	} = useParams();

	const {
		data: lessons = [],
		isLoading,
		isError,
	} = useLessonsByModuleQuery(moduleSlug);

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
	const progressMap: Record<string, LessonProgress | null> = {};
	lessons.forEach((lesson, i) => {
		const result = progressQueries[i];
		// undefined means still loading; we pass undefined so the card shows no bar yet.
		if (result && !result.isLoading) {
			progressMap[lesson.id] = result.data ?? null;
		}
	});

	const completedCount = Object.values(progressMap).filter(
		(p) => p?.status === "completed",
	).length;

	const buildHref = (lesson: LessonDTO) =>
		`/subjects/${subject}/${category}/${moduleSlug}/${lesson.slug}`;

	if (isLoading) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<div className="mt-6 text-(--text-secondary)">Loading lessons…</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<div className="mt-6 text-(--text-secondary)">Could not load lessons.</div>
			</div>
		);
	}

	return (
		<div className="py-2">
			<Breadcrumb />
			<LessonsListHeader
				moduleName={moduleSlug.replace(/-/g, " ")}
				lessonCount={lessons.length}
				completedCount={completedCount}
			/>
			<LessonsGrid
				lessons={lessons}
				progressMap={progressMap}
				buildHref={buildHref}
			/>
		</div>
	);
};

export default LessonListPage;
