import { useState, type FC } from "react";
import { bubbleSortDocsV2 } from "../bubble-sort/docs/bubbleSortDocs";
import AlgDocs from "../../../../components/molecules/AlgDocs";
import MathPageLayout from "../../../mathematics/components/MathPageLayout";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import { StepType } from "../shared/AlgorithmTypes";
import { useExtractStepsValues } from "../hooks/useExtractStepsValues";
import NextStepInteractionBtn from "../../../../components/molecules/buttons/NextStepInteractionBtn";
import PrevStepInteractionBtn from "../../../../components/molecules/buttons/PrevStepInteractionBtn";
import InteractionLayout from "./interactions/InteractionLayout";

type AlgDocsProps = {
	showAllSteps: boolean;
	currentStep: number;
};
const AlgorithmDocs: FC<AlgDocsProps> = ({ showAllSteps, currentStep }) => {
	const [prevStep, setPrevStep] = useState<number | null>(null);
	const steps = useAlgorithmStore((store) => store.steps);

	const stepValues = useExtractStepsValues();
	console.log(stepValues);

	const [currentStepInteraction, setCurrentStepInteraction] =
		useState<number>(-1);

	if (showAllSteps) return null;
	if (!stepValues) return null;

	const goNextInteraction = () => {
		if (currentStepInteraction === -1) {
			setPrevStep(-1);
			setCurrentStepInteraction(0);
			return;
		}

		setPrevStep(currentStepInteraction);
		setCurrentStepInteraction((prev) => prev + 1);
	};

	const goPrevInteraction = () => {
		if (currentStepInteraction === -1) return;

		if (currentStepInteraction === 0) {
			setPrevStep(0);
			setCurrentStepInteraction(-1);
			return;
		}

		setPrevStep(currentStepInteraction);
		setCurrentStepInteraction((prev) => prev - 1);
	};

	const step = steps[currentStep];

	const current = bubbleSortDocsV2[step?.type as StepType];

	const isDoc = currentStepInteraction === -1;

	return (
		<MathPageLayout>
			<div className="math-step page-wrapper flex flex-col h-full">
				{currentStepInteraction !== -1 && (
					<div className="page old-page turning">
						<InteractionLayout stepValues={stepValues} />
					</div>
				)}

				{/* PAGINA NOUĂ */}
				<div className="flex-1 flex flex-col p-4 h-full">
					{isDoc ? (
						<AlgDocs
							{...current}
							index={0}
							currentStep={currentStep}
							stepValues={stepValues}
						/>
					) : (
						<InteractionLayout stepValues={stepValues} />
					)}
					<div className="flex gap-2 ">
						{currentStepInteraction !== null && currentStepInteraction >= 0 && (
							<PrevStepInteractionBtn handlePrev={goPrevInteraction} />
						)}

						<NextStepInteractionBtn handleNextStep={goNextInteraction} />
					</div>
				</div>
			</div>
		</MathPageLayout>
	);
};

export default AlgorithmDocs;
