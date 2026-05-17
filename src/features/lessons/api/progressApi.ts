import { API_URL } from "../../../libs/config";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		...options,
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

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
		request<{ data: MyLessonProgress[] }>(`/progress/me`).then((r) => r.data),

	// GET /progress/lesson/:lessonId — current user's progress. Returns null if not started.
	getByLesson: (lessonId: string) =>
		request<{ data: LessonProgress | null }>(`/progress/lesson/${lessonId}`).then(
			(r) => r.data,
		),

	// PATCH /progress/lesson/:lessonId — create or update progress for the current user.
	upsert: (lessonId: string, input: UpsertProgressInput) =>
		request<{ data: LessonProgress }>(`/progress/lesson/${lessonId}`, {
			method: "PATCH",
			body: JSON.stringify(input),
		}).then((r) => r.data),

	// GET /progress/lesson/:lessonId/quiz-blocks — per-block quiz scores.
	getQuizBlockScores: (lessonId: string) =>
		request<{ data: QuizBlockScore[] }>(`/progress/lesson/${lessonId}/quiz-blocks`).then(
			(r) => r.data,
		),

	// POST /progress/lesson/:lessonId/quiz-block/:blockId — save quiz block result.
	upsertQuizBlockScore: (lessonId: string, blockId: string, score: number) =>
		request<{ data: QuizBlockScore }>(`/progress/lesson/${lessonId}/quiz-block/${blockId}`, {
			method: "POST",
			body: JSON.stringify({ score }),
		}).then((r) => r.data),
};
