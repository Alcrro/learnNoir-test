import { API_URL } from "../../../../../../libs/config";
import type { Exercise, CodeRunResult, ExerciseProgressItem } from "./exerciseTypes";

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
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

export const exercisesApi = {
	// All exercises — requires pro subscription.
	getByLesson: (lessonId: string) =>
		get<{ data: Exercise[] }>(`/lessons/${lessonId}/exercises`).then((r) => r.data),

	// Free tier preview — first 2 exercises, no auth required.
	getPreviewByLesson: (lessonId: string) =>
		get<{ data: Exercise[] }>(`/lessons/${lessonId}/exercises/preview`).then((r) => r.data),

	getMyProgress: (lessonId: string) =>
		get<{ data: ExerciseProgressItem[] }>(`/lessons/${lessonId}/exercises/my-progress`).then(
			(r) => r.data,
		),

	runCode: (exerciseId: string, code: string) =>
		post<{ data: CodeRunResult }>(`/exercises/${exerciseId}/run`, { code }).then((r) => r.data),

	submit: (exerciseId: string, code: string, hintsUsed: number) =>
		post<{ data: { attempt: unknown; lessonProgress: unknown } }>(`/exercises/${exerciseId}/submit`, {
			code,
			hintsUsed,
		}).then((r) => r.data),
};
