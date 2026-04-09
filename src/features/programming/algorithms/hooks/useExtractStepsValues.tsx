import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";

export function useExtractStepsValues(): Record<string, number> | null {
	const steps = useAlgorithmStore((store) => store.steps);
	const currentStep = useAlgorithmStore((store) => store.currentStep);

	const step = steps[currentStep];
	if (!step) return null;

	const indices = step?.compare || step?.swap || step?.sorted;

	if (!indices) return null;

	const [i, j] = indices;

	const first = step.array[i]?.value;
	const second = step.array[j]?.value;

	// let explanation = "";
	if (first == null || second == null) return null;

	if (step.compare) {
		return { first, second };
	}

	if (step.swap) {
		return { first, second };
	}
	if (step.sorted) {
		return { first };
	}

	return null;
}
