import { type FC } from "react";
import type { StepDocumentation } from "../../bubble-sort/docs/bubbleSortDocs";
import "../../../../../components/styles/algDocs.scss";
import { useLectureStore } from "../../../../../store/useLectureStore";

type AlgDocsProp = StepDocumentation & {
	currentStep: number;
	index: number;
};

const AlgorithmStepDocs: FC<AlgDocsProp> = ({
	currentStep,
	index,
	title,
	explanation,
	logic,
	mnemonic,
	prerequisites,
}) => {
	// const isActive = currentStep === index
	const addLecture = useLectureStore((store) => store.addLecture);
	// if (!isActive) return null; // only render active step

	return (
		<div className="alg-docs ml-4 text-xl">
			{/* Header */}
			<div className="alg-docs__header">
				<span className="alg-docs__index">Pas {index + 1} </span>
				<span className="alg-docs__title">{title}</span>
			</div>

			{/* What is happening right now — primary content */}
			<p className="alg-docs__explanation">{explanation}</p>

			{/* Why — secondary, collapsible */}
			<details className="alg-docs__logic">
				<summary>De ce?</summary>
				<p>{logic}</p>
			</details>

			{/* Memory hook */}
			<div className="alg-docs__mnemonic">
				<span>💡</span>
				<p>{mnemonic}</p>
			</div>

			{/* Prerequisites — only if relevant */}
			{prerequisites && prerequisites.length > 0 && (
				<div className="alg-docs__prerequisites">
					<span>Ai nevoie de:</span>
					<ul>
						{prerequisites.map((p) => (
							<li key={p.id}>
								<button onClick={() => addLecture(p.prereqId, currentStep)}>
									{p.value}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default AlgorithmStepDocs;
