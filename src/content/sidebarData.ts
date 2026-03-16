export type SidebarItem = {
	id: string;
	name: string;
	path: string; // ruta completă relativă
	group?: string;
};

export const sidebarMap: Record<string, SidebarItem[]> = {
	algorithms: [
		// SORTING
		{
			id: "bubble-sort",
			name: "Bubble Sort",
			path: "/learn/programming/algorithms/bubble-sort",
			group: "sort",
		},
		{
			id: "selection-sort",
			name: "Selection Sort",
			path: "/learn/programming/algorithms/selection-sort",
			group: "sort",
		},
		{
			id: "insertion-sort",
			name: "Insertion Sort",
			path: "/learn/programming/algorithms/insertion-sort",
			group: "sort",
		},
		{
			id: "merge-sort",
			name: "Merge Sort",
			path: "/learn/programming/algorithms/merge-sort",
			group: "sort",
		},
		{
			id: "quick-sort",
			name: "Quick Sort",
			path: "/learn/programming/algorithms/quick-sort",
			group: "sort",
		},
		{
			id: "heap-sort",
			name: "Heap Sort",
			path: "/learn/programming/algorithms/heap-sort",
			group: "sort",
		},
		{
			id: "counting-sort",
			name: "Counting Sort",
			path: "/learn/programming/algorithms/counting-sort",
			group: "sort",
		},
		{
			id: "radix-sort",
			name: "Radix Sort",
			path: "/learn/programming/algorithms/radix-sort",
			group: "sort",
		},
		{
			id: "bucket-sort",
			name: "Bucket Sort",
			path: "/learn/programming/algorithms/bucket-sort",
			group: "sort",
		},

		// SEARCH
		{
			id: "linear-search",
			name: "Linear Search",
			path: "/learn/programming/algorithms/linear-search",
			group: "search",
		},
		{
			id: "binary-search",
			name: "Binary Search",
			path: "/learn/programming/algorithms/binary-search",
			group: "search",
		},
		{
			id: "jump-search",
			name: "Jump Search",
			path: "/learn/programming/algorithms/jump-search",
			group: "search",
		},
		{
			id: "interpolation-search",
			name: "Interpolation Search",
			path: "/learn/programming/algorithms/interpolation-search",
			group: "search",
		},
		{
			id: "exponential-search",
			name: "Exponential Search",
			path: "/learn/programming/algorithms/exponential-search",
			group: "search",
		},

		// GRAPH
		{
			id: "breadth-first-search",
			name: "Breadth First Search (BFS)",
			path: "/learn/programming/algorithms/breadth-first-search",
			group: "graph",
		},
		{
			id: "depth-first-search",
			name: "Depth First Search (DFS)",
			path: "/learn/programming/algorithms/depth-first-search",
			group: "graph",
		},
		{
			id: "dijkstra",
			name: "Dijkstra's Algorithm",
			path: "/learn/programming/algorithms/dijkstra",
			group: "graph",
		},
		{
			id: "bellman-ford",
			name: "Bellman-Ford",
			path: "/learn/programming/algorithms/bellman-ford",
			group: "graph",
		},
		{
			id: "floyd-warshall",
			name: "Floyd-Warshall",
			path: "/learn/programming/algorithms/floyd-warshall",
			group: "graph",
		},
		{
			id: "kruskal",
			name: "Kruskal's Algorithm",
			path: "/learn/programming/algorithms/kruskal",
			group: "graph",
		},
		{
			id: "prim",
			name: "Prim's Algorithm",
			path: "/learn/programming/algorithms/prim",
			group: "graph",
		},

		// STRING
		{
			id: "knuth-morris-pratt",
			name: "Knuth-Morris-Pratt (KMP)",
			path: "/learn/programming/algorithms/knuth-morris-pratt",
			group: "string",
		},
		{
			id: "rabin-karp",
			name: "Rabin-Karp",
			path: "/learn/programming/algorithms/rabin-karp",
			group: "string",
		},
		{
			id: "z-algorithm",
			name: "Z Algorithm",
			path: "/learn/programming/algorithms/z-algorithm",
			group: "string",
		},

		// DYNAMIC PROGRAMMING
		{
			id: "fibonacci-dp",
			name: "Fibonacci (Dynamic Programming)",
			path: "/learn/programming/algorithms/fibonacci-dp",
			group: "dynamic-programming",
		},
		{
			id: "knapsack",
			name: "0/1 Knapsack",
			path: "/learn/programming/algorithms/knapsack",
			group: "dynamic-programming",
		},
		{
			id: "longest-common-subsequence",
			name: "Longest Common Subsequence",
			path: "/learn/programming/algorithms/longest-common-subsequence",
			group: "dynamic-programming",
		},
		{
			id: "longest-increasing-subsequence",
			name: "Longest Increasing Subsequence",
			path: "/learn/programming/algorithms/longest-increasing-subsequence",
			group: "dynamic-programming",
		},

		// GREEDY
		{
			id: "activity-selection",
			name: "Activity Selection",
			path: "/learn/programming/algorithms/activity-selection",
			group: "greedy",
		},
		{
			id: "huffman-coding",
			name: "Huffman Coding",
			path: "/learn/programming/algorithms/huffman-coding",
			group: "greedy",
		},

		// MATH / NUMBER
		{
			id: "euclidean-gcd",
			name: "Euclidean Algorithm (GCD)",
			path: "/learn/programming/algorithms/euclidean-gcd",
			group: "math",
		},
		{
			id: "sieve-of-eratosthenes",
			name: "Sieve of Eratosthenes",
			path: "/learn/programming/algorithms/sieve-of-eratosthenes",
			group: "math",
		},
	],
	dataStructures: [
		{
			id: "array",
			name: "Array",
			path: "/learn/programming/data-structures/array",
		},
		{
			id: "linked-list",
			name: "Linked List",
			path: "/learn/programming/data-structures/linked-list",
		},
		{
			id: "doubly-linked-list",
			name: "Doubly Linked List",
			path: "/learn/programming/data-structures/doubly-linked-list",
		},
		{
			id: "circular-linked-list",
			name: "Circular Linked List",
			path: "/learn/programming/data-structures/circular-linked-list",
		},

		{
			id: "stack",
			name: "Stack",
			path: "/learn/programming/data-structures/stack",
		},
		{
			id: "queue",
			name: "Queue",
			path: "/learn/programming/data-structures/queue",
		},
		{
			id: "deque",
			name: "Deque",
			path: "/learn/programming/data-structures/deque",
		},
		{
			id: "priority-queue",
			name: "Priority Queue",
			path: "/learn/programming/data-structures/priority-queue",
		},

		{
			id: "hash-table",
			name: "Hash Table",
			path: "/learn/programming/data-structures/hash-table",
		},
		{
			id: "hash-map",
			name: "Hash Map",
			path: "/learn/programming/data-structures/hash-map",
		},
		{
			id: "hash-set",
			name: "Hash Set",
			path: "/learn/programming/data-structures/hash-set",
		},

		{
			id: "binary-tree",
			name: "Binary Tree",
			path: "/learn/programming/data-structures/binary-tree",
		},
		{
			id: "binary-search-tree",
			name: "Binary Search Tree",
			path: "/learn/programming/data-structures/binary-search-tree",
		},
		{
			id: "avl-tree",
			name: "AVL Tree",
			path: "/learn/programming/data-structures/avl-tree",
		},
		{
			id: "red-black-tree",
			name: "Red-Black Tree",
			path: "/learn/programming/data-structures/red-black-tree",
		},
		{
			id: "segment-tree",
			name: "Segment Tree",
			path: "/learn/programming/data-structures/segment-tree",
		},
		{
			id: "fenwick-tree",
			name: "Fenwick Tree (Binary Indexed Tree)",
			path: "/learn/programming/data-structures/fenwick-tree",
		},

		{
			id: "heap",
			name: "Heap",
			path: "/learn/programming/data-structures/heap",
		},
		{
			id: "min-heap",
			name: "Min Heap",
			path: "/learn/programming/data-structures/min-heap",
		},
		{
			id: "max-heap",
			name: "Max Heap",
			path: "/learn/programming/data-structures/max-heap",
		},

		{
			id: "trie",
			name: "Trie",
			path: "/learn/programming/data-structures/trie",
		},

		{
			id: "graph",
			name: "Graph",
			path: "/learn/programming/data-structures/graph",
		},
		{
			id: "disjoint-set",
			name: "Disjoint Set (Union-Find)",
			path: "/learn/programming/data-structures/disjoint-set",
		},
	],
};
