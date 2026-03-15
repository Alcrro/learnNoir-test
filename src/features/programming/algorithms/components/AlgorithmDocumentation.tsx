import { useState } from "react";
import DocsIntroduction from "../../../../components/molecules/DocsIntroduction";
import AlgorithmDocs from "../../../../components/organisms/AlgorithmDocs";
import { docsIntroduction } from "../bubble-sort/docs/docsIntroduction";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";

const AlgorithmDocumentation = () => {
	const [showAllSteps, setShowAllSteps] = useState(false);

	const totalStepsCounter = useAlgorithmStore((store) => store.steps.length);
	const currentStep = useAlgorithmStore((store) => store.currentStep);
	return (
		<>
			{!showAllSteps && (
				<AlgorithmDocs
					showAllSteps={showAllSteps}
					stepsLength={totalStepsCounter}
					currentStep={currentStep}
				/>
			)}
			<DocsIntroduction {...docsIntroduction.bubbleSort} />
			<div onClick={() => setShowAllSteps((prev) => !prev)}>Show all steps</div>
		</>
	);
};

export default AlgorithmDocumentation;
