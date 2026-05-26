import { apiClient } from "../../../libs/apiClient";

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

export const lessonBlocksApi = {
	// GET /lessons-block/lesson/:lessonId — all blocks (pro only).
	getByLessonId: (lessonId: string) =>
		apiClient.get<{ data: LessonBlock[] }>(`/lessons-block/lesson/${lessonId}`)
			.then((r) => r.data),

	// GET /lessons-block/lesson/:lessonId/preview — free tier: all content+interactive + first 4 quizzes.
	getPreviewByLessonId: (lessonId: string) =>
		apiClient.get<{ data: LessonBlock[] }>(`/lessons-block/lesson/${lessonId}/preview`)
			.then((r) => r.data),

	// PATCH /lessons-block/:id/content — replaces the content array of a content block.
	updateContent: (blockId: string, content: Record<string, unknown>[]) =>
		apiClient.patch<void>(`/lessons-block/${blockId}/content`, { content }),

	// POST /lessons-block — creates a new content block for a lesson.
	createContentBlock: (lessonId: string, content: Record<string, unknown>[]) =>
		apiClient.post<{ data: LessonBlock }>("/lessons-block", {
			lessonId,
			type: "content",
			data: { content },
		}).then((r) => r.data),
};
