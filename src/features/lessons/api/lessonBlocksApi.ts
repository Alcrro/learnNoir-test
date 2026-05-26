import { apiClient } from "../../../libs/apiClient";
import type { ContentBlock, InteractiveBlock, AssessmentBlock, LessonBlock } from "../types/block.types";
export type { ContentBlock, InteractiveBlock, AssessmentBlock, LessonBlock };

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
