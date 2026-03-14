import type { FC } from "react";
import { Fragment } from "react/jsx-runtime";
import { bubbleSortDocs } from "../../features/programming/algorithms/bubble-sort/docs/bubbleSortDocs";
import AlgDocs from "../molecules/AlgDocs";

type AlgDocsProps = {
	showAllSteps: boolean;
	stepsLength: number;
	currentStep: number;
};
const AlgorithmDocs: FC<AlgDocsProps> = ({
	showAllSteps,
	stepsLength,
	currentStep,
}) => {
	if (showAllSteps) return null;

	return (
		<div className="docs">
			{Object.entries(bubbleSortDocs).map(([_k, v], index) => {
				return (
					<Fragment key={index}>
						{index >= stepsLength ? (
							<div>Done</div>
						) : (
							currentStep === index && (
								<AlgDocs
									{...v}
									currentStep={currentStep}
									index={index}
								/>
							)
						)}
					</Fragment>
				);
			})}
		</div>
	);
};

export default AlgorithmDocs;
