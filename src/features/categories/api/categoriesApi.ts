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

export type ModuleCard = {
	id: string;
	name: string;
	slug: string;
	position: number;
	lessonCount: number;
	estimatedHours: number;
};

export type CategoryWithModules = {
	id: string;
	name: string;
	slug: string;
	position: number;
	modules: ModuleCard[];
	totalLessons: number;
};

export const categoriesApi = {
	getBySubject: (subjectSlug: string) =>
		get<{ success: boolean; data: CategoryWithModules[] }>(
			`/categories/by-subject/${subjectSlug}`,
		).then((r) => r.data),
};
