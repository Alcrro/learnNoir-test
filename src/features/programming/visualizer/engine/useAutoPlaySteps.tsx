import { useEffect } from "react";

type UseAutoPlayStepsProps = {
	isPlaying: boolean;
	currentStep: number;
	steps: number;
	handleNextStep: () => void;
};
const useAutoPlaySteps = ({
	isPlaying,
	currentStep,
	steps,
	handleNextStep,
}: UseAutoPlayStepsProps) => {
	return useEffect(() => {
		if (!isPlaying) return;

		if (currentStep >= steps - 1) {
			return;
		}

		const id = setTimeout(() => {
			handleNextStep();
		}, 500);

		return () => clearTimeout(id);
	}, [isPlaying, currentStep, steps, handleNextStep]);
};

export default useAutoPlaySteps;
