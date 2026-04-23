import { useState } from "react";
import AlgorithmDocs from "./AlgorithmDocs";
import AlgorithmDocsIntroduction from "./lesson/AlgorithmDocsIntroduction";
import { docsIntroduction } from "../bubble-sort/docs/docsIntroduction";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";

const AlgorithmDocumentation = () => {
	const [showAllSteps, setShowAllSteps] = useState(false);
	const currentStep = useAlgorithmStore((store) => store.currentStep);
	// console.log(currentStep);

	return (
		<>
			{!showAllSteps && (
				<AlgorithmDocs
					showAllSteps={showAllSteps}
					currentStep={currentStep}
				/>
			)}
			<AlgorithmDocsIntroduction {...docsIntroduction.bubbleSort} />
			<div onClick={() => setShowAllSteps((prev) => !prev)}>Show all steps</div>
		</>
	);
};

export default AlgorithmDocumentation;
