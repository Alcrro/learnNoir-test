import { type FC } from "react";
import type { StepDocumentationV2 } from "../../features/programming/algorithms/bubble-sort/docs/bubbleSortDocs";
import "../styles/algDocs.scss";

type AlgDocsProp = StepDocumentationV2 & {
	currentStep: number;
	index: number;
	stepValues: Record<"first" | "second", number>;
};

const AlgDocs: FC<AlgDocsProp> = ({ currentStep, index, title }) => {
	const isActive = currentStep === index;

	return (
		<div className={`flex-1 flex flex-col text-2xl ${isActive ? "active" : ""}`}>
			{/* Pas */}
			<div className="math-line h-full">
				<span className="math-step-index">Pas {index + 1}:</span>
				<span className="math-step-title">{title}</span>
			</div>
		</div>
	);
};

export default AlgDocs;
