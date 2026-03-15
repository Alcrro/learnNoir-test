import { useMemo, useRef } from "react";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import { nextStep } from "../engine/nextStep";
import { useToggleStore } from "../../../../store/usetoggleStore";

const useBubbleSortController = () => {
	const boxesRef = useRef<HTMLDivElement[]>([]);

	// const generatedArray = useAlgorithmStore((store) => store.generatedArray);
	const currentStep = useAlgorithmStore((store) => store.currentStep);
	const setCurrentStep = useAlgorithmStore((store) => store.setCurrentStep);
	const steps = useAlgorithmStore((store) => store.steps);
	const setHasStarted = useToggleStore((store) => store.setToggle);
	const hasStarted = useToggleStore((store) => store.isToggled("isAutoPlay"));

	//next steps
	const handleNextStep = useMemo(() => {
		return nextStep({
			hasStarted,
			setHasStarted,
			setCurrentStep,
			currentStep,
			steps,
		});
	}, [currentStep, hasStarted, setCurrentStep, setHasStarted, steps]);

	// prev steps

	const handlePrevStep = () => {
		setCurrentStep(Math.max((currentStep ?? -1) - 1, -1));
	};
	return { boxesRef, handleNextStep, handlePrevStep };
};

export default useBubbleSortController;
