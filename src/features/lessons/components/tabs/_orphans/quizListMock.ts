import { BUBBLE_SORT_QUIZ } from "./quizMock";
import type { MockQuiz, QuizSummaryItem } from "./quizTypes";

const ARRAYS_BASICS_QUIZ: MockQuiz = {
	title: "Arrays: The Basics",
	questions: [
		{
			id: "arr-1",
			type: "mcq",
			difficulty: "beginner",
			question: "What is the time complexity of accessing an element by index in an array?",
			options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
			correctIndex: 2,
			explanation:
				"Array elements are stored in contiguous memory, so index-based access is always O(1) regardless of array size.",
		},
		{
			id: "arr-2",
			type: "mcq",
			difficulty: "beginner",
			question: "What is the worst-case time complexity of inserting at the beginning of an array?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correctIndex: 2,
			explanation:
				"Inserting at the beginning requires shifting all existing elements one position to the right — O(n) operations.",
		},
		{
			id: "arr-3",
			type: "mcq",
			difficulty: "beginner",
			question: "Which operation is NOT O(1) on a dynamic array?",
			options: [
				"Read by index",
				"Write by index",
				"Append to end (amortized)",
				"Insert at arbitrary index",
			],
			correctIndex: 3,
			explanation:
				"Inserting at an arbitrary index requires shifting all subsequent elements, making it O(n).",
		},
		{
			id: "arr-4",
			type: "input",
			difficulty: "beginner",
			question:
				"An array has 8 elements. What is the index of the last element? (enter a number)",
			correctAnswer: "7",
			placeholder: "Enter a number…",
			explanation:
				"Arrays are zero-indexed: the first element is at index 0, so the last element is at index n−1 = 8−1 = 7.",
		},
	],
};

const BIG_O_QUIZ: MockQuiz = {
	title: "Big O Notation",
	questions: [
		{
			id: "bigo-1",
			type: "mcq",
			difficulty: "beginner",
			question: "What does Big O notation describe?",
			options: [
				"The exact number of operations",
				"The best-case performance",
				"The upper bound of the growth rate",
				"Memory usage only",
			],
			correctIndex: 2,
			explanation:
				"Big O notation describes the upper bound (worst-case) growth rate of an algorithm relative to input size.",
		},
		{
			id: "bigo-2",
			type: "mcq",
			difficulty: "beginner",
			question: "Which of these grows the slowest as n increases?",
			options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
			correctIndex: 3,
			explanation:
				"O(log n) grows the slowest here — typical of algorithms that halve the problem size each step (e.g. binary search).",
		},
		{
			id: "bigo-3",
			type: "mcq",
			difficulty: "beginner",
			question:
				"If an algorithm does 3n² + 5n + 7 operations, what is its Big O complexity?",
			options: ["O(3n²)", "O(n² + n)", "O(n²)", "O(n)"],
			correctIndex: 2,
			explanation:
				"Big O drops constants and lower-order terms. 3n² + 5n + 7 simplifies to O(n²).",
		},
	],
};

export const QUIZ_LIST: QuizSummaryItem[] = [
	// ── Beginner ─────────────────────────────────────────────────────────────────
	{
		id: "ql-arrays-basics",
		title: "Arrays: The Basics",
		description:
			"Index access, insertion, deletion — the fundamental operations every developer must know cold.",
		primaryDifficulty: "beginner",
		questionCount: 4,
		maxPoints: 4,
		estimatedMinutes: 3,
		status: "completed",
		score: 88,
		quiz: ARRAYS_BASICS_QUIZ,
	},
	{
		id: "ql-big-o",
		title: "Big O Notation",
		description:
			"Growth rates, asymptotic bounds, and how to reason about algorithm performance at scale.",
		primaryDifficulty: "beginner",
		questionCount: 3,
		maxPoints: 3,
		estimatedMinutes: 3,
		status: "completed",
		score: 75,
		quiz: BIG_O_QUIZ,
	},
	{
		id: "ql-linked-lists-intro",
		title: "Linked Lists: Intro",
		description:
			"Nodes, pointers, and why linked lists trade random access for fast insertions at both ends.",
		primaryDifficulty: "beginner",
		questionCount: 5,
		maxPoints: 5,
		estimatedMinutes: 4,
		status: "available",
	},
	{
		id: "ql-recursion",
		title: "Recursion Foundations",
		description:
			"Base cases, call stacks, and how to think about problems that reduce to smaller versions of themselves.",
		primaryDifficulty: "beginner",
		questionCount: 5,
		maxPoints: 5,
		estimatedMinutes: 5,
		status: "locked",
	},
	{
		id: "ql-stacks-queues",
		title: "Stacks & Queues",
		description:
			"LIFO vs FIFO, real-world use cases, and implementing both with arrays and linked lists.",
		primaryDifficulty: "beginner",
		questionCount: 6,
		maxPoints: 6,
		estimatedMinutes: 5,
		status: "locked",
	},
	{
		id: "ql-binary-search-intro",
		title: "Binary Search: Intro",
		description:
			"Divide-and-conquer search in O(log n) — preconditions, invariants, and off-by-one traps.",
		primaryDifficulty: "beginner",
		questionCount: 5,
		maxPoints: 5,
		estimatedMinutes: 4,
		status: "locked",
	},
	{
		id: "ql-hash-tables-intro",
		title: "Hash Tables: Intro",
		description:
			"Hashing, collision strategies, and why average O(1) lookup feels like magic.",
		primaryDifficulty: "beginner",
		questionCount: 6,
		maxPoints: 6,
		estimatedMinutes: 5,
		status: "locked",
	},
	// ── Intermediate ──────────────────────────────────────────────────────────────
	{
		id: "ql-bubble-sort",
		title: "Bubble Sort: Theory → Implementation",
		description:
			"Stability, O(n²) worst case, the early-exit optimization, and the bidirectional Cocktail variant.",
		primaryDifficulty: "intermediate",
		questionCount: 7,
		maxPoints: 14,
		estimatedMinutes: 6,
		status: "available",
		quiz: BUBBLE_SORT_QUIZ,
	},
	{
		id: "ql-merge-sort",
		title: "Merge Sort Deep Dive",
		description:
			"Divide-and-conquer sorting with guaranteed O(n log n) — merge step, auxiliary space, and stable ordering.",
		primaryDifficulty: "intermediate",
		questionCount: 8,
		maxPoints: 16,
		estimatedMinutes: 7,
		status: "available",
	},
	{
		id: "ql-two-pointer",
		title: "Two-Pointer Technique",
		description:
			"Reduce O(n²) brute force to O(n) by maintaining two indices — patterns, templates, and tricky edge cases.",
		primaryDifficulty: "intermediate",
		questionCount: 7,
		maxPoints: 14,
		estimatedMinutes: 6,
		status: "locked",
	},
	{
		id: "ql-sliding-window",
		title: "Sliding Window Pattern",
		description:
			"Fixed and variable windows for subarray/substring problems — expand, shrink, and track invariants.",
		primaryDifficulty: "intermediate",
		questionCount: 7,
		maxPoints: 14,
		estimatedMinutes: 6,
		status: "locked",
	},
	{
		id: "ql-binary-trees",
		title: "Binary Trees: Traversal",
		description:
			"In-order, pre-order, post-order, and level-order traversal — recursive and iterative forms.",
		primaryDifficulty: "intermediate",
		questionCount: 8,
		maxPoints: 16,
		estimatedMinutes: 7,
		status: "locked",
	},
	{
		id: "ql-quick-sort",
		title: "Quick Sort Analysis",
		description:
			"Partition strategies, pivot selection, average O(n log n) vs worst O(n²), and in-place sorting.",
		primaryDifficulty: "intermediate",
		questionCount: 8,
		maxPoints: 16,
		estimatedMinutes: 7,
		status: "locked",
	},
	{
		id: "ql-sorting-comparison",
		title: "Sorting Algorithms: Comparison",
		description:
			"When to use which sort — stability, space complexity, adaptivity, and real-world performance profiles.",
		primaryDifficulty: "intermediate",
		questionCount: 9,
		maxPoints: 18,
		estimatedMinutes: 8,
		status: "locked",
	},
	{
		id: "ql-tree-bfs-dfs",
		title: "Tree BFS & DFS",
		description:
			"Level-order BFS with a queue vs depth-first DFS — complexity, space usage, and when each fits.",
		primaryDifficulty: "intermediate",
		questionCount: 7,
		maxPoints: 14,
		estimatedMinutes: 6,
		status: "locked",
	},
	{
		id: "ql-dp-intro",
		title: "Dynamic Programming: Intro",
		description:
			"Overlapping subproblems, optimal substructure, memoization vs tabulation — foundations of DP.",
		primaryDifficulty: "intermediate",
		questionCount: 8,
		maxPoints: 16,
		estimatedMinutes: 7,
		status: "locked",
	},
	// ── Expert ────────────────────────────────────────────────────────────────────
	{
		id: "ql-heap-priority",
		title: "Heap & Priority Queues",
		description:
			"Min-heap, max-heap, heapify in O(n), and why heaps power efficient scheduling and graph algorithms.",
		primaryDifficulty: "expert",
		questionCount: 9,
		maxPoints: 27,
		estimatedMinutes: 9,
		status: "locked",
	},
	{
		id: "ql-graph-bfs-dfs",
		title: "Graph Algorithms: BFS/DFS",
		description:
			"Adjacency lists, cycle detection, topological sort, and connected components via DFS and BFS.",
		primaryDifficulty: "expert",
		questionCount: 10,
		maxPoints: 30,
		estimatedMinutes: 10,
		status: "locked",
	},
	{
		id: "ql-dijkstra",
		title: "Dijkstra's Algorithm",
		description:
			"Single-source shortest paths on weighted graphs — priority queues, relaxation, and proof of correctness.",
		primaryDifficulty: "expert",
		questionCount: 9,
		maxPoints: 27,
		estimatedMinutes: 9,
		status: "locked",
	},
	{
		id: "ql-dp-optimization",
		title: "Dynamic Programming: Optimization",
		description:
			"Knapsack, LCS, edit distance — recognizing DP structure and transitioning from O(n²) space to O(n).",
		primaryDifficulty: "expert",
		questionCount: 10,
		maxPoints: 30,
		estimatedMinutes: 10,
		status: "locked",
	},
	{
		id: "ql-balanced-bst",
		title: "Balanced BST: AVL & Red-Black",
		description:
			"Rotations, balance factors, and why self-balancing trees guarantee O(log n) on all operations.",
		primaryDifficulty: "expert",
		questionCount: 9,
		maxPoints: 27,
		estimatedMinutes: 9,
		status: "locked",
	},
	{
		id: "ql-amortized",
		title: "Amortized Analysis",
		description:
			"Aggregate, accounting, and potential methods — proving that occasional expensive operations are cheap on average.",
		primaryDifficulty: "expert",
		questionCount: 8,
		maxPoints: 24,
		estimatedMinutes: 9,
		status: "locked",
	},
	{
		id: "ql-network-flow",
		title: "Network Flow: Max-Flow",
		description:
			"Ford-Fulkerson, augmenting paths, residual graphs, and the max-flow min-cut theorem.",
		primaryDifficulty: "expert",
		questionCount: 9,
		maxPoints: 27,
		estimatedMinutes: 10,
		status: "locked",
	},
];
