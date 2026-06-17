import { useState, useMemo, useEffect } from "react";
import type { StepV2 } from "../../../shared/AlgorithmTypesV2";

export function useStepPlayer(steps: StepV2[]) {
	const [currentFrame, setCurrentFrame] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	// reset when a new steps array is passed in (i.e. array was reshuffled)
	useEffect(() => {
		setCurrentFrame(0);
		setIsPlaying(false);
	}, [steps]);

	const sortedSet = useMemo(() => {
		const set = new Set<number>();
		for (let i = 0; i <= currentFrame; i++) {
			const s = steps[i];
			if (s?.type === "noSwap" && s.sorted) {
				for (const idx of s.sorted) set.add(idx);
			}
		}
		return set;
	}, [steps, currentFrame]);

	useEffect(() => {
		if (!isPlaying) return;
		if (currentFrame >= steps.length - 1) {
			setIsPlaying(false);
			return;
		}
		const id = setTimeout(() => setCurrentFrame((f) => f + 1), 1600);
		return () => clearTimeout(id);
	}, [isPlaying, currentFrame, steps.length]);

	const totalFrames = steps.length;
	const step = steps[currentFrame];
	const swapEmptyIdx = step?.type === "swap" ? (step.swap?.[1] ?? -1) : -1;
	const tempValue =
		step?.type === "swap" && step.swap != null
			? step.array[step.swap[1]]?.value
			: null;

	return {
		step,
		currentFrame,
		totalFrames,
		sortedSet,
		swapEmptyIdx,
		tempValue,
		isPlaying,
		handleReset: () => { setCurrentFrame(0); setIsPlaying(false); },
		handleNext: () => setCurrentFrame((f) => Math.min(totalFrames - 1, f + 1)),
		handlePrev: () => setCurrentFrame((f) => Math.max(0, f - 1)),
		handlePlayPause: () => setIsPlaying((p) => !p),
	};
}
