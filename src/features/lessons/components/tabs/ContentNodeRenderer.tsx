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

type AnyNode = { type: string; [key: string]: unknown };

type Props = { node: AnyNode };

export function ContentNodeRenderer({ node }: Props) {
	switch (node.type) {
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
		default:
			return null;
	}
}
