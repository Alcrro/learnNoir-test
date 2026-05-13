// config/algorithmTabs.mapper.tsx
import { ReactElement } from "react";
import { FeatureTabUniqueIdType } from "../../../../content/FeaturesTabData";
import VisualizerV2 from "../visualizer-v2/VisualizerV2";
import AlgorithmLessonTheoryV2 from "../components/lesson/AlgorithmLessonTheoryV2";
import AlgorithmTableOfContents from "../components/lesson/AlgorithmTableOfContents";

export const algorithmTabsMapper: Record<FeatureTabUniqueIdType, ReactElement> =
	{
		theoryTab: <AlgorithmLessonTheoryV2 />,
		vizTab: <VisualizerV2 />,
		codeTab: (
			<div className="hidden xl:block px-1 max-w-80 2xl:max-w-120 w-full">
				<AlgorithmTableOfContents />
			</div>
		),
		quizTab: <>quizz</>,
	};
