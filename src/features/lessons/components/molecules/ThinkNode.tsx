import { ThinkPrompt } from "../../../../features/computer-science/algorithms/components/lesson/theory-v1/ThinkPrompt";
import { StepsReveal } from "../../../../features/computer-science/algorithms/components/lesson/theory-v1/StepsReveal";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import type { AnyNode } from "../tabs/theory/node-registry";

export function ThinkNode({ node }: { node: AnyNode }) {
	const question = typeof node.question === "string" ? node.question : "";
	const revealLabel = typeof node.revealLabel === "string" ? node.revealLabel : "Am gândit — arată-mi →";
	const steps = Array.isArray(node.steps) ? (node.steps as { title: string; description: string; codeHint?: string }[]) : [];

	if (!question) return null;

	return (
		<ThinkPrompt question={question} revealLabel={revealLabel}>
			<StepsReveal steps={steps} />
		</ThinkPrompt>
	);
}
