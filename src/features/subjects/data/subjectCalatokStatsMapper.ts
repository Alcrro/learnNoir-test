export type SubjectCatalogStatsProps = {
	availableSubjects: number;
	comingSoonSubjects: number;
	totalLessons: number;
	totalHours: number;
};

// This mapper transforms the raw stats into a format suitable for display in the SubjectsCatalogStats component
export const SUBJECT_CATALOG_MAPPER = ({
	availableSubjects,
	comingSoonSubjects,
	totalLessons,
	totalHours,
}: SubjectCatalogStatsProps) => [
	{
		label: "Available now",
		value: availableSubjects,
		tone: "text-[var(--teal-text)]",
	},
	{
		label: "Coming soon",
		value: comingSoonSubjects,
		tone: "text-[var(--amber-text)]",
	},
	{
		label: "Lessons mapped",
		value: totalLessons,
		tone: "text-[var(--text-primary)]",
	},
	{
		label: "Estimated hours",
		value: `~${totalHours}h`,
		tone: "text-[var(--text-primary)]",
	},
];
