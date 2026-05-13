import { useParams } from "react-router-dom";
import { useLessonPageQuery } from "../hooks/useLessonPageQuery";
import { useLessonDataStore } from "../store/useLessonDataStore";
import type { ContentBlock, AssessmentBlock } from "../api/lessonBlocksApi";
import { LessonTheoryContent } from "./tabs/LessonTheoryContent";
import { LessonQuizContent } from "./tabs/LessonQuizContent";
import { LessonWatchContent } from "./tabs/LessonWatchContent";
import VisualizerV2 from "../../computer-science/algorithms/visualizer-v2/VisualizerV2";
import AlgorithmLessonTheoryV1 from "../../computer-science/algorithms/components/lesson/AlgorithmLessonTheoryV1";
import AlgorithmLessonTheoryV2 from "../../computer-science/algorithms/components/lesson/AlgorithmLessonTheoryV2";

const LessonTabContent = () => {
	const { category } = useParams<{ category: string }>();
	const { tab } = useLessonPageQuery();
	const lesson = useLessonDataStore((s) => s.lesson);
	const blocks = useLessonDataStore((s) => s.blocks);

	const lessonId = lesson?.id ?? "";
	const lessonUpdatedAt = lesson?.updatedAt;

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
				return (
					<AlgorithmLessonTheoryV2
						lessonId={lessonId}
						updatedAt={lessonUpdatedAt}
					/>
				);
			}
			return (
				<LessonTheoryContent
					blocks={contentBlocks}
					lessonId={lessonId}
				/>
			);
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
					lessonSlug={lessonId}
				/>
			);
		case "watchTab":
			return <LessonWatchContent lessonId={lessonId} />;
		default:
			return null;
	}
};

export default LessonTabContent;
