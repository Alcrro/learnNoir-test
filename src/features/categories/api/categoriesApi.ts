import { apiClient } from "../../../libs/apiClient";

export type ModuleCard = {
	id: string;
	name: string;
	slug: string;
	position: number;
	lessonCount: number;
	estimatedHours: number;
	importance: "essential" | "normal" | "optional";
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
		apiClient.get<{ data: CategoryWithModules[] }>(`/categories/by-subject/${subjectSlug}`)
			.then((r) => r.data),
};
