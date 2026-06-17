import { useEffect } from "react";
import { useAlgorithmStore } from "../../../../../store/useAlgorithmStore";
import { useAlgorithmStoreV2 } from "../../../../../store/useAlgorithmStoreV2";
import { generateBubbleSortStepsV2 } from "../../bubble-sort/domain/bubbleSortV2";

export function useGenerateBubbleSortV2() {
	const generatedArray = useAlgorithmStore((s) => s.generatedArray);
	const setStepsV2 = useAlgorithmStoreV2((s) => s.setStepsV2);

	useEffect(() => {
		if (!generatedArray.length) return;
		const steps = generateBubbleSortStepsV2(generatedArray);
		setStepsV2(steps);
	}, [generatedArray, setStepsV2]);
}
