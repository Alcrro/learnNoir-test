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

export type RecordAttemptInput = {
	chosenAnswer: unknown;
	correctAnswer: unknown | null;
	isCorrect: boolean | null;
};

export type TheoryAttemptDTO = {
	id: string;
	userId: string;
	interactionId: string;
	isCorrect: boolean | null;
	chosenAnswer: unknown;
	correctAnswer: unknown | null;
	attemptNumber: number;
	createdAt: string;
};

export const lessonTheoryInteractionsApi = {
	/** Student: only approved interactions */
	getApproved: (lessonId: string) =>
		get<{ data: TheoryInteractionDTO[] }>(`/lessons/${lessonId}/theory-interactions`)
			.then((r) => r.data),

	/** Student: all attempts for the current user on this lesson */
	getMyAttempts: (lessonId: string) =>
		get<{ data: TheoryAttemptDTO[] }>(`/lessons/${lessonId}/theory-interactions/my-attempts`)
			.then((r) => r.data),

	/** Student: list of component types the user has engaged with (from engage flow) */
	getMyProgress: (lessonId: string) =>
		get<{ data: TheoryInteractionComponentType[] }>(`/lessons/${lessonId}/theory-interactions/my-progress`)
			.then((r) => r.data),

	/** Student: record an attempt for a theory interaction */
	recordAttempt: (lessonId: string, interactionId: string, input: RecordAttemptInput) =>
		post<{ data: TheoryAttemptDTO }>(
			`/lessons/${lessonId}/theory-interactions/${interactionId}/attempt`,
			input,
		).then((r) => r.data),

	/** Student: record engagement with a theory component by type.
	 *  Works regardless of whether an approved interaction exists — creates the activity lazily. */
	engage: (lessonId: string, componentType: TheoryInteractionComponentType) =>
		post<{ data: { lessonProgress: unknown } }>(
			`/lessons/${lessonId}/theory-interactions/engage`,
			{ componentType },
		).then((r) => r.data),

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
