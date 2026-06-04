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
		id: "sorting-algorithm",
		name: "Algoritm de sortare",
		description: "Bubble Sort, Merge Sort, Quick Sort etc.",
		icon: "↕",
		nodeTypes: ["concept", "inline-quiz", "steps", "recall", "complexity", "inline-quiz", "think", "fill-blanks", "code"],
		aiPromptHint: "sorting algorithm lesson",
	},
	{
		id: "searching-algorithm",
		name: "Algoritm de căutare",
		description: "Binary Search, Linear Search etc.",
		icon: "🔍",
		nodeTypes: ["concept", "steps", "complexity", "inline-quiz", "think", "code"],
		aiPromptHint: "searching algorithm lesson",
	},
	{
		id: "data-structure",
		name: "Structură de date",
		description: "Array, Linked List, Stack, Tree etc.",
		icon: "🗂",
		nodeTypes: ["concept", "example", "steps", "complexity", "think", "recall", "code"],
		aiPromptHint: "data structure lesson",
	},
	{
		id: "math-concept",
		name: "Concept matematic",
		description: "Teoreme, formule, demonstrații.",
		icon: "∑",
		nodeTypes: ["concept", "theorem", "formula", "proof", "think", "recall"],
		aiPromptHint: "mathematical concept lesson",
	},
	{
		id: "general",
		name: "Lecție generală",
		description: "Structură flexibilă pentru orice subiect.",
		icon: "📄",
		nodeTypes: ["concept", "steps", "think", "recall", "code"],
		aiPromptHint: "general programming lesson",
	},
];

export function getTemplateNodeDefaults(template: LayoutTemplate): LessonContentNode[] {
	const counts: Record<string, number> = {};
	return template.nodeTypes.map((type) => {
		counts[type] = (counts[type] ?? 0) + 1;
		return { type } as LessonContentNode;
	});
}
