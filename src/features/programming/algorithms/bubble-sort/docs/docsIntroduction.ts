import type { LessonComplexityCard } from "../../components/lesson/AlgorithmDocsIntroduction";

export const bubbleSortComplexityLesson = [
	{
		label: "cel mai rau",
		value: "O(n²)",
		desc: "array sortat invers",
	},
	{
		label: "mediu",
		value: "O(n²)",
		desc: "date aleatoare",
	},
	{
		label: "cel mai bun",
		value: "O(n)",
		desc: "array deja sortat",
	},
] satisfies LessonComplexityCard[];

export const docsIntroduction = {
	bubbleSort: {
		title: "Bubble Sort",

		description:
			"Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through a list, compares adjacent elements and swaps them if they are in the wrong order.",

		why: "It is mainly used for learning purposes because it clearly demonstrates how sorting works step by step.",

		whenToUse: [
			"Very small datasets",
			"Educational visualization",
			"When simplicity matters more than performance",
		],

		keyIdea:
			"Larger elements 'bubble' to the end of the array after each iteration.",

		complexities: bubbleSortComplexityLesson,
	},
};
