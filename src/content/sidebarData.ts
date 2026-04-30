export type SidebarItem = {
	id: string;
	name: string;
	path: string; // ruta completă relativă
	group?: string;
};

export const algorithms: Record<string, SidebarItem[]> = {
	algorithms: [
		// SORTING
		{
			id: "bubble-sort",
			name: "Bubble Sort",
			path: "/subjects/computer-science/algorithms/bubble-sort",
			group: "sort",
		},
		{
			id: "selection-sort",
			name: "Selection Sort",
			path: "/subjects/computer-science/algorithms/selection-sort",
			group: "sort",
		},
		{
			id: "insertion-sort",
			name: "Insertion Sort",
			path: "/subjects/computer-science/algorithms/insertion-sort",
			group: "sort",
		},
		{
			id: "merge-sort",
			name: "Merge Sort",
			path: "/subjects/computer-science/algorithms/merge-sort",
			group: "sort",
		},
		{
			id: "quick-sort",
			name: "Quick Sort",
			path: "/subjects/computer-science/algorithms/quick-sort",
			group: "sort",
		},
		{
			id: "heap-sort",
			name: "Heap Sort",
			path: "/subjects/computer-science/algorithms/heap-sort",
			group: "sort",
		},
		{
			id: "counting-sort",
			name: "Counting Sort",
			path: "/subjects/computer-science/algorithms/counting-sort",
			group: "sort",
		},
		{
			id: "radix-sort",
			name: "Radix Sort",
			path: "/subjects/computer-science/algorithms/radix-sort",
			group: "sort",
		},
		{
			id: "bucket-sort",
			name: "Bucket Sort",
			path: "/subjects/computer-science/algorithms/bucket-sort",
			group: "sort",
		},

		// SEARCH
		{
			id: "linear-search",
			name: "Linear Search",
			path: "/subjects/computer-science/algorithms/linear-search",
			group: "search",
		},
		{
			id: "binary-search",
			name: "Binary Search",
			path: "/subjects/computer-science/algorithms/binary-search",
			group: "search",
		},
		{
			id: "jump-search",
			name: "Jump Search",
			path: "/subjects/computer-science/algorithms/jump-search",
			group: "search",
		},
		{
			id: "interpolation-search",
			name: "Interpolation Search",
			path: "/subjects/computer-science/algorithms/interpolation-search",
			group: "search",
		},
		{
			id: "exponential-search",
			name: "Exponential Search",
			path: "/subjects/computer-science/algorithms/exponential-search",
			group: "search",
		},

		// GRAPH
		{
			id: "breadth-first-search",
			name: "Breadth First Search (BFS)",
			path: "/subjects/computer-science/algorithms/breadth-first-search",
			group: "graph",
		},
		{
			id: "depth-first-search",
			name: "Depth First Search (DFS)",
			path: "/subjects/computer-science/algorithms/depth-first-search",
			group: "graph",
		},
		{
			id: "dijkstra",
			name: "Dijkstra's Algorithm",
			path: "/subjects/computer-science/algorithms/dijkstra",
			group: "graph",
		},
		{
			id: "bellman-ford",
			name: "Bellman-Ford",
			path: "/subjects/computer-science/algorithms/bellman-ford",
			group: "graph",
		},
		{
			id: "floyd-warshall",
			name: "Floyd-Warshall",
			path: "/subjects/computer-science/algorithms/floyd-warshall",
			group: "graph",
		},
		{
			id: "kruskal",
			name: "Kruskal's Algorithm",
			path: "/subjects/computer-science/algorithms/kruskal",
			group: "graph",
		},
		{
			id: "prim",
			name: "Prim's Algorithm",
			path: "/subjects/computer-science/algorithms/prim",
			group: "graph",
		},

		// STRING
		{
			id: "knuth-morris-pratt",
			name: "Knuth-Morris-Pratt (KMP)",
			path: "/subjects/computer-science/algorithms/knuth-morris-pratt",
			group: "string",
		},
		{
			id: "rabin-karp",
			name: "Rabin-Karp",
			path: "/subjects/computer-science/algorithms/rabin-karp",
			group: "string",
		},
		{
			id: "z-algorithm",
			name: "Z Algorithm",
			path: "/subjects/computer-science/algorithms/z-algorithm",
			group: "string",
		},

		// DYNAMIC computer-science
		{
			id: "fibonacci-dp",
			name: "Fibonacci (Dynamic computer-science)",
			path: "/subjects/computer-science/algorithms/fibonacci-dp",
			group: "dynamic-computer-science",
		},
		{
			id: "knapsack",
			name: "0/1 Knapsack",
			path: "/subjects/computer-science/algorithms/knapsack",
			group: "dynamic-computer-science",
		},
		{
			id: "longest-common-subsequence",
			name: "Longest Common Subsequence",
			path: "/subjects/computer-science/algorithms/longest-common-subsequence",
			group: "dynamic-computer-science",
		},
		{
			id: "longest-increasing-subsequence",
			name: "Longest Increasing Subsequence",
			path: "/subjects/computer-science/algorithms/longest-increasing-subsequence",
			group: "dynamic-computer-science",
		},

		// GREEDY
		{
			id: "activity-selection",
			name: "Activity Selection",
			path: "/subjects/computer-science/algorithms/activity-selection",
			group: "greedy",
		},
		{
			id: "huffman-coding",
			name: "Huffman Coding",
			path: "/subjects/computer-science/algorithms/huffman-coding",
			group: "greedy",
		},

		// MATH / NUMBER
		{
			id: "euclidean-gcd",
			name: "Euclidean Algorithm (GCD)",
			path: "/subjects/computer-science/algorithms/euclidean-gcd",
			group: "math",
		},
		{
			id: "sieve-of-eratosthenes",
			name: "Sieve of Eratosthenes",
			path: "/subjects/computer-science/algorithms/sieve-of-eratosthenes",
			group: "math",
		},
	],
	dataStructures: [
		{
			id: "array",
			name: "Array",
			path: "/subjects/computer-science/data-structures/array",
		},
		{
			id: "linked-list",
			name: "Linked List",
			path: "/subjects/computer-science/data-structures/linked-list",
		},
		{
			id: "doubly-linked-list",
			name: "Doubly Linked List",
			path: "/subjects/computer-science/data-structures/doubly-linked-list",
		},
		{
			id: "circular-linked-list",
			name: "Circular Linked List",
			path: "/subjects/computer-science/data-structures/circular-linked-list",
		},

		{
			id: "stack",
			name: "Stack",
			path: "/subjects/computer-science/data-structures/stack",
		},
		{
			id: "queue",
			name: "Queue",
			path: "/subjects/computer-science/data-structures/queue",
		},
		{
			id: "deque",
			name: "Deque",
			path: "/subjects/computer-science/data-structures/deque",
		},
		{
			id: "priority-queue",
			name: "Priority Queue",
			path: "/subjects/computer-science/data-structures/priority-queue",
		},

		{
			id: "hash-table",
			name: "Hash Table",
			path: "/subjects/computer-science/data-structures/hash-table",
		},
		{
			id: "hash-map",
			name: "Hash Map",
			path: "/subjects/computer-science/data-structures/hash-map",
		},
		{
			id: "hash-set",
			name: "Hash Set",
			path: "/subjects/computer-science/data-structures/hash-set",
		},

		{
			id: "binary-tree",
			name: "Binary Tree",
			path: "/subjects/computer-science/data-structures/binary-tree",
		},
		{
			id: "binary-search-tree",
			name: "Binary Search Tree",
			path: "/subjects/computer-science/data-structures/binary-search-tree",
		},
		{
			id: "avl-tree",
			name: "AVL Tree",
			path: "/subjects/computer-science/data-structures/avl-tree",
		},
		{
			id: "red-black-tree",
			name: "Red-Black Tree",
			path: "/subjects/computer-science/data-structures/red-black-tree",
		},
		{
			id: "segment-tree",
			name: "Segment Tree",
			path: "/subjects/computer-science/data-structures/segment-tree",
		},
		{
			id: "fenwick-tree",
			name: "Fenwick Tree (Binary Indexed Tree)",
			path: "/subjects/computer-science/data-structures/fenwick-tree",
		},

		{
			id: "heap",
			name: "Heap",
			path: "/subjects/computer-science/data-structures/heap",
		},
		{
			id: "min-heap",
			name: "Min Heap",
			path: "/subjects/computer-science/data-structures/min-heap",
		},
		{
			id: "max-heap",
			name: "Max Heap",
			path: "/subjects/computer-science/data-structures/max-heap",
		},

		{
			id: "trie",
			name: "Trie",
			path: "/subjects/computer-science/data-structures/trie",
		},

		{
			id: "graph",
			name: "Graph",
			path: "/subjects/computer-science/data-structures/graph",
		},
		{
			id: "disjoint-set",
			name: "Disjoint Set (Union-Find)",
			path: "/subjects/computer-science/data-structures/disjoint-set",
		},
	],
};
