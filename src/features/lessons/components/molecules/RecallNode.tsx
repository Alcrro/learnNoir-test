import { useLessonContext } from "../../context/LessonContext";
import { EmbeddedRecall } from "../../../../features/computer-science/algorithms/components/lesson/theory-v2/EmbeddedRecall";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import type { AnyNode } from "../tabs/theory/node-registry";
import type { LessonRecallQuestion } from "../../../../features/computer-science/algorithms/lib/buildAlgorithmLessonTheory";

function normalizeQuestion(q: Record<string, unknown>): LessonRecallQuestion {
	const rawOptions = Array.isArray(q.options) ? q.options : [];
	const options: string[] = rawOptions.map((o: unknown) => {
		if (typeof o === "string") return o;
		if (o && typeof o === "object" && "text" in o) return String((o as { text: unknown }).text);
		return String(o);
	});
	const correctIndex =
		typeof q.correctIndex === "number"
			? q.correctIndex
			: typeof q.correct === "number"
				? q.correct
				: 0;
	return {
		id: typeof q.id === "string" ? q.id : String(Math.random()),
		question: typeof q.question === "string" ? q.question : "",
		options,
		correctIndex,
		explanation: typeof q.explanation === "string" ? q.explanation : "",
	};
}

export function RecallNode({ node }: { node: AnyNode }) {
	const { lessonId } = useLessonContext();
	const questions = Array.isArray(node.questions)
		? (node.questions as Record<string, unknown>[]).map(normalizeQuestion)
		: [];
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
