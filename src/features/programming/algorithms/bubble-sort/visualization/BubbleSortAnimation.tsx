import useSetSearchParams from "../../../../../hooks/useSetSearchParams";
import ArrayVisualizer from "../../../../../components/organisms/ArrayVisualizer";
import AlgorithmsControls from "../../../../../components/organisms/AlgorithmsControls";
import GenerateRandomArray from "../../../../../components/molecules/GenerateRandomArray";
import { useAlgorithmStore } from "../../../../../store/useAlgorithmStore";
import VisualizerMethodSelector from "../../../../../components/molecules/VisualizerMethodSelector";
import AlgorithmStats from "../../components/AlgorithmStats";
import AlgorithmDocumentation from "../../components/AlgorithmDocumentation";
import useArraySettings from "../../../visualizer/hooks/useArraySettings";
import useBubbleSortController from "../../../visualizer/hooks/useBubbleSortController";
import useStepFromUrl from "../../../visualizer/hooks/useStepFromUrl";
import useCurrentArray from "../../../visualizer/hooks/useCurrentArray";
import useBubbleSortAnimation from "../../../visualizer/hooks/useBubbleSortAnimation";

const BubbleSortAnimation = () => {
	//use current search params into currentstepp
	const { setSearchParams } = useStepFromUrl();

	const {
		arraySize,
		setArraySize,
		minValueState,
		maxValueState,
		setMaxValueState,
		setMinValueState,
	} = useArraySettings();

	const currentStep = useAlgorithmStore((store) => store.currentStep);
	const setCurrentStep = useAlgorithmStore((store) => store.setCurrentStep);
	const steps = useAlgorithmStore((store) => store.steps);

	const currentArray = useCurrentArray();

	const { boxesRef, handleNextStep, handlePrevStep } = useBubbleSortController();

	// highlights layouts
	//get algorithm and set steps
	useBubbleSortAnimation({ boxesRef });

	//use search params
	useSetSearchParams({ currentStep, setSearchParams });

	return (
		<div className="flex flex-col gap-2 algorithms py-2 w-full mx-auto">
			<div className="flex justify-between items-center max-sm:flex-wrap max-sm:justify-center">
				<GenerateRandomArray
					setCurrentStep={setCurrentStep}
					size={arraySize}
					setSize={setArraySize}
					minValue={minValueState}
					maxValue={maxValueState}
					setMinValueState={setMinValueState}
					setMaxValueState={setMaxValueState}
					boxesRef={boxesRef}
				/>
				<div className="vizualizer_controller">
					<VisualizerMethodSelector />
				</div>
			</div>
			<ArrayVisualizer
				currentArray={currentArray}
				boxesRef={boxesRef}
			/>

			<AlgorithmsControls
				currentStep={currentStep}
				stepsLength={steps.length}
				handleNextStep={handleNextStep}
				handlePrevStep={handlePrevStep}
				boxesRef={boxesRef}
				setCurrentStep={setCurrentStep}
			/>

			<AlgorithmStats />

			<AlgorithmDocumentation />
		</div>
	);
};

export default BubbleSortAnimation;
