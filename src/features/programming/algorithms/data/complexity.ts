import type { ComplexityInfoProps } from "../shared/AlgorithmTypes";

export const bubbleSortComplexityInfo: ComplexityInfoProps = {
	name: "Bubble Sort",
	complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
} as const;
