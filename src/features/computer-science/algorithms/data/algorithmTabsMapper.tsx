// config/algorithmTabs.mapper.tsx
import { ReactElement } from "react";
import { FeatureTabUniqueIdType } from "../../../../content/FeaturesTabData";
import VisualizerV2 from "../visualizer-v2/VisualizerV2";
import AlgorithmLessonTheoryV1 from "../components/lesson/AlgorithmLessonTheoryV1";
import AlgorithmTableOfContents from "../components/lesson/AlgorithmTableOfContents";

export const algorithmTabsMapper: Record<FeatureTabUniqueIdType, ReactElement> =
	{
		theoryTab: <AlgorithmLessonTheoryV1 />,
		vizTab: <VisualizerV2 />,
		codeTab: (
			<div className="hidden xl:block px-1 max-w-80 2xl:max-w-120 w-full">
				<AlgorithmTableOfContents />
			</div>
		),
		quizTab: <>quizz</>,
	};
