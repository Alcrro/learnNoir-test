import type { Step } from "../../algorithms/shared/AlgorithmTypes";

export const getSortedIndexes = (steps: Step[], currentStep: number) => {
	const sorted = new Set<number>();

	for (let i = 0; i <= currentStep; i++) {
		steps[i]?.sorted?.forEach((idx) => {
			sorted.add(idx);
		});
	}

	return sorted;
};
