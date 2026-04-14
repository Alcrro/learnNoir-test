import { useState, type FC } from "react";
import { bubbleSortDocs } from "../bubble-sort/docs/bubbleSortDocs";
import MathPageLayout from "../../../mathematics/components/MathPageLayout";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import { useExtractStepsValues } from "../hooks/useExtractStepsValues";
import NextStepInteractionBtn from "../../../../components/molecules/buttons/NextStepInteractionBtn";
import PrevStepInteractionBtn from "../../../../components/molecules/buttons/PrevStepInteractionBtn";
import InteractionLayout from "./interactions/InteractionLayout";
import AlgorithmStepDocs from "./lesson/AlgorithmStepDocs";

type AlgDocsProps = {
	showAllSteps: boolean;
	currentStep: number;
};

type AlgorithmDocsContentProps = {
	currentStep: number;
	stepValues: NonNullable<ReturnType<typeof useExtractStepsValues>>;
};

const AlgorithmDocsContent = ({
	currentStep,
	stepValues,
}: AlgorithmDocsContentProps) => {
	const steps = useAlgorithmStore((store) => store.steps);
	const [currentStepInteraction, setCurrentStepInteraction] =
		useState<number>(-1);

	const goNextInteraction = () => {
		if (currentStepInteraction === -1) {
			setCurrentStepInteraction(0);
			return;
		}

		setCurrentStepInteraction((prev) => prev + 1);
	};

	const goPrevInteraction = () => {
		if (currentStepInteraction === -1) return;

		if (currentStepInteraction === 0) {
			setCurrentStepInteraction(-1);
			return;
		}

		setCurrentStepInteraction((prev) => prev - 1);
	};

	const step = steps[currentStep];

	const isDoc = currentStepInteraction === -1;
	const stepDocumentation = bubbleSortDocs(step);

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
						<AlgorithmStepDocs
							{...stepDocumentation}
							index={0}
							currentStep={currentStep}
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

const AlgorithmDocs: FC<AlgDocsProps> = ({ showAllSteps, currentStep }) => {
	const stepValues = useExtractStepsValues();

	if (showAllSteps) return null;
	if (!stepValues) return null;

	return (
		<AlgorithmDocsContent
			key={currentStep}
			currentStep={currentStep}
			stepValues={stepValues}
		/>
	);
};

export default AlgorithmDocs;
