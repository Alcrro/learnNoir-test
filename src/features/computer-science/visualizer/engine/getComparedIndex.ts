import type { Step } from "../../algorithms/shared/AlgorithmTypes";

export const getComparedIndexes = (steps: Step[], untilStep: number) => {
	const compared = new Set<number>();

	for (let i = 0; i <= untilStep; i++) {
		const cmp = steps[i]?.compare;
		if (!cmp) continue;

		compared.add(cmp[0]);
		compared.add(cmp[1]);
	}

	return compared;
};
