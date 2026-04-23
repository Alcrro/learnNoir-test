export type Difficulty = "easy" | "medium" | "hard";

export type AlgorithmGroup =
	| "sort"
	| "search"
	| "graph"
	| "string"
	| "dynamic-programming"
	| "greedy"
	| "math";

export type Algorithm = {
	id: string;
	name: string;
	path: string;

	group: AlgorithmGroup;
	difficulty: Difficulty;

	description: string;

	timeComplexity?: string;
	spaceComplexity?: string;

	stable?: boolean;

	prerequisites?: string[];
	estimatedTime?: number;

	status?: "not-started" | "in-progress" | "completed";
};

export const algorithmGroups: Record<
	AlgorithmGroup,
	{ label: string; order: number }
> = {
	sort: { label: "Sorting", order: 1 },
	search: { label: "Searching", order: 2 },
	graph: { label: "Graph", order: 3 },
	string: { label: "String", order: 4 },
	"dynamic-programming": { label: "Dynamic Programming", order: 5 },
	greedy: { label: "Greedy", order: 6 },
	math: { label: "Math", order: 7 },
};

export const algorithms: Algorithm[] = [
	// SORTING
	{
		id: "bubble-sort",
		name: "Bubble Sort",
		path: "/subjects/programming/algorithms/bubble-sort",
		group: "sort",
		difficulty: "easy",
		description:
			"Repeatedly swaps adjacent elements if they are in the wrong order.",
		timeComplexity: "O(n^2)",
		spaceComplexity: "O(1)",
		stable: true,
		estimatedTime: 15,
	},
	{
		id: "merge-sort",
		name: "Merge Sort",
		path: "/subjects/programming/algorithms/merge-sort",
		group: "sort",
		difficulty: "medium",
		description: "Divide and conquer algorithm that splits and merges arrays.",
		timeComplexity: "O(n log n)",
		spaceComplexity: "O(n)",
		stable: true,
		estimatedTime: 25,
	},
	{
		id: "quick-sort",
		name: "Quick Sort",
		path: "/subjects/programming/algorithms/quick-sort",
		group: "sort",
		difficulty: "medium",
		description: "Divide and conquer using pivot partitioning.",
		timeComplexity: "O(n log n) avg / O(n^2) worst",
		spaceComplexity: "O(log n)",
		stable: false,
		estimatedTime: 25,
	},

	// SEARCH
	{
		id: "binary-search",
		name: "Binary Search",
		path: "/subjects/programming/algorithms/binary-search",
		group: "search",
		difficulty: "easy",
		description: "Search in sorted array by halving the search space.",
		timeComplexity: "O(log n)",
		spaceComplexity: "O(1)",
		estimatedTime: 10,
	},

	// GRAPH
	{
		id: "breadth-first-search",
		name: "Breadth First Search (BFS)",
		path: "/subjects/programming/algorithms/breadth-first-search",
		group: "graph",
		difficulty: "easy",
		description: "Traverses graph level by level.",
		timeComplexity: "O(V + E)",
		spaceComplexity: "O(V)",
		prerequisites: ["queue"],
		estimatedTime: 20,
	},
	{
		id: "dijkstra",
		name: "Dijkstra's Algorithm",
		path: "/subjects/programming/algorithms/dijkstra",
		group: "graph",
		difficulty: "medium",
		description: "Finds shortest paths using a priority queue.",
		timeComplexity: "O((V + E) log V)",
		spaceComplexity: "O(V)",
		prerequisites: ["graph", "priority-queue"],
		estimatedTime: 30,
	},

	// DP
	{
		id: "knapsack",
		name: "0/1 Knapsack",
		path: "/subjects/programming/algorithms/knapsack",
		group: "dynamic-programming",
		difficulty: "hard",
		description: "Maximizes value under weight constraint.",
		timeComplexity: "O(n * W)",
		spaceComplexity: "O(n * W)",
		prerequisites: ["recursion"],
		estimatedTime: 40,
	},
];
