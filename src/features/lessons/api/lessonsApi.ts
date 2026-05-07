const API_URL =
	(import.meta.env["VITE_API_URI"] as string | undefined) ?? "http://localhost:3000/api";

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

// Shape returned by every lesson endpoint.
export type LessonDTO = {
	id: string;
	moduleId: string;
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

export const lessonsApi = {
	// GET /lessons/module/slug/:moduleSlug — returns all lessons for a module.
	getByModuleSlug: (moduleSlug: string) =>
		get<{ data: LessonDTO[] }>(`/lessons/module/slug/${moduleSlug}`).then((r) => r.data),

	// GET /lessons/slug/:slug — returns a single lesson by its URL slug.
	getBySlug: (slug: string) =>
		get<{ data: LessonDTO }>(`/lessons/slug/${slug}`).then((r) => r.data),

	// GET /lessons/:id — returns a single lesson by its UUID.
	getById: (id: string) =>
		get<{ data: LessonDTO }>(`/lessons/${id}`).then((r) => r.data),
};
