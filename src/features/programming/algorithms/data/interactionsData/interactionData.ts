import { Interaction } from "../../shared/engineInteractionTye";

export const compareInteraction: Interaction = {
	id: "compare",
	type: "boolean",

	difficulty: "easy",

	options: [
		{ id: "1", label: "Da" },
		{ id: "2", label: "Nu" },
	],

	question: (ctx) => {
		const { a, b } = ctx as { a: number; b: number };

		return `Trebuie swap între ${a} și ${b}?`;
	},

	validate: (ctx, answer: boolean | string[]) => {
		const { a, b } = ctx as { a: number; b: number };
		return (
			((answer as string[])[0] === "1" && a > b) ||
			((answer as string[])[0] === "2" && a <= b)
		);
	},

	feedback: {
		correct: () => "Corect",
		wrong: () => "Greșit",
	},
};

export const mcq: Interaction = {
	id: "mcq1",
	type: "single_choice",
	difficulty: "medium",
	question: () => "Care e complexitatea?",

	options: [
		{ id: "a", label: "O(n)" },
		{ id: "b", label: "O(n²)" },
	],

	validate: (_, answer: boolean | string[]) => (answer as string[])[0] === "b",

	feedback: {
		correct: () => "Corect",
		wrong: () => "Nu",
	},
};

export const swapAction: Interaction = {
	id: "swap_action",
	type: "action",
	difficulty: "easy",
	question: () => "Fă swap dacă e nevoie",

	validate: (ctx, answer: boolean | string[]) => {
		const { a, b } = ctx as { a: number; b: number };
		return (answer as string[])[0] === "swap" && a > b;
	},

	feedback: {
		correct: () => "Good",
		wrong: () => "Wrong move",
	},
};
