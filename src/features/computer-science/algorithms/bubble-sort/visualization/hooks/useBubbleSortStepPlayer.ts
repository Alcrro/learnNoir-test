import { useMemo } from "react";
import { useAlgorithmStore } from "../../../../../../store/useAlgorithmStore";
import { generateBubbleSortStepsV2 } from "../../domain/bubbleSortV2";
import { useStepPlayer } from "./useStepPlayer";

export function useBubbleSortStepPlayer() {
	const generatedArray = useAlgorithmStore((s) => s.generatedArray);
	const setGeneratedArray = useAlgorithmStore((s) => s.setGeneratedArray);

	const steps = useMemo(
		() => (generatedArray.length > 0 ? generateBubbleSortStepsV2(generatedArray) : []),
		[generatedArray],
	);

	const player = useStepPlayer(steps);

	function handleShuffle() {
		const n = generatedArray.length || 8;
		const values = Array.from({ length: n }, (_, i) => ({
			id: i + 1,
			value: Math.floor(Math.random() * 18) + 1,
		}));
		setGeneratedArray(values);
	}

	return { ...player, handleShuffle };
}
