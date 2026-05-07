import type { FC } from "react";
import type { AlgorithmTypes, Step } from "../../shared/AlgorithmTypes";
import AlgorithmLabel from "../atoms/AlgorithmLabel";
import StepBadge from "../atoms/StepBadge";
import StepTypeBadge from "../atoms/StepTypeBadge";
import VisualizationMethodSelectorV2 from "../../components/visualizers/controls/VisualizationMethodSelectorV2";

type Props = {
	algorithm: AlgorithmTypes | null;
	currentStep: number;
	steps: Step[];
};

const VisualizerHeader: FC<Props> = ({ algorithm, currentStep, steps }) => {
	const currentStepData = steps[currentStep];
	return (
		<div className="flex items-center justify-between flex-wrap gap-2 px-1 pb-2">
			<div className="flex items-center gap-2 flex-wrap">
				<AlgorithmLabel algorithm={algorithm} />
				<StepTypeBadge
					stepType={currentStepData?.type}
					currentStep={currentStep}
				/>
			</div>
			<div className="flex items-center gap-3">
				<StepBadge
					currentStep={currentStep}
					totalSteps={steps.length}
				/>
				<VisualizationMethodSelectorV2 />
			</div>
		</div>
	);
};

export default VisualizerHeader;
