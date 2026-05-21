import { useParams } from "react-router-dom";
import { useLessonsByModuleQuery } from "./useLessonsByModuleQuery";
import type {
	LessonTheoryPrereq,
	LessonTheoryRelated,
} from "../../../features/computer-science/algorithms/lib/buildAlgorithmLessonTheory";

export type LessonSidebarData = {
	prerequisites: LessonTheoryPrereq[];
	relatedLessons: LessonTheoryRelated[];
	nextLesson: { name: string } | undefined;
	title: string;
};

export function useLessonSidebarData(lessonId: string): LessonSidebarData {
	const { module: moduleSlug = "" } = useParams<{ module: string }>();
	const { data: lessons = [] } = useLessonsByModuleQuery(moduleSlug);

	const sorted = [...lessons].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
	const currentIdx = sorted.findIndex((l) => l.id === lessonId);
	const current = sorted[currentIdx];

	const prerequisites: LessonTheoryPrereq[] = sorted
		.slice(0, Math.max(0, currentIdx))
		.slice(-3)
		.map((l) => ({ name: l.title, status: "done" as const }));

	const relatedLessons: LessonTheoryRelated[] = sorted
		.filter((l) => l.id !== lessonId)
		.slice(0, 5)
		.map((l, i) => ({
			name: l.title,
			why: i < currentIdx ? "Covered earlier in this module" : "Up next in this module",
		}));

	const nextLesson =
		currentIdx >= 0 && currentIdx < sorted.length - 1
			? { name: sorted[currentIdx + 1].title }
			: undefined;

	return {
		prerequisites,
		relatedLessons,
		nextLesson,
		title: current?.title ?? "",
	};
}
