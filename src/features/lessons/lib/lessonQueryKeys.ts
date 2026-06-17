import type { ProgrammingLanguage } from "../api/lessonsApi";

export const lessonQueryKeys = {
	bySlug: (slug: string) => ["lesson-by-slug", slug] as const,
	blocks: (lessonId: string) => ["lesson-blocks", lessonId] as const,
	audio: (lessonId: string) => ["lesson-audio", lessonId] as const,
	byModule: (moduleSlug: string, language: ProgrammingLanguage | null) =>
		["lessons-by-module", moduleSlug, language] as const,
	progress: (lessonId: string) => ["lesson-progress", lessonId] as const,
	myProgress: ["my-lesson-progress"] as const,
	dueForReview: ["progress", "due-for-review"] as const,
	quizBlockScores: (lessonId: string) => ["quiz-block-scores", lessonId] as const,
	exercises: (lessonId: string, isPro: boolean) => ["exercises", lessonId, isPro] as const,
	exercisesRoot: (lessonId: string) => ["exercises", lessonId] as const,
	exerciseProgress: (lessonId: string) => ["exercise-progress", lessonId] as const,
	theoryLevels: (blockId: string) => ["theory-levels", blockId] as const,
	theoryLevel: (blockId: string, level: string) => ["theory-level", blockId, level] as const,
	translation: (lessonId: string, lang: string) => ["lesson-translation", lessonId, lang] as const,
};
