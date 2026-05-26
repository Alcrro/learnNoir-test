import type { ComponentType, ReactNode } from "react";
import type {
	ConceptBlock,
	StepsBlock,
	ComplexityBlock,
	FormulaBlock,
	ProofBlock,
	TheoremBlock,
	ExampleBlock,
} from "@shared/lesson-content";

import { ConceptNode } from "../../molecules/ConceptNode";
import { StepsNode } from "../../molecules/StepsNode";
import { ComplexityNode } from "../../molecules/ComplexityNode";
import { FormulaNode } from "../../molecules/FormulaNode";
import { ProofNode } from "../../molecules/ProofNode";
import { TheoremNode } from "../../molecules/TheoremNode";
import { ExampleNode } from "../../molecules/ExampleNode";
import { PredictNode } from "../../molecules/PredictNode";
import { ThinkNode } from "../../molecules/ThinkNode";
import { RecallNode } from "../../molecules/RecallNode";
import { InlineQuizNode } from "../../molecules/InlineQuizNode";
import { CodeRunnerNode } from "../../molecules/CodeRunnerNode";
import { DragSortNode } from "../../molecules/DragSortNode";
import { FillBlanksNode } from "../../molecules/FillBlanksNode";
import { HeadingNode } from "../../molecules/HeadingNode";
import { ParagraphNode } from "../../molecules/ParagraphNode";
import { CodeNode } from "../../molecules/CodeNode";

import { ConceptEditPanel } from "../../edit/panels/ConceptEditPanel";
import { StepsEditPanel } from "../../edit/panels/StepsEditPanel";
import { ComplexityEditPanel } from "../../edit/panels/ComplexityEditPanel";
import { TheoremEditPanel } from "../../edit/panels/TheoremEditPanel";
import { FormulaEditPanel } from "../../edit/panels/FormulaEditPanel";
import { HeadingEditPanel } from "../../edit/panels/HeadingEditPanel";
import { ParagraphEditPanel } from "../../edit/panels/ParagraphEditPanel";
import { CodeEditPanel } from "../../edit/panels/CodeEditPanel";

// `type` vine din JSON-ul lecțiilor produse de backend.
// `nodeType` e aliasul vechi — păstrat pentru compatibilitate cu date mai vechi.
export type AnyNode = { type?: string; nodeType?: string; [key: string]: unknown };

export type EditPanelProps = {
	node: AnyNode;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export type NodeRegistration = {
	Renderer: (props: { node: AnyNode }) => ReactNode;
	EditPanel?: ComponentType<EditPanelProps>;
};

// Pattern: Open/Closed — adaugi un tip nou creând un fișier în molecules/ + o linie aici.
export const NODE_REGISTRY: Record<string, NodeRegistration> = {
	heading: {
		Renderer: ({ node }) => <HeadingNode node={node} />,
		EditPanel: HeadingEditPanel,
	},
	paragraph: {
		Renderer: ({ node }) => <ParagraphNode node={node} />,
		EditPanel: ParagraphEditPanel,
	},
	code: {
		Renderer: ({ node }) => <CodeNode node={node} />,
		EditPanel: CodeEditPanel,
	},
	concept: {
		Renderer: ({ node }) => <ConceptNode node={node as ConceptBlock} />,
		EditPanel: ConceptEditPanel as ComponentType<EditPanelProps>,
	},
	steps: {
		Renderer: ({ node }) => <StepsNode node={node as StepsBlock} />,
		EditPanel: StepsEditPanel as ComponentType<EditPanelProps>,
	},
	complexity: {
		Renderer: ({ node }) => <ComplexityNode node={node as ComplexityBlock} />,
		EditPanel: ComplexityEditPanel as ComponentType<EditPanelProps>,
	},
	theorem: {
		Renderer: ({ node }) => <TheoremNode node={node as TheoremBlock} />,
		EditPanel: TheoremEditPanel as ComponentType<EditPanelProps>,
	},
	formula: {
		Renderer: ({ node }) => <FormulaNode node={node as FormulaBlock} />,
		EditPanel: FormulaEditPanel as ComponentType<EditPanelProps>,
	},
	proof: {
		Renderer: ({ node }) => <ProofNode node={node as ProofBlock} />,
	},
	example: {
		Renderer: ({ node }) => <ExampleNode example={node as ExampleBlock} />,
	},
	predict: {
		Renderer: ({ node }) => <PredictNode node={node} />,
	},
	think: {
		Renderer: ({ node }) => <ThinkNode node={node} />,
	},
	recall: {
		Renderer: ({ node }) => <RecallNode node={node} />,
	},
	"inline-quiz": {
		Renderer: ({ node }) => <InlineQuizNode node={node} />,
	},
	"code-runner": {
		Renderer: ({ node }) => <CodeRunnerNode node={node} />,
	},
	"drag-sort": {
		Renderer: ({ node }) => <DragSortNode node={node} />,
	},
	"fill-blanks": {
		Renderer: ({ node }) => <FillBlanksNode node={node} />,
	},
};
