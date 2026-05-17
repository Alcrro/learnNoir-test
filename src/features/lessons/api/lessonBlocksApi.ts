import { API_URL } from "../../../libs/config";

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

// The three block types that can appear in a lesson, discriminated by `type`.
export type ContentBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "content";
	data: { content: Record<string, unknown>[] };
};

export type InteractiveBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "interactive";
	// e.g. "algorithm:bubble-sort", "math:formula"
	engine: string;
	data: Record<string, unknown>;
};

export type AssessmentBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "assessment";
	// e.g. "quiz:mcq", "quiz:input", "quiz:code"
	engine: string;
	data: Record<string, unknown>;
};

export type LessonBlock = ContentBlock | InteractiveBlock | AssessmentBlock;

async function patch(path: string, body: unknown): Promise<void> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

async function post<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

export const lessonBlocksApi = {
	// GET /lessons-block/lesson/:lessonId — all blocks (pro only).
	getByLessonId: (lessonId: string) =>
		get<{ success: boolean; data: LessonBlock[] }>(
			`/lessons-block/lesson/${lessonId}`,
		).then((r) => r.data),

	// GET /lessons-block/lesson/:lessonId/preview — free tier: all content+interactive + first 4 quizzes.
	getPreviewByLessonId: (lessonId: string) =>
		get<{ success: boolean; data: LessonBlock[] }>(
			`/lessons-block/lesson/${lessonId}/preview`,
		).then((r) => r.data),

	// PATCH /lessons-block/:id/content — replaces the content array of a content block.
	updateContent: (blockId: string, content: Record<string, unknown>[]) =>
		patch(`/lessons-block/${blockId}/content`, { content }),

	// POST /lessons-block — creates a new content block for a lesson.
	createContentBlock: (lessonId: string, content: Record<string, unknown>[]) =>
		post<{ success: boolean; createdLessonBlock: LessonBlock }>("/lessons-block", {
			lessonId,
			type: "content",
			data: { content },
		}).then((r) => r.createdLessonBlock),
};
