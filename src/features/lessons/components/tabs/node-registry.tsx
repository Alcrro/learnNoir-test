// Registry-ul mapează fiecare nodeType la componenta de randare + panoul de editare opțional.
// Pattern: Open/Closed — adaugi un tip nou creând un fișier + o singură linie aici,
// fără să atingi ContentNodeRenderer sau alte tipuri existente.

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

import { ConceptNode } from "../molecules/ConceptNode";
import { StepsNode } from "../molecules/StepsNode";
import { ComplexityNode } from "../molecules/ComplexityNode";
import { FormulaNode } from "../molecules/FormulaNode";
import { ProofNode } from "../molecules/ProofNode";
import { TheoremNode } from "../molecules/TheoremNode";
import { ExampleNode } from "../molecules/ExampleNode";

import { ConceptEditPanel } from "../edit/panels/ConceptEditPanel";
import { StepsEditPanel } from "../edit/panels/StepsEditPanel";
import { ComplexityEditPanel } from "../edit/panels/ComplexityEditPanel";
import { TheoremEditPanel } from "../edit/panels/TheoremEditPanel";
import { FormulaEditPanel } from "../edit/panels/FormulaEditPanel";
import { HeadingEditPanel } from "../edit/panels/HeadingEditPanel";
import { ParagraphEditPanel } from "../edit/panels/ParagraphEditPanel";
import { CodeEditPanel } from "../edit/panels/CodeEditPanel";

// ── tipul de bază al nodului ──────────────────────────────────────────────────

// `type` vine din JSON-ul lecțiilor produse de backend.
// `nodeType` e aliasul vechi — păstrat pentru compatibilitate cu date mai vechi.
export type AnyNode = { type?: string; nodeType?: string; [key: string]: unknown };

// ── structura unei înregistrări ───────────────────────────────────────────────

export type NodeRegistration = {
	// Renderer acceptă AnyNode — fiecare intrare face cast-ul necesar intern
	Renderer: (props: { node: AnyNode }) => ReactNode;
	// ComponentType<any> pentru că fiecare panou are props tipizate specific;
	// type-safety e păstrată *în interiorul* fiecărui panou, nu la granița registry-ului
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	EditPanel?: ComponentType<any>;
};

// ── registrul nodurilor structurate ──────────────────────────────────────────
// heading, paragraph, code nu sunt incluse aici — au logică JSX inline (clase condiționale,
// tag dinamic) care nu merită extrasă într-o componentă separată la dimensiunea actuală.
// Panourile lor de editare sunt înregistrate separat în PRIMITIVE_EDIT_PANELS.

export const NODE_REGISTRY: Record<string, NodeRegistration> = {
	concept: {
		Renderer: ({ node }) => <ConceptNode node={node as ConceptBlock} />,
		EditPanel: ConceptEditPanel,
	},
	steps: {
		Renderer: ({ node }) => <StepsNode node={node as StepsBlock} />,
		EditPanel: StepsEditPanel,
	},
	complexity: {
		Renderer: ({ node }) => <ComplexityNode node={node as ComplexityBlock} />,
		EditPanel: ComplexityEditPanel,
	},
	theorem: {
		Renderer: ({ node }) => <TheoremNode node={node as TheoremBlock} />,
		EditPanel: TheoremEditPanel,
	},
	formula: {
		Renderer: ({ node }) => <FormulaNode node={node as FormulaBlock} />,
		EditPanel: FormulaEditPanel,
	},
	// proof și example nu au panou de editare — sunt read-only în UI
	proof: {
		Renderer: ({ node }) => <ProofNode node={node as ProofBlock} />,
	},
	// ExampleNode folosește `example` ca prop — adaptorul aliniază interfața cu registry-ul
	example: {
		Renderer: ({ node }) => <ExampleNode example={node as ExampleBlock} />,
	},
};

// Panouri de editare pentru tipurile primitive (heading, paragraph, code).
// Separate de NODE_REGISTRY pentru că randarea lor rămâne inline în ContentNodeRenderer.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PRIMITIVE_EDIT_PANELS: Record<string, ComponentType<any>> = {
	heading: HeadingEditPanel,
	paragraph: ParagraphEditPanel,
	code: CodeEditPanel,
};

// Clase CSS pentru fiecare nivel de heading — ținute alături de registry pentru coeziune
export const HEADING_CLASSES: Record<string, string> = {
	h1: "text-2xl font-bold text-(--text-primary)",
	h2: "text-xl font-semibold text-(--text-primary)",
	h3: "text-lg font-semibold text-(--text-primary)",
	h4: "text-base font-semibold text-(--text-primary)",
	h5: "text-sm font-semibold text-(--text-primary)",
	h6: "text-sm font-medium text-(--text-secondary)",
};
