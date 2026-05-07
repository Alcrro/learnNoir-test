import type { CategoryWithModules } from "../api/categoriesApi";
import { SUBJECTS, type Subject } from "../../subjects/data/subjects.data";

const staticById = new Map(SUBJECTS.map((s) => [s.id, s]));

export function mapCatalogToSubjects(categories: CategoryWithModules[]): Subject[] {
	return categories.flatMap((category) =>
		category.modules.map((module): Subject => {
			const static_ = staticById.get(module.slug);
			return {
				id: module.slug,
				category: category.slug,
				title: module.name,
				description: static_?.description ?? "",
				totalLessons: module.lessonCount || (static_?.totalLessons ?? 0),
				completedLessons: static_?.completedLessons ?? 0,
				estimatedHours: module.estimatedHours || (static_?.estimatedHours ?? 0),
				difficulty: static_?.difficulty ?? "beginner",
				tags: static_?.tags ?? [],
				featured: static_?.featured ?? false,
			};
		}),
	);
}
