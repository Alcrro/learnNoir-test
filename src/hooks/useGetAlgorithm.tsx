import { useEffect } from "react";
import type { AlgorithmTypeProp } from "../features/programming/algorithms/data/algorithmArray";
import { useAlgorithmStore } from "../store/useAlgorithmStore";
import { generateBubbleSortSteps } from "../features/programming/algorithms/bubble-sort/domain/bubbleSort";

type UseAlgorithmStepProps = {
	initialArray: AlgorithmTypeProp[];
};

const useGetAlgorithm = ({ initialArray }: UseAlgorithmStepProps) => {
	const setSteps = useAlgorithmStore((s) => s.setSteps);
	const setTime = useAlgorithmStore((s) => s.setTime);

	return useEffect(() => {
		if (!initialArray.length) return;

		const runs = 100;
		const start = performance.now();

		let bubbleStep;
		for (let i = 0; i < runs; i++) {
			bubbleStep = generateBubbleSortSteps(initialArray);
		}

		const end = performance.now();

		const time = end - start;

		setSteps(bubbleStep ?? []);
		setTime(time);
	}, [initialArray, setSteps, setTime]);
};

export default useGetAlgorithm;
