import type {
	ConceptBlock,
	StepsBlock,
	ComplexityBlock,
	FormulaBlock,
	ProofBlock,
	TheoremBlock,
	ExampleBlock,
} from "@shared/lesson-content";
import { ConceptNode } from "../molecules/ConceptNode";
import { StepsNode } from "../molecules/StepsNode";
import { ComplexityNode } from "../molecules/ComplexityNode";
import { FormulaNode } from "../molecules/FormulaNode";
import { ProofNode } from "../molecules/ProofNode";
import { TheoremNode } from "../molecules/TheoremNode";
import { ExampleNode } from "../molecules/ExampleNode";

type AnyNode = { type?: string; nodeType?: string; [key: string]: unknown };

type Props = { node: AnyNode };

export function ContentNodeRenderer({ node }: Props) {
	// Support both `type` (current schema) and `nodeType` (legacy seed format)
	const kind = node.type ?? node.nodeType;

	switch (kind) {
		case "concept":
			return <ConceptNode node={node as unknown as ConceptBlock} />;
		case "steps":
			return <StepsNode node={node as unknown as StepsBlock} />;
		case "complexity":
			return <ComplexityNode node={node as unknown as ComplexityBlock} />;
		case "formula":
			return <FormulaNode node={node as unknown as FormulaBlock} />;
		case "proof":
			return <ProofNode node={node as unknown as ProofBlock} />;
		case "theorem":
			return <TheoremNode node={node as unknown as TheoremBlock} />;
		case "example":
			return <ExampleNode example={node as unknown as ExampleBlock} />;
		case "heading": {
			const level = typeof node.level === "number" ? node.level : 2;
			const text = typeof node.text === "string" ? node.text : "";
			const Tag = `h${Math.min(Math.max(level, 1), 6)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
			const classes: Record<string, string> = {
				h1: "text-2xl font-bold text-(--text-primary)",
				h2: "text-xl font-semibold text-(--text-primary)",
				h3: "text-lg font-semibold text-(--text-primary)",
				h4: "text-base font-semibold text-(--text-primary)",
				h5: "text-sm font-semibold text-(--text-primary)",
				h6: "text-sm font-medium text-(--text-secondary)",
			};
			return <Tag className={classes[Tag]}>{text}</Tag>;
		}
		case "paragraph": {
			const text = typeof node.text === "string" ? node.text : "";
			return <p className="text-sm leading-relaxed text-(--text-secondary)">{text}</p>;
		}
		case "code": {
			const code = typeof node.code === "string" ? node.code : "";
			const language = typeof node.language === "string" ? node.language : "";
			return (
				<div className="rounded-xl border border-(--border) bg-(--surface) overflow-x-auto">
					{language && (
						<div className="px-4 py-1.5 border-b border-(--border) text-xs font-mono text-(--text-muted)">
							{language}
						</div>
					)}
					<pre className="p-4 text-sm font-mono text-(--text-primary) whitespace-pre">{code}</pre>
				</div>
			);
		}
		default:
			return null;
	}
}
