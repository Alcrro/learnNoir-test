import { apiClient } from "../../../libs/apiClient";

export type AudioSegment = { text: string; start_ms: number; end_ms: number };

export type LessonAudioData = {
	id: string;
	lessonId: string;
	script: AudioSegment[];
	audioUrl: string;
	generatedAt: string;
};

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
