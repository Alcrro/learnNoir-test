export type SubjectTrack = "technology" | "mathematics" | "science";

export type SubjectAvailability = "available" | "coming-soon";

export type SubjectAccent =
	| "indigo"
	| "cyan"
	| "emerald"
	| "amber"
	| "rose"
	| "violet";

export type SubjectDomain = {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	track: SubjectTrack;
	availability: SubjectAvailability;
	accent: SubjectAccent;
	href?: string;
	modules: number;
	completedModules: number;
	lessons: number;
	estimatedHours: number;
	topics: string[];
	featured?: boolean;
};

export type SubjectsCatalogFilters = {
	search: string;
	track: "all" | SubjectTrack;
	availability: "all" | SubjectAvailability;
};

export type FilterOption<T extends string> = {
	value: T;
	label: string;
};
