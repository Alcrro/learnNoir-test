export type LessonContentNode =
	| ConceptBlock
	| StepsBlock
	| ExampleBlock
	| ComplexityBlock
	| FormulaBlock
	| ProofBlock
	| TheoremBlock
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

export type ConceptBlock = {
	type: "concept";
	title: string;
	sections: {
		label: string;
		text: string;
	}[];
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
