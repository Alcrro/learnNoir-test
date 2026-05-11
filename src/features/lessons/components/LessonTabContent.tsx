import { useParams } from "react-router-dom";
import type { LessonTabId } from "../hooks/useLessonPageQuery";
import type { ContentBlock, AssessmentBlock, LessonBlock } from "../api/lessonBlocksApi";
import { LessonTheoryContent } from "./tabs/LessonTheoryContent";
import { LessonQuizContent } from "./tabs/LessonQuizContent";
import { LessonWatchContent } from "./tabs/LessonWatchContent";
import VisualizerV2 from "../../computer-science/algorithms/visualizer-v2/VisualizerV2";
import AlgorithmLessonTheoryV1 from "../../computer-science/algorithms/components/lesson/AlgorithmLessonTheoryV1";

type Props = {
	tab: LessonTabId;
	blocks: LessonBlock[];
	lessonSlug: string;
	lessonUpdatedAt?: string;
};

const LessonTabContent = ({ tab, blocks, lessonSlug, lessonUpdatedAt }: Props) => {
	const { category } = useParams<{ category: string }>();

	const contentBlocks = blocks.filter(
		(b): b is ContentBlock => b.type === "content",
	);
	const assessmentBlocks = blocks.filter(
		(b): b is AssessmentBlock =>
			b.type === "assessment" && b.engine !== "quiz:code",
	);

	switch (tab) {
		case "theoryTab":
			if (category === "algorithms" || category === "data-structures") {
				return <AlgorithmLessonTheoryV1 lessonId={lessonSlug} updatedAt={lessonUpdatedAt} />;
			}
			return <LessonTheoryContent blocks={contentBlocks} lessonId={lessonSlug} />;
		case "vizTab":
			return <VisualizerV2 />;
		case "codeTab":
			return (
				<div className="rounded-xl border border-(--border) p-5 text-sm text-(--text-secondary)">
					Code playground coming soon.
				</div>
			);
		case "quizTab":
			return (
				<LessonQuizContent
					blocks={assessmentBlocks}
					lessonSlug={lessonSlug}
				/>
			);
		case "watchTab":
			return <LessonWatchContent lessonId={lessonSlug} />;
		default:
			return null;
	}
};

export default LessonTabContent;
