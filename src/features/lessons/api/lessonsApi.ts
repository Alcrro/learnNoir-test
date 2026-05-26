import { apiClient } from "../../../libs/apiClient";
import type { ProgrammingLanguage, LessonDTO, UpdateLessonPayload } from "../types/lesson.types";
export type { ProgrammingLanguage, LessonDTO, UpdateLessonPayload };

export const lessonsApi = {
	// GET /lessons/module/slug/:moduleSlug — returns all lessons for a module, optionally filtered by language.
	getByModuleSlug: (moduleSlug: string, language?: ProgrammingLanguage | null) => {
		const qs = language ? `?language=${language}` : "";
		return apiClient.get<{ data: LessonDTO[] }>(`/lessons/module/slug/${moduleSlug}${qs}`)
			.then((r) => r.data);
	},

	// GET /lessons/slug/:slug — returns a single lesson by its URL slug.
	getBySlug: (slug: string) =>
		apiClient.get<{ data: LessonDTO }>(`/lessons/slug/${slug}`).then((r) => r.data),

	// GET /lessons/:id — returns a single lesson by its UUID.
	getById: (id: string) =>
		apiClient.get<{ data: LessonDTO }>(`/lessons/${id}`).then((r) => r.data),

	// PUT /lessons/:id — update lesson metadata (teacher/admin only).
	update: (id: string, payload: UpdateLessonPayload) =>
		apiClient.put<{ data: LessonDTO }>(`/lessons/${id}`, payload).then((r) => r.data),
};
