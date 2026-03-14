import { type FC } from "react";
import type { StepDocumentation } from "../../features/programming/algorithms/bubble-sort/docs/bubbleSortDocs";
import "../styles/algDocs.scss";

import Title from "./Title";
import { Explanation } from "./Explanation";
import Mnemonic from "./Mnemonic";
import Prerequisites from "./Prerequisites";
import Logic from "./Logic";

type AlgDocsProp = StepDocumentation & {
	currentStep: number;
	index: number;
};

const AlgDocs: FC<AlgDocsProp> = ({
	currentStep,
	index,
	title,
	explanation,
	logic,
	mnemonic,
	prerequisites,
}) => {
	if (!prerequisites?.length) return <>Test</>;
	return (
		<div className={`step-card ${currentStep === index ? "active" : ""}`}>
			<div className="step-header">
				<span className="step-badge">Pas {index + 1}</span>
				<Title title={title} />
			</div>

			<Explanation explanation={explanation} />
			{logic && <Logic logic={logic} />}

			{mnemonic && <Mnemonic mnemonic={mnemonic} />}

			{prerequisites?.length > 0 && (
				<Prerequisites prerequisites={prerequisites} />
			)}
		</div>
	);
};

export default AlgDocs;
