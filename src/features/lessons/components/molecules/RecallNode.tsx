import { useLessonContext } from "../../context/LessonContext";
import { EmbeddedRecall } from "../../../../features/computer-science/algorithms/components/lesson/theory-v2/EmbeddedRecall";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import type { AnyNode } from "../tabs/theory/node-registry";
import type { LessonRecallQuestion } from "../../../../features/computer-science/algorithms/lib/buildAlgorithmLessonTheory";

export function RecallNode({ node }: { node: AnyNode }) {
	const { lessonId } = useLessonContext();
	const questions = Array.isArray(node.questions) ? (node.questions as LessonRecallQuestion[]) : [];
	const placedAfter = typeof node.placedAfter === "string" ? node.placedAfter : "";

	if (questions.length === 0) return null;

	return (
		<EmbeddedRecall
			questions={questions}
			placedAfter={placedAfter}
			lessonId={lessonId}
			componentId={`recall-${placedAfter}`}
		/>
	);
}
