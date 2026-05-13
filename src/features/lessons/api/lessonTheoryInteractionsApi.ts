import { API_URL } from "../../../libs/config";

export type TheoryInteractionComponentType =
	| "predict_prompt"
	| "concrete_example"
	| "elaboration"
	| "interactive_exercise"
	| "transfer"
	| "recall_1"
	| "recall_2"
	| "recall_final";

export type TheoryInteractionStatus = "draft" | "approved";

export type TheoryInteractionDTO = {
	id: string;
	lessonId: string;
	componentType: TheoryInteractionComponentType;
	content: Record<string, unknown> | unknown[];
	status: TheoryInteractionStatus;
	version: number;
	createdAt: string;
	updatedAt: string;
};

export type LessonContextForAI = {
	subject: string;
	lessonType: string;
	title: string;
	mainContent: string;
	keyPoints?: string[];
	examples?: string[];
};

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

async function patch<T>(path: string, body?: unknown): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

export const lessonTheoryInteractionsApi = {
	/** Student: only approved interactions */
	getApproved: (lessonId: string) =>
		get<{ data: TheoryInteractionDTO[] }>(`/lessons/${lessonId}/theory-interactions`)
			.then((r) => r.data),

	/** Teacher: all versions including drafts */
	getAll: (lessonId: string) =>
		get<{ data: TheoryInteractionDTO[] }>(`/lessons/${lessonId}/theory-interactions/all`)
			.then((r) => r.data),

	/** Generate a component via AI — creates a draft */
	generate: (lessonId: string, component: TheoryInteractionComponentType, lessonContext: LessonContextForAI) =>
		post<{ data: TheoryInteractionDTO }>(`/lessons/${lessonId}/theory-interactions/${component}/generate`, { lessonContext })
			.then((r) => r.data),

	/** Approve a draft interaction */
	approve: (lessonId: string, interactionId: string) =>
		patch<{ data: TheoryInteractionDTO }>(`/lessons/${lessonId}/theory-interactions/${interactionId}/approve`)
			.then((r) => r.data),

	/** Manual content update */
	update: (lessonId: string, interactionId: string, content: unknown) =>
		patch<{ data: TheoryInteractionDTO }>(`/lessons/${lessonId}/theory-interactions/${interactionId}`, { content })
			.then((r) => r.data),
};
