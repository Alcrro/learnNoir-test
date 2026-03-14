import type { Dispatch, SetStateAction } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import type { Step } from "../../algorithms/shared/AlgorithmTypes";

gsap.registerPlugin(Flip);

export type nextStepProps = {
	hasStarted: boolean;
	setHasStarted: Dispatch<SetStateAction<boolean>>;
	currentStep: number;
	setCurrentStep: (value: number) => void;
	steps: Step[];
};
export const nextStep = (ctx: nextStepProps) => {
	const { hasStarted, setHasStarted, currentStep, setCurrentStep, steps } = ctx;

	const handleNextStep = () => {
		if (!hasStarted) setHasStarted(true);

		const nextStepIndex = currentStep + 1;
		if (nextStepIndex >= steps.length) return; // stop doar când e chiar după ultimul step

		const nextStep = steps[nextStepIndex];

		const state = Flip.getState(`[data-role="box"]`);

		setCurrentStep(nextStepIndex);
		console.log("swap: ", nextStep.swap);

		if (nextStep?.swap) {
			requestAnimationFrame(() => {
				Flip.from(state, {
					duration: 0.5,
					ease: "power1.inOut",
					stagger: 0.02,
				});
			});
		} else {
			setCurrentStep(nextStepIndex);
		}
	};

	return handleNextStep;
};
