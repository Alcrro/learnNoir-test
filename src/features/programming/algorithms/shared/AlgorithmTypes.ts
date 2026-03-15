export type AlgorithmTypes =
	| "bubble-sort"
	| "insertion-sort"
	| "heap-sort"
	| "quick-sort"
	| "binary-tree-sort";

export const algorithms = [""];
export type VisualizationMethod =
	| "box"
	| "vertical"
	| "pillar"
	| "tree"
	| "bar";

export type Step = {
	array: { id: number; value: number }[];

	compare?: [number, number];
	swap?: [number, number];

	sorted?: number[];
	active?: number[];
	line?: number | number[];
};

export type ComplexityType = "best" | "average" | "worst" | "space";

export type ComplexityValue = "O(n)" | "O(n²)" | "O(n²)" | "O(1)";

export type AlgorithmComplexity = Record<ComplexityType, ComplexityValue>;

export type ComplexityInfoProps = {
	name: string;
	complexity: AlgorithmComplexity;
};

export type AlgorithmStatsType = {
	totalComparisons: string;
	totalSwaps: string;
	currentComparisons: string;
	currentSwaps: string;
};
