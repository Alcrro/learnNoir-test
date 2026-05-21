import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { LessonDTO, ProgrammingLanguage } from "../api/lessonsApi";
import { useLessonsByModuleQuery } from "./useLessonsByModuleQuery";
import { useProgressMap } from "./useProgressMap";

const ALL_LANGUAGES: ProgrammingLanguage[] = ["python", "javascript", "java", "cpp"];

type Params = {
	subject: string;
	category: string;
	moduleSlug: string;
};

export function useLessonListPage({ subject, category, moduleSlug }: Params) {
	const [searchParams, setSearchParams] = useSearchParams();

	// Fetch once without filter to detect available languages in this module.
	const { data: allLessons = [] } = useLessonsByModuleQuery(moduleSlug);

	const availableLanguages = ALL_LANGUAGES.filter((lang) =>
		allLessons.some((l) => l.language === lang),
	);

	const isLanguageModule = availableLanguages.length > 0;

	const selectedLanguage = isLanguageModule
		? ((searchParams.get("lang") as ProgrammingLanguage | null) ?? availableLanguages[0] ?? null)
		: null;

	const { data: lessons = [], isLoading, isError } = useLessonsByModuleQuery(
		moduleSlug,
		selectedLanguage,
	);

	const setLanguage = useCallback(
		(lang: ProgrammingLanguage) => {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);
				next.set("lang", lang);
				return next;
			}, { replace: true });
		},
		[setSearchParams],
	);

	const progressMap = useProgressMap(lessons.map((l) => l.id));

	const completedCount = Object.values(progressMap).filter(
		(p) => p?.status === "completed",
	).length;

	const buildHref = (lesson: LessonDTO) =>
		`/subjects/${subject}/${category}/${moduleSlug}/${lesson.slug}`;

	return {
		lessons,
		progressMap,
		completedCount,
		buildHref,
		isLoading,
		isError,
		isLanguageModule,
		availableLanguages,
		selectedLanguage,
		setLanguage,
	};
}
