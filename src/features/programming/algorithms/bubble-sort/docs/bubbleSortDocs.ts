import { Step, StepType } from "../../shared/AlgorithmTypes";
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

export const bubbleSortDocs = (step: Step): StepDocumentation => {
	const j = step.compare?.[0] ?? step.swap?.[0] ?? 0;
	const firstItem = step.array[j]?.value;
	const secondItem = step.array[j + 1]?.value;

	const docs: Record<StepType | "noSwap", StepDocumentation> = {
		compare: {
			title: "Comparare",
			explanation: `array[${j}] = ${firstItem} și array[${j + 1}] = ${secondItem}. Verificăm dacă e nevoie de swap.`,
			logic:
				"Comparăm fiecare pereche adiacentă pentru a decide dacă se schimbă locurile.",
			prerequisites: [
				{ id: 0, prereqId: "concept_compare_doc", value: "Concept de comparare" },
			],
			mnemonic: "Privim două elemente vecine și întrebăm: e ordinea corectă?",
		},

		swap: {
			title: "Swap",
			explanation: `${firstItem} > ${secondItem} → swap. ${firstItem} se mută la dreapta.`,
			logic: "Elementul mai mare avansează spre dreapta, spre poziția sa finală.",
			prerequisites: [{ id: 0, prereqId: "swap_doc", value: "Ce e swap" }],
			mnemonic: "Bula mare urcă la suprafață.",
		},

		noSwap: {
			title: "Fără swap",
			explanation: `${firstItem} < ${secondItem} → ordinea e corectă. Nu facem swap.`,
			logic: "Perechea e deja ordonată. Trecem mai departe.",
			prerequisites: [
				{ id: 0, prereqId: "concept_compare_doc", value: "Concept de comparare" },
			],
			mnemonic: "Bula mică rămâne la stânga.",
		},

		sorted: {
			title: "Element sortat",
			explanation: `${firstItem} a ajuns la poziția finală. Nu va mai fi atins.`,
			logic:
				"După fiecare pas, cel mai mare element nesort at se fixează la final.",
			prerequisites: [{ id: 0, prereqId: "array_doc", value: "Ce e un array" }],
			mnemonic: "Elementele sortate se acumulează de la dreapta spre stânga.",
		},
	};

	return docs[step.type ?? "compare"];
};
export const bubbleSortDocsInteractionV2 = {
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
