import { apiClient } from "../../../libs/apiClient";
import type { AudioSegment, LessonAudioData } from "../types/audio.types";
export type { AudioSegment, LessonAudioData };

export const lessonAudioApi = {
	// Returns null when no audio exists yet (404).
	get: (lessonId: string) =>
		apiClient.get<{ data: LessonAudioData }>(`/lessons/${lessonId}/audio`)
			.then((r) => r.data)
			.catch(() => null),

	generate: (lessonId: string) =>
		apiClient.post<{ data: LessonAudioData }>(`/lessons/${lessonId}/audio/generate`, {})
			.then((r) => r.data),
};
