import type {
	ProgrammingCatalogFilter,
	ProgrammingCatalogItem,
	ProgrammingCatalogSection,
} from "../types/catalog.types";
import { difficultyLabels } from "./catalogPresentation";

export function buildProgrammingFilters(
	lessons: ProgrammingCatalogItem[],
): ProgrammingCatalogFilter[] {
	const groupFilters = Array.from(
		new Map(
			lessons.map((lesson) => [
				lesson.group,
				{
					key: `group:${lesson.group}`,
					label: lesson.groupLabel,
					type: "group" as const,
					value: lesson.group,
					order: lesson.groupOrder,
				},
			]),
		).values(),
	).sort((a, b) => a.order - b.order);

	const difficultyOrder = ["easy", "medium", "hard"] as const;

	const difficultyFilters = difficultyOrder
		.filter((difficulty) =>
			lessons.some((lesson) => lesson.difficulty === difficulty),
		)
		.map((difficulty) => ({
			key: `difficulty:${difficulty}`,
			label: difficultyLabels[difficulty],
			type: "difficulty" as const,
			value: difficulty,
		}));

	return [
		{ key: "all", label: "Toate", type: "all" },
		...groupFilters.map(({ order: _order, ...filter }) => filter),
		...difficultyFilters,
	];
}

export function filterProgrammingLessons(
	lessons: ProgrammingCatalogItem[],
	activeFilterKey: string,
): ProgrammingCatalogItem[] {
	if (activeFilterKey === "all") return lessons;

	if (activeFilterKey.startsWith("group:")) {
		const group = activeFilterKey.replace("group:", "");
		return lessons.filter((lesson) => lesson.group === group);
	}

	if (activeFilterKey.startsWith("difficulty:")) {
		const difficulty = activeFilterKey.replace("difficulty:", "");
		return lessons.filter((lesson) => lesson.difficulty === difficulty);
	}

	return lessons;
}

export function groupProgrammingLessons(
	lessons: ProgrammingCatalogItem[],
): ProgrammingCatalogSection[] {
	const grouped = new Map<string, ProgrammingCatalogSection>();

	for (const lesson of lessons) {
		const current = grouped.get(lesson.group);

		if (current) {
			current.items.push(lesson);
			continue;
		}

		grouped.set(lesson.group, {
			group: lesson.group,
			label: lesson.groupLabel,
			order: lesson.groupOrder,
			items: [lesson],
		});
	}

	return Array.from(grouped.values())
		.sort((a, b) => a.order - b.order)
		.map((section) => ({
			...section,
			items: [...section.items].sort((a, b) => a.sortOrder - b.sortOrder),
		}));
}
