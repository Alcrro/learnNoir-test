// config/algorithmTabs.mapper.tsx
import { ReactElement } from "react";
import { FeatureTabUniqueIdType } from "../../../../content/FeaturesTabData";
import Visualizer from "../bubble-sort/visualization/Visualizer";
import AlgorithmLessonTheory from "../components/lesson/AlgorithmLessonTheory";
import AlgorithmTableOfContents from "../components/lesson/AlgorithmTableOfContents";

export const algorithmTabsMapper: Record<FeatureTabUniqueIdType, ReactElement> =
	{
		learnTab: <AlgorithmLessonTheory />,
		vizTab: <Visualizer />,
		codeTab: (
			<div className="hidden xl:block px-1 max-w-80 2xl:max-w-120 w-full">
				<AlgorithmTableOfContents />
			</div>
		),
		quizTab: <>quizz</>,
	};
