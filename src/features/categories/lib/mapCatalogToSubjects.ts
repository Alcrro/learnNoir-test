import type { CategoryWithModules } from "../api/categoriesApi";
import { SUBJECTS, type Subject } from "../../subjects/data/subjects.data";

const staticById = new Map(SUBJECTS.map((s) => [s.id, s]));

export function mapCatalogToSubjects(categories: CategoryWithModules[]): Subject[] {
	return categories.flatMap((category) =>
		category.modules.map((module): Subject => {
			const meta = staticById.get(module.slug);
			return {
				id: module.slug,
				category: category.slug,
				title: module.name,
				description: meta?.description ?? "",
				totalLessons: module.lessonCount,
				completedLessons: 0,
				estimatedHours: module.estimatedHours,
				difficulty: meta?.difficulty ?? "intermediate",
				tags: meta?.tags ?? [],
				featured: meta?.featured ?? false,
			};
		}),
	);
}
