export type ProgrammingCategory = "algorithms" | "data-structures";

export type LessonDifficulty = "easy" | "medium" | "hard";

export type LessonStatus = "not-started" | "in-progress" | "completed";

export type LessonChip = {
	id: string;
	label: string;
};

export type ProgrammingCatalogItem = {
	id: string;
	name: string;
	path: string;
	category: ProgrammingCategory;
	group: string;
	groupLabel: string;
	groupOrder: number;
	sortOrder: number;
	description: string;
	difficulty?: LessonDifficulty;
	progress: number;
	status: LessonStatus;
	chips: LessonChip[];
	estimatedTime?: number;
	isAvailable: boolean;
};

export type ProgrammingCatalogResponse = {
	category: ProgrammingCategory;
	title: string;
	description: string;
	lessons: ProgrammingCatalogItem[];
};

export type ProgrammingCatalogFilter = {
	key: string;
	label: string;
	type: "all" | "group" | "difficulty";
	value?: string;
};

export type ProgrammingCatalogSection = {
	group: string;
	label: string;
	order: number;
	items: ProgrammingCatalogItem[];
};
