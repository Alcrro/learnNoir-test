import type { LessonContentNode } from "@shared/lesson-content";

export type LayoutTemplate = {
	id: string;
	name: string;
	description: string;
	icon: string;
	nodeTypes: string[];
	aiPromptHint: string;
};

export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
	{
		id: "algorithm",
		name: "Algoritm",
		description: "Sorting, searching, graph, DP, greedy etc.",
		icon: "⚙",
		nodeTypes: [
			"predict",
			"concept",
			"example",
			"steps",
			"complexity",
			"think",
			"recall",
			"fill-blanks",
			"inline-quiz",
			"drag-sort",
		],
		aiPromptHint: "algorithm: concept, visual example with state transitions, step-by-step walkthrough, Big-O complexity (best/average/worst), fill-in-the-blanks pseudocode, MCQ on edge cases, drag-to-order steps",
	},
	{
		id: "data-structure",
		name: "Structură de date",
		description: "Array, Linked List, Stack, Queue, Tree, Heap, Hash Table etc.",
		icon: "🗂",
		nodeTypes: [
			"predict",
			"concept",
			"example",
			"steps",
			"complexity",
			"think",
			"recall",
			"code",
			"fill-blanks",
			"inline-quiz",
			"drag-sort",
		],
		aiPromptHint: "data structure: concept with visual structure, operations walkthrough, worked example, Big-O per operation, code reference (insert/delete/search), fill-in-the-blanks, MCQ on use cases",
	},
	{
		id: "math-concept",
		name: "Concept matematic",
		description: "Teoreme, formule, demonstrații, proofs.",
		icon: "∑",
		nodeTypes: [
			"predict",
			"concept",
			"theorem",
			"formula",
			"proof",
			"think",
			"recall",
			"inline-quiz",
			"recall",
		],
		aiPromptHint: "mathematical concept: intuitive concept, formal theorem statement, key formula in LaTeX, step-by-step proof, MCQ on applications",
	},
	{
		id: "javascript-concept",
		name: "Concept JavaScript / Web",
		description: "Event Loop, Closures, Promises, Prototypes, React hooks etc.",
		icon: "🌐",
		nodeTypes: [
			"predict",
			"concept",
			"code",
			"steps",
			"think",
			"recall",
			"code-runner",
			"fill-blanks",
			"inline-quiz",
			"drag-sort",
		],
		aiPromptHint: "javascript/web concept: concept with browser/runtime context, runnable code example, step-by-step execution, interactive code runner, fill-in-the-blanks, MCQ on gotchas",
	},
	{
		id: "logic-concept",
		name: "Logică / Gândire critică",
		description: "Propoziții, silogisme, fallacies, argumente.",
		icon: "🧠",
		nodeTypes: [
			"predict",
			"concept",
			"steps",
			"think",
			"recall",
			"inline-quiz",
			"drag-sort",
		],
		aiPromptHint: "logic and critical thinking: concept with real-world examples, reasoning steps, think-before-reveal exercise, MCQ on argument validity, drag-to-order logical steps",
	},
	{
		id: "system-design",
		name: "System Design",
		description: "Scalability, reliability, distributed systems, case studies.",
		icon: "🏗",
		nodeTypes: [
			"predict",
			"concept",
			"example",
			"steps",
			"think",
			"recall",
			"inline-quiz",
			"drag-sort",
		],
		aiPromptHint: "system design concept: intuitive motivation, real-world example with architecture diagram description, step-by-step design process, trade-offs, MCQ on design decisions, drag-to-order design steps",
	},
	{
		id: "general",
		name: "Lecție generală",
		description: "Structură flexibilă pentru orice subiect.",
		icon: "📄",
		nodeTypes: [
			"predict",
			"concept",
			"steps",
			"think",
			"recall",
			"fill-blanks",
			"inline-quiz",
			"drag-sort",
		],
		aiPromptHint: "general programming concept: intuitive concept, step-by-step explanation, think-and-reveal, fill-in-the-blanks, MCQ",
	},
];

export function getTemplateNodeDefaults(
	template: LayoutTemplate,
): LessonContentNode[] {
	const counts: Record<string, number> = {};
	return template.nodeTypes.map((type) => {
		counts[type] = (counts[type] ?? 0) + 1;
		return { type } as LessonContentNode;
	});
}
