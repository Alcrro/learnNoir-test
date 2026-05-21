import { API_URL } from "../../../libs/config";

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

async function put<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "PUT",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

export type ProgrammingLanguage = "python" | "javascript" | "java" | "cpp";

// Shape returned by every lesson endpoint.
export type LessonDTO = {
	id: string;
	moduleId: string;
	language?: ProgrammingLanguage | null;
	title: string;
	slug: string;
	description: string | null;
	durationSeconds: number;
	position: number | null;
	isActive: boolean;
	status: "draft" | "reviewed" | "published";
	authors: { userId: string; role: string | null }[];
	createdAt: string;
	updatedAt: string;
};

export type UpdateLessonPayload = {
	title?: string;
	description?: string | null;
	durationSeconds?: number;
};

export const lessonsApi = {
	// GET /lessons/module/slug/:moduleSlug — returns all lessons for a module, optionally filtered by language.
	getByModuleSlug: (moduleSlug: string, language?: ProgrammingLanguage | null) => {
		const qs = language ? `?language=${language}` : "";
		return get<{ data: LessonDTO[] }>(`/lessons/module/slug/${moduleSlug}${qs}`).then((r) => r.data);
	},

	// GET /lessons/slug/:slug — returns a single lesson by its URL slug.
	getBySlug: (slug: string) =>
		get<{ data: LessonDTO }>(`/lessons/slug/${slug}`).then((r) => r.data),

	// GET /lessons/:id — returns a single lesson by its UUID.
	getById: (id: string) =>
		get<{ data: LessonDTO }>(`/lessons/${id}`).then((r) => r.data),

	// PUT /lessons/:id — update lesson metadata (teacher/admin only).
	update: (id: string, payload: UpdateLessonPayload) =>
		put<{ data: LessonDTO }>(`/lessons/${id}`, payload).then((r) => r.data),
};
