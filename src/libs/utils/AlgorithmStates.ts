import type {
	AlgorithmStatsType,
	Step,
} from "../../features/programming/algorithms/shared/AlgorithmTypes";

export function getAlgorithmStats(
	steps: Step[],
	currentStep: number,
): AlgorithmStatsType {
	let totalComparisons = 0;
	let totalSwaps = 0;
	let currentComparisons = 0;
	let currentSwaps = 0;

	for (let i = 0; i < steps.length; i++) {
		const step = steps[i];

		if (step.compare) {
			totalComparisons++;
			if (i <= currentStep) currentComparisons++;
		}

		if (step.swap) {
			totalSwaps++;
			if (i <= currentStep) currentSwaps++;
		}
	}

	return {
		totalComparisons: totalComparisons.toString(),
		totalSwaps: totalSwaps.toString(),
		currentComparisons: currentComparisons.toString(),
		currentSwaps: currentSwaps.toString(),
	};
}
