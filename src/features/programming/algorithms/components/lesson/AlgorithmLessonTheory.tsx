import AlgorithmDocsIntroduction from "./AlgorithmDocsIntroduction";
import { docsIntroduction } from "../../bubble-sort/docs/docsIntroduction";

const AlgorithmLessonTheory = () => {
	return (
		<div>
			<AlgorithmDocsIntroduction {...docsIntroduction.bubbleSort} />
		</div>
	);
};

export default AlgorithmLessonTheory;
