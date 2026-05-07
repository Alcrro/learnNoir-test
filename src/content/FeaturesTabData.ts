export type FeatureTabsProps = {
	id: number;
	uniqueId: FeatureTabUniqueIdType;
	label: string;
};

export const ALL_FEATURE_TABS = [
	{ id: 0, uniqueId: "theoryTab", label: "Theory1" },
	{ id: 1, uniqueId: "vizTab", label: "Visualizer" },
	{ id: 2, uniqueId: "codeTab", label: "code" },
	{ id: 3, uniqueId: "quizTab", label: "quiz" },
] as const;
export type FeatureTabUniqueIdType =
	(typeof ALL_FEATURE_TABS)[number]["uniqueId"];
