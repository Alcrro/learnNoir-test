export type LessonContentNode =
	| ConceptBlock
	| StepsBlock
	| ExampleBlock
	| ComplexityBlock
	| FormulaBlock
	| ProofBlock
	| TheoremBlock
	| DragSortBlock
	| FillBlanksBlock
	| { type: string; [key: string]: unknown };

export type FormulaBlock = {
	type: "formula";
	latex: string;
	description?: string;
};

export type ProofBlock = {
	type: "proof";
	steps: {
		text: string;
		latex?: string;
	}[];
};

export type TheoremBlock = {
	type: "theorem";
	title: string;
	statement: string;
};

export type ConceptQuizOption = {
	text: string;
	correct?: boolean;
	explanation?: string;
};

export type ConceptSection = {
	label: string;
	text: string;
	quiz?: {
		question: string;
		options: ConceptQuizOption[];
	};
};

export type ConceptBlock = {
	type: "concept";
	title: string;
	sections: ConceptSection[];
};

export type TextContent = Array<
	| { type: "paragraph"; text: string }
	| { type: "inlineCode"; code: string }
	| { type: "label"; text: string }
>;

export type StepsBlock = {
	type: "steps";
	steps: {
		title: string;
		content: TextContent;
		example?: ExampleBlock;
	}[];
};

export type ExampleBlock = {
	type: "example";
	initial: number[];
	states: {
		array: number[];
		action: string;
		highlights?: {
			compare?: number[];
			swap?: number[];
			sorted?: number[];
		};
	}[];
};

export type ComplexityBlock = {
	type: "complexity";
	cases: {
		type: "best" | "average" | "worst";
		time: string;
		description: string;
	}[];
	space: string;
};

export type DragSortBlock = {
	type: "drag-sort";
	items: number[];
	title?: string;
	hint?: string;
};

export type FillBlanksBlank = {
	id: number;
	options: string[];
	correct: string;
};

export type FillBlanksBlock = {
	type: "fill-blanks";
	title?: string;
	content: string;      // text/cod cu markeri {{0}}, {{1}}, ...
	blanks: FillBlanksBlank[];
	language?: string;    // "js", "python", etc. → cod monospace; absent → text normal
};
