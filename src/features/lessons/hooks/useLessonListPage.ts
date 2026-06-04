import type { LessonDTO, ProgrammingLanguage } from "../api/lessonsApi";
import { useLessonsByModuleQuery } from "./useLessonsByModuleQuery";
import { useProgressMap } from "./useProgressMap";

export const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
	python: "Python",
	javascript: "JavaScript",
	java: "Java",
	cpp: "C++",
};

export type LessonGroup = {
	baseTitle: string;
	description: string | null;
	position: number;
	variants: LessonDTO[];
};

function stripLanguageSuffix(title: string, language?: ProgrammingLanguage | null): string {
	if (!language) return title;
	const pattern = ` — ${LANGUAGE_LABELS[language]}`;
	return title.endsWith(pattern) ? title.slice(0, -pattern.length) : title;
}

export function groupLessonsByTopic(lessons: LessonDTO[]): LessonGroup[] {
	const map = new Map<string, LessonGroup>();
	for (const lesson of lessons) {
		const baseTitle = stripLanguageSuffix(lesson.title, lesson.language);
		const existing = map.get(baseTitle);
		if (existing) {
			existing.variants.push(lesson);
		} else {
			map.set(baseTitle, {
				baseTitle,
				description: lesson.description,
				position: lesson.position ?? 0,
				variants: [lesson],
			});
		}
	}
	return [...map.values()].sort((a, b) => a.position - b.position);
}

type Params = {
	subject: string;
	category: string;
	moduleSlug: string;
};

export function useLessonListPage({ subject, category, moduleSlug }: Params) {
	const { data: allLessons = [], isLoading, isError } = useLessonsByModuleQuery(moduleSlug);

	const isLanguageModule = allLessons.some((l) => l.language);
	const groupedLessons = isLanguageModule ? groupLessonsByTopic(allLessons) : [];

	const progressMap = useProgressMap(allLessons.map((l) => l.id));

	const completedCount = isLanguageModule
		? groupedLessons.filter((g) =>
				g.variants.some((v) => progressMap[v.id]?.status === "completed"),
			).length
		: Object.values(progressMap).filter((p) => p?.status === "completed").length;

	const buildHref = (lesson: LessonDTO) =>
		`/subjects/${subject}/${category}/${moduleSlug}/${lesson.slug}`;

	return {
		lessons: allLessons,
		groupedLessons,
		progressMap,
		completedCount,
		buildHref,
		isLoading,
		isError,
		isLanguageModule,
	};
}
