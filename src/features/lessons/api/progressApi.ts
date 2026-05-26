import { apiClient } from "../../../libs/apiClient";

export type SpacedRepetitionInfo = {
	reviewCount: number;
	lastReviewedAt: string | null;
	nextReviewAt: string | null;
	isDue: boolean;
	daysUntilReview: number | null;
};

export type LessonWithReview = {
	lessonId: string;
	lessonSlug: string;
	lessonTitle: string;
	sr: SpacedRepetitionInfo;
};

// Mirrors the backend LessonProgress type.
export type LessonProgress = {
	id: string;
	userId: string;
	lessonId: string;
	status: "not_started" | "in_progress" | "completed";
	// Composite score: average of quizScore, readScore, outputScore (0–100).
	weightedScore: number;
	quizScore: number;
	readScore: number;
	outputScore: number;
	lastActivityAt: string | null;
	createdAt: string | null;
	updatedAt: string | null;
	nextReviewAt: string | null;
	lastReviewedAt: string | null;
	reviewCount: number;
};

// Mirrors LessonProgressWithLesson from the backend — progress joined with lesson + module.
export type MyLessonProgress = LessonProgress & {
	lessonTitle: string;
	lessonSlug: string;
	lessonStatus: string;
	moduleName: string;
};

export type UpsertProgressInput = {
	status?: LessonProgress["status"];
	quizScore?: number;
	readScore?: number;
	outputScore?: number;
};

export type QuizBlockScore = {
	id: string;
	userId: string;
	lessonBlockId: string;
	score: number;
	passed: boolean;
	attempts: number;
};

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
