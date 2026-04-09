import type { LectureType } from "./compareElements";

export type StepDocumentation = {
	title: string;
	explanation: string;
	logic: string;
	prerequisites?: PrerequisiteProp[];
	mnemonic?: string;
};

export type PrerequisiteProp = {
	id: number;
	prereqId: LectureType;
	value: string;
};

export type StepDocumentationV2 = {
	title: string;

	// pentru UI
	explanation: (a: number, b: number) => string;

	// pentru întrebare
	question: (a: number, b: number) => string;

	// pentru feedback
	correctFeedback: (a: number, b: number) => string;
	wrongFeedback: (a: number, b: number) => string;

	logic: string;
};

export const bubbleSortDocs = (firstItem: number, secondItem: number) => {
	return {
		step1: {
			title: "Pas 1 – Comparare și swap",
			explanation:
				"Comparam primul și al doilea element. Dacă primul e mai mare decât al doilea, facem swap.",
			logic:
				"Bubble Sort mută elementele mari spre finalul array-ului, comparând perechi vecine.",
			prerequisites: [
				{ id: 0, prereqId: "array_doc", value: "Ce e un array" },
				{ id: 1, prereqId: "swap_doc", value: "Ce e swap" },
				{ id: 2, prereqId: "concept_compare_doc", value: "Concept de comparare" },
			],
			mnemonic: "Imaginează-ți că bulele mari urcă la suprafață.",
		},
		step2: {
			title: "Pas 2 – Comparare fără swap",
			explanation: `Comparăm ${firstItem} și ${secondItem}. ${firstItem} < ${firstItem}, deci nu facem swap.`,
			logic:
				"Dacă elementul curent e mai mic decât următorul, îl lăsăm la locul lui.",
			prerequisites: [
				{
					id: 0,
					prereqId: "compare_elements_doc",
					value: "Comparare elemente adiacente",
				},
			],
			mnemonic: "Bula mică rămâne jos/stanga.",
		},
		step3: {
			title: "Pas 3 – Comparare fără swap",
			explanation: "Comparăm 5 și 8. 5 < 8, deci nu facem swap.",
			logic:
				"Dacă elementul curent e mai mic decât următorul, îl lăsăm la locul lui.",
			prerequisites: [
				{ id: 0, prereqId: "comp_doc", value: "Comparare elemente adiacente" },
			],
			mnemonic: "Bula mică rămâne jos.",
		},
		// ... restul documentației
	} satisfies Record<string, StepDocumentation>;
};
export const bubbleSortDocsV2 = {
	compare: {
		title: "Comparare elemente",

		explanation: (a, b) => `Comparăm ${a} și ${b}.`,

		question: (a, b) => `Crezi că trebuie să facem swap între ${a} și ${b}?`,

		correctFeedback: (a, b) => `${a} < ${b} → corect, nu facem swap.`,

		wrongFeedback: (a, b) => `${a} < ${b}, deci NU trebuia swap.`,

		logic: "Dacă primul > al doilea → swap.",
	},

	swap: {
		title: "Swap",

		explanation: (a, b) => `${a} este mai mare decât ${b}, deci facem swap.`,

		question: (a, b) => `Trebuie să facem swap între ${a} și ${b}?`,

		correctFeedback: (a, b) => `${a} > ${b} → corect, facem swap.`,

		wrongFeedback: (a, b) => `${a} > ${b}, deci trebuia swap.`,

		logic: "Mutăm valorile mari spre final.",
	},

	sorted: {
		title: "Fără swap",

		explanation: (a, b) => `${a} este deja înaintea lui ${b}.`,

		question: (a, b) => `Trebuie să facem swap între ${a} și ${b}?`,

		correctFeedback: (a, b) => `${a} < ${b} → corect, nu facem swap.`,

		wrongFeedback: (a, b) => `${a} < ${b}, deci NU trebuia swap.`,

		logic: "Menținem stabilitatea.",
	},
} satisfies Record<string, StepDocumentationV2>;
