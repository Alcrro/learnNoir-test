export type AlgorithmTypes =
	| "bubble-sort"
	| "insertion-sort"
	| "heap-sort"
	| "binary-tree";

export type VisualizationMethod = "box" | "vertical" | "pillar" | "tree";

export type Step = {
	array: { id: number; value: number }[];

	compare?: [number, number];
	swap?: [number, number];

	sorted?: number[];
	active?: number[];
	line?: number | number[];
};
