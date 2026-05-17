export type QuizPrereq = {
	name: string;
	status: "done" | "pending";
};

export type QuizRelatedLesson = {
	title: string;
	why: string;
	path?: string;
};

export type QuizRelatedContent = {
	prerequisites: QuizPrereq[];
	relatedLessons: QuizRelatedLesson[];
};

const DEFAULT_RELATED: QuizRelatedContent = {
	prerequisites: [
		{ name: "Arrays / lists", status: "done" },
		{ name: "For / while loops", status: "done" },
		{ name: "Comparisons & swapping", status: "pending" },
	],
	relatedLessons: [
		{ title: "Merge Sort", why: "Similar divide-and-conquer approach, O(n log n)" },
		{ title: "Selection Sort", why: "Comparison-based alternative, also O(n²)" },
		{ title: "Insertion Sort", why: "More efficient in practice for small arrays" },
	],
};

// Keyed by quiz block ID. Falls back to DEFAULT_RELATED if ID not found.
// Replace entries with real data when the API supports prerequisites.
const QUIZ_RELATED: Record<string, QuizRelatedContent> = {
	"ql-bubble-sort": {
		prerequisites: [
			{ name: "Arrays / lists", status: "done" },
			{ name: "For / while loops", status: "done" },
			{ name: "Comparisons & swapping", status: "done" },
			{ name: "Big O Notation", status: "pending" },
		],
		relatedLessons: [
			{ title: "Merge Sort", why: "Better time complexity, same stability" },
			{ title: "Quick Sort", why: "In-place sorting with better average case" },
			{ title: "Insertion Sort", why: "More efficient for nearly-sorted data" },
			{ title: "Selection Sort", why: "Also O(n²), useful comparison" },
		],
	},
	"ql-merge-sort": {
		prerequisites: [
			{ name: "Recursion", status: "done" },
			{ name: "Arrays / lists", status: "done" },
			{ name: "Divide & conquer", status: "pending" },
		],
		relatedLessons: [
			{ title: "Bubble Sort", why: "Simpler O(n²) baseline for comparison" },
			{ title: "Quick Sort", why: "Also divide-and-conquer, in-place" },
			{ title: "Heap Sort", why: "Another O(n log n) guaranteed algorithm" },
		],
	},
	"ql-arrays-basics": {
		prerequisites: [
			{ name: "Variables & data types", status: "done" },
			{ name: "Index-based access", status: "done" },
		],
		relatedLessons: [
			{ title: "Linked Lists", why: "Dynamic alternative to static arrays" },
			{ title: "Binary Search", why: "Efficient search on sorted arrays" },
			{ title: "Bubble Sort", why: "First sorting algorithm — uses array traversal" },
		],
	},
	"ql-big-o": {
		prerequisites: [
			{ name: "Basic algebra", status: "done" },
			{ name: "Loops & iteration", status: "done" },
		],
		relatedLessons: [
			{ title: "Arrays: The Basics", why: "Apply Big O to array operations" },
			{ title: "Binary Search", why: "Classic O(log n) example" },
			{ title: "Bubble Sort", why: "Classic O(n²) example" },
		],
	},
};

export function getQuizRelatedContent(quizId: string): QuizRelatedContent {
	return QUIZ_RELATED[quizId] ?? DEFAULT_RELATED;
}
