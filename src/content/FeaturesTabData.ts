type _FeatureTabsProps = {
	id: number;
	uniqueId: string;
	label: string;
};

export const featureTabs = [
	{ id: 0, uniqueId: "learnTab", label: "learn" },
	{ id: 1, uniqueId: "vizTab", label: "Visualizer" },
	{ id: 2, uniqueId: "codeTab", label: "code" },
	{ id: 3, uniqueId: "quizTab", label: "quiz" },
] as const;

export type FeatureTabUniqueIdType = (typeof featureTabs)[number]["uniqueId"];
