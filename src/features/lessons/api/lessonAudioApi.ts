import { API_URL } from "../../../libs/config";

export type AudioSegment = { text: string; start_ms: number; end_ms: number };

export type LessonAudioData = {
	id: string;
	lessonId: string;
	script: AudioSegment[];
	audioUrl: string;
	generatedAt: string;
};

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

async function post<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

export const lessonAudioApi = {
	get: (lessonId: string) =>
		get<{ success: boolean; data: LessonAudioData }>(`/lessons/${lessonId}/audio`)
			.then((r) => r.data)
			.catch((err: unknown) => {
				if (err instanceof Error && err.message.includes("404")) return null;
				throw err;
			}),

	generate: (lessonId: string) =>
		post<{ success: boolean; data: LessonAudioData }>(`/lessons/${lessonId}/audio/generate`).then(
			(r) => r.data,
		),
};
