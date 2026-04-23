// config/subjectTabs.config.ts

import { ReactElement } from "react";
import Visualizer from "../../features/computer-science/algorithms/bubble-sort/visualization/Visualizer";
import AlgorithmLessonTheory from "../../features/computer-science/algorithms/components/lesson/AlgorithmLessonTheory";
import CodeEditor from "../../features/computer-science/algorithms/components/codeEditor/CodeEditor";
import Quiz from "../../features/components/quizz/Quiz";
import { FeatureTabUniqueIdType } from "../../content/FeaturesTabData";
import { Subject } from "../../types/interactionTypes";
import MathTheory from "../../features/mathematics/components/mathTheory/MathTheory";

type TabConfig = {
	id: FeatureTabUniqueIdType;
	component: ReactElement;
};

function MathVisualizer() {
	return (
		<div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
			Math visualizer is not available yet.
		</div>
	);
}

export const subjectTabsConfig: Record<Subject, TabConfig[]> = {
	"computer-science": [
		{ id: "learnTab", component: <AlgorithmLessonTheory /> },
		{ id: "vizTab", component: <Visualizer /> },
		{ id: "codeTab", component: <CodeEditor /> },
		{ id: "quizTab", component: <Quiz /> },
	],

	mathematics: [
		{ id: "learnTab", component: <MathTheory /> },
		{ id: "vizTab", component: <MathVisualizer /> },
		// ❌ NO codeTab
		{ id: "quizTab", component: <Quiz /> },
	],
};
