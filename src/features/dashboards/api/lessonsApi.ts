import { api } from "./client";
import type {
	TeacherLessonDTO,
	CreateLessonPayload,
	UpdateLessonPayload,
	LessonEditEntry,
} from "../types/teacher.types";

export const lessonsApi = {
	create: (payload: CreateLessonPayload) =>
		api.post<{ data: TeacherLessonDTO }>("/lessons", payload).then((r) => r.data),

	update: (id: string, payload: UpdateLessonPayload) =>
		api
			.put<{ data: TeacherLessonDTO }>(`/lessons/${id}`, payload)
			.then((r) => r.data),

	delete: (id: string) => api.delete<void>(`/lessons/${id}`),

	review: (id: string) => api.patch<void>(`/lessons/${id}/review`),

	publish: (id: string) => api.patch<void>(`/lessons/${id}/publish`),

	getHistory: (id: string) =>
		api
			.get<{ data: LessonEditEntry[] }>(`/lessons/${id}/history`)
			.then((r) => r.data),

	suggestMetadata: (title: string, moduleName: string) =>
		api
			.post<{
				data: { description: string; durationMinutes: number };
			}>("/lessons/ai/metadata", { title, moduleName })
			.then((r) => r.data),
};
