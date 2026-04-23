import useSetSearchParams from "../../../../../hooks/useSetSearchParams";
import ArrayVisualizer from "../../components/visualizers/ArrayVisualizer";
import AlgorithmsControls from "../../components/visualizers/AlgorithmsControls";
import GenerateRandomArrayControls from "../../components/visualizers/controls/GenerateRandomArrayControls";
import { useAlgorithmStore } from "../../../../../store/useAlgorithmStore";
import VisualizationMethodSelector from "../../components/visualizers/controls/VisualizationMethodSelector";
import AlgorithmStats from "../../components/AlgorithmStats";
import AlgorithmDocumentation from "../../components/AlgorithmDocumentation";
import useArraySettings from "../../../visualizer/hooks/useArraySettings";
import useCurrentArray from "../../../visualizer/hooks/useCurrentArray";
import useBubbleSortAnimation from "../../../visualizer/hooks/useBubbleSortAnimation";
import useAlgorithmController from "../../../visualizer/hooks/useAlgorithmController";

const BubbleSortAnimation = () => {
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

	const { boxesRef, handleNextStep, handlePrevStep } = useAlgorithmController();

	// highlights layouts
	//get algorithm and set steps
	useBubbleSortAnimation({ boxesRef });

	//use search params
	useSetSearchParams({ currentStep });

	return (
		<div className="flex flex-col gap-2 algorithms md:p-4 w-full mx-auto">
			<div className="flex flex-col max-sm:flex-wrap max-sm:justify-center bg-(--bg-card) rounded-xl">
				<div className="flex justify-between items-center max-[420px]:flex-wrap">
					<GenerateRandomArrayControls
						setCurrentStep={setCurrentStep}
						size={arraySize}
						setSize={setArraySize}
						minValue={minValueState}
						maxValue={maxValueState}
						setMinValueState={setMinValueState}
						setMaxValueState={setMaxValueState}
						boxesRef={boxesRef}
					/>
					<div className="vizualizer_controller max-[420px]:mx-auto pb-4">
						<VisualizationMethodSelector />
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
			</div>

			<AlgorithmStats />

			<AlgorithmDocumentation />
		</div>
	);
};

export default BubbleSortAnimation;
