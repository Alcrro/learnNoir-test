import { apiClient } from "../../../libs/apiClient";
import type { SpacedRepetitionInfo, LessonWithReview, LessonProgress, MyLessonProgress, UpsertProgressInput, QuizBlockScore } from "../types/progress.types";
export type { SpacedRepetitionInfo, LessonWithReview, LessonProgress, MyLessonProgress, UpsertProgressInput, QuizBlockScore };

export const progressApi = {
	// GET /progress/me — all progress rows for the current user, joined with lesson metadata.
	getAll: () =>
		apiClient.get<{ data: MyLessonProgress[] }>(`/progress/me`).then((r) => r.data),

	// GET /progress/lesson/:lessonId — current user's progress. Returns null if not started.
	getByLesson: (lessonId: string) =>
		apiClient.get<{ data: LessonProgress | null }>(`/progress/lesson/${lessonId}`)
			.then((r) => r.data),

	// PATCH /progress/lesson/:lessonId — create or update progress for the current user.
	upsert: (lessonId: string, input: UpsertProgressInput) =>
		apiClient.patch<{ data: LessonProgress }>(`/progress/lesson/${lessonId}`, input)
			.then((r) => r.data),

	// GET /progress/lesson/:lessonId/quiz-blocks — per-block quiz scores.
	getQuizBlockScores: (lessonId: string) =>
		apiClient.get<{ data: QuizBlockScore[] }>(`/progress/lesson/${lessonId}/quiz-blocks`)
			.then((r) => r.data),

	// POST /progress/lesson/:lessonId/quiz-block/:blockId — save quiz block result.
	upsertQuizBlockScore: (lessonId: string, blockId: string, score: number) =>
		apiClient.post<{ data: QuizBlockScore }>(
			`/progress/lesson/${lessonId}/quiz-block/${blockId}`,
			{ score },
		).then((r) => r.data),

	// GET /progress/due-for-review — completed lessons whose next review is due.
	getDueForReview: () =>
		apiClient.get<{ data: LessonWithReview[] }>(`/progress/due-for-review`).then((r) => r.data),
};
