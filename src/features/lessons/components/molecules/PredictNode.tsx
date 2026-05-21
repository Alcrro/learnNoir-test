import { PredictPrompt } from "../../../../features/computer-science/algorithms/components/lesson/theory-v2/PredictPrompt";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import type { AnyNode } from "../tabs/theory/node-registry";

export function PredictNode({ node }: { node: AnyNode }) {
	const question = typeof node.question === "string" ? node.question : "";
	if (!question) return null;
	return <PredictPrompt question={question} />;
}
