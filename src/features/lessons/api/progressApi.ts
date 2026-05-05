const API_URL =
	(import.meta.env["VITE_API_URI"] as string | undefined) ?? "http://localhost:3000/api";

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

export type UpsertProgressInput = {
	status?: LessonProgress["status"];
	quizScore?: number;
	readScore?: number;
	outputScore?: number;
};

export const progressApi = {
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
};
