// import type { StepContext } from "./useNextStep";
// import { gsap } from "gsap";

// type PrevStepProps = StepContext & {
// 	history: SwapStep[];
// };
// export const prevStep = async (ctx: PrevStepProps) => {
// 	const { boxesRef, history, currentStep, setArray, setCurrentStep } = ctx;

// 	if (currentStep <= 0) return;
// 	const curStep = history[currentStep];
// 	const prevStepData = history[currentStep - 1];
// 	console.log({ currentStep });

// 	if (!curStep.swappedIndexes) {
// 		setArray(prevStepData.array);
// 		setCurrentStep(currentStep - 1);
// 		return;
// 	}

// 	const [j1, j2] = curStep.swappedIndexes;

// 	const box1 = boxesRef.current[j1];
// 	const box2 = boxesRef.current[j2];

// 	const pos1 = box1.offsetLeft;
// 	const pos2 = box2.offsetLeft;

// 	const tl = gsap.timeline();

// 	tl
// 		.to([box1, box2], { y: -80, zIndex: 10, duration: 0.2 })
// 		.to(box1, { x: pos2 - pos1, duration: 0.5 })
// 		.to(box2, { x: pos1 - pos2, duration: 0.5 }, "<")
// 		.to([box1, box2], { y: -80, zIndex: 1, duration: 0.2 });

// 	await tl.then();

// 	setArray(prevStepData.array);
// 	[boxesRef.current[j1], boxesRef.current[j2]] = [
// 		boxesRef.current[j2],
// 		boxesRef.current[j1],
// 	];

// 	setCurrentStep(currentStep - 1);
// };
