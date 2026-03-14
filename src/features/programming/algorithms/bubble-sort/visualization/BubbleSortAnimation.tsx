import { useState, useRef, useMemo, useEffect } from "react";
import useCompareHighlight from "../../../visualizer/hooks/useCompareHighlight";
import { useSearchParams } from "react-router-dom";
import DocsIntroduction from "../../../../../components/molecules/DocsIntroduction";
import { docsIntroduction } from "../docs/docsIntroduction";
import { useReset } from "../../../visualizer/hooks/useReset";
import useSetSearchParams from "../../../../../hooks/useSetSearchParams";
import ArrayVisualizer from "../../../../../components/organisms/ArrayVisualizer";
import AlgorithmsControls from "../../../../../components/organisms/AlgorithmsControls";
import AlgorithmDocs from "../../../../../components/organisms/AlgorithmDocs";
import GenerateRandomArray from "../../../../../components/molecules/GenerateRandomArray";
import { useAlgorithmStore } from "../../../../../store/useAlgorithmStore";
import { nextStep } from "../../../visualizer/engine/nextStep";
import VisualizerMethodSelector from "../../../../../components/molecules/VisualizerMethodSelector";
import useGetAlgorithm from "../../../../../hooks/useGetAlgorithm";
import AlcgorithInfoCard from "../../../../../components/molecules/AlcgorithInfoCard";

const BubbleSortAnimation = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const urlStep = Number(searchParams.get("step") ?? "0");
	const internalStep = urlStep - 1;
	// const [currentStep, setCurrentStep] = useState(internalStep);
	const [hasStarted, setHasStarted] = useState(false);
	const [arraySize, setArraySize] = useState(10);
	const [minValueState, setMinValueState] = useState(0);
	const [maxValueState, setMaxValueState] = useState(30);
	const generatedArray = useAlgorithmStore((store) => store.generatedArray);
	const currentStep = useAlgorithmStore((store) => store.currentStep);
	const setCurrentStep = useAlgorithmStore((store) => store.setCurrentStep);
	const steps = useAlgorithmStore((store) => store.steps);
	const time = useAlgorithmStore((store) => store.time);

	useEffect(() => {
		setCurrentStep(internalStep);
	}, [internalStep, setCurrentStep]);

	const currentArray =
		currentStep < 0 || !steps.length
			? generatedArray
			: (steps[currentStep]?.array ?? generatedArray);

	const boxesRef = useRef<HTMLDivElement[]>([]);

	const [showAllSteps, setShowAllSteps] = useState(false);
	console.log("generate steps");

	// highlights layouts
	useCompareHighlight({
		hasStarted: currentStep >= 0 && hasStarted,
		steps,
		currentStep,
		boxesRef,
	});

	//next steps
	const handleNextStep = useMemo(
		() =>
			nextStep({
				hasStarted,
				setHasStarted,
				setCurrentStep,
				currentStep,
				steps,
			}),
		[hasStarted, currentStep, steps, setCurrentStep],
	);

	// prev steps

	const handlePrevStep = () => {
		setCurrentStep(Math.max((currentStep ?? -1) - 1, -1));
	};

	//use search params
	useSetSearchParams({ currentStep, setSearchParams });

	//get algorithm and set steps
	useGetAlgorithm({ initialArray: generatedArray });

	//reset steps
	const { reset } = useReset(boxesRef, setCurrentStep);

	// const methods = visualizationMethods[currentArray];

	const totalComparisons = steps.filter((f) => f.compare);
	const totalSwaps = steps.filter((f) => f.swap);

	const currentSwap = steps
		.slice(0, currentStep + 1)
		.filter((s) => s.swap).length;
	const currentComparedItem = steps
		.slice(0, currentStep + 1)
		.filter((s) => s.compare).length;
	console.log(currentStep);

	const n = generatedArray.length;

	const complexity = totalComparisons.length <= n ? "O(n)" : "O(n²)";

	return (
		<div className="flex flex-col gap-2 algorithms py-2 w-full mx-auto">
			<div className="div flex justify-between items-center">
				<GenerateRandomArray
					setCurrentStep={setCurrentStep}
					size={arraySize}
					setSize={setArraySize}
					minValue={minValueState}
					maxValue={maxValueState}
					setMinValueState={setMinValueState}
					setMaxValueState={setMaxValueState}
					reset={reset}
				/>
				<div className="vizualizer_controller">
					<VisualizerMethodSelector />
				</div>
			</div>
			<ArrayVisualizer
				currentArray={currentArray}
				boxesRef={boxesRef}
			/>
			<div
				className="footer"
				onClick={(e) => e.stopPropagation()}
			>
				<AlgorithmsControls
					currentStep={currentStep}
					stepsLength={steps.length}
					handleNextStep={handleNextStep}
					handlePrevStep={handlePrevStep}
					reset={reset}
					setCurrentStep={setCurrentStep}
				/>
			</div>

			<div className="flex gap-2">
				<AlcgorithInfoCard
					description="comparisons"
					currentComparedCount={currentComparedItem.toString() ?? undefined}
					totalComparedCount={totalComparisons.length.toString()}
				/>
				<AlcgorithInfoCard
					description="swaps"
					currentComparedCount={currentSwap.toString()}
					totalComparedCount={totalSwaps.length.toString()}
				/>
				<AlcgorithInfoCard
					description="time"
					totalComparedCount={`${String(time.toFixed(2))} ms`}
				/>
				<AlcgorithInfoCard
					description="complexity"
					totalComparedCount={complexity}
				/>
			</div>
			{!showAllSteps && (
				<AlgorithmDocs
					showAllSteps={showAllSteps}
					stepsLength={steps.length}
					currentStep={currentStep}
				/>
			)}
			<DocsIntroduction {...docsIntroduction.bubbleSort} />
			<div onClick={() => setShowAllSteps((prev) => !prev)}>Show all steps</div>
		</div>
	);
};

export default BubbleSortAnimation;
