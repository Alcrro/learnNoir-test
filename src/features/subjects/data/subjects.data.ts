// data/subjects.data.js
// Sursa de date centralizată pentru LearnNoir — domeniul Informatică
// Adaugă subiecte noi aici fără să atingi componentele

type CATEGORY_METAProps = {
	label: string;
	description: string;
	color: string;
	icon: string;
};

export const CATEGORY_META: Record<string, CATEGORY_METAProps> = {
	fundamentals: {
		label: "Fundamentals",
		color: "indigo",
		icon: "layers",
		description: "Bazele programării și gândirii computaționale",
	},
	algorithms: {
		label: "Algorithms",
		color: "blue",
		icon: "cpu",
		description: "Algoritmi, complexitate și tehnici de rezolvare",
	},
	datastructures: {
		label: "Data Structures",
		color: "violet",
		icon: "tree",
		description: "Structuri de date liniare, arborescente și grafuri",
	},
	systems: {
		label: "Systems",
		color: "slate",
		icon: "server",
		description: "Sisteme de operare, rețele și arhitectură",
	},
	web: {
		label: "Web Development",
		color: "cyan",
		icon: "globe",
		description: "Frontend, backend și full-stack development",
	},
	databases: {
		label: "Databases",
		color: "emerald",
		icon: "database",
		description: "Baze de date relaționale, NoSQL și proiectare",
	},
	theory: {
		label: "CS Theory",
		color: "amber",
		icon: "function",
		description: "Matematică discretă, logică și teoria calculabilității",
	},
};

export type Subject = {
	id: string;
	category: string;
	title: string;
	description: string;
	totalLessons: number;
	completedLessons: number;
	estimatedHours: number;
	difficulty: "beginner" | "intermediate" | "advanced";
	tags: string[];
	tagLinks?: Record<string, string>;
	featured: boolean;
};
export const SUBJECTS = [
	// ── FUNDAMENTALS ──────────────────────────────────────────────────────────
	{
		id: "programming-basics",
		category: "fundamentals",
		title: "Programming Basics",
		description:
			"Variabile, tipuri de date, structuri de control și funcții. Primul pas în programare.",
		totalLessons: 36,
		completedLessons: 0,
		estimatedHours: 18,
		difficulty: "beginner",
		tags: ["Python", "JavaScript", "Java", "C++"],
		tagLinks: {
			Python: "/subjects/computer-science/fundamentals/programming-basics?lang=python",
			JavaScript: "/subjects/computer-science/fundamentals/programming-basics?lang=javascript",
			Java: "/subjects/computer-science/fundamentals/programming-basics?lang=java",
			"C++": "/subjects/computer-science/fundamentals/programming-basics?lang=cpp",
		},
		featured: false,
	},
	{
		id: "oop",
		category: "fundamentals",
		title: "Object-Oriented Programming",
		description: "Clase, obiecte, moștenire, polimorfism și principiile SOLID.",
		totalLessons: 42,
		completedLessons: 0,
		estimatedHours: 22,
		difficulty: "intermediate",
		tags: ["Classes", "Inheritance", "SOLID", "Design Patterns"],
		featured: true,
	},
	{
		id: "functional",
		category: "fundamentals",
		title: "Functional Programming",
		description:
			"Funcții pure, imutabilitate, higher-order functions și compoziție.",
		totalLessons: 28,
		completedLessons: 0,
		estimatedHours: 16,
		difficulty: "intermediate",
		tags: ["Pure Functions", "Map/Filter", "Closures"],
		featured: false,
	},
	{
		id: "git",
		category: "fundamentals",
		title: "Git & Version Control",
		description: "Versionare, branching, merge, rebase și colaborare în echipă.",
		totalLessons: 20,
		completedLessons: 0,
		estimatedHours: 8,
		difficulty: "beginner",
		tags: ["Git", "GitHub", "Branching", "CI/CD"],
		featured: false,
	},

	// ── ALGORITHMS ────────────────────────────────────────────────────────────
	{
		id: "sorting-algorithms",
		category: "algorithms",
		title: "Sorting Algorithms",
		description:
			"Bubble, Selection, Insertion, Merge, Quick, Heap Sort — comparații și complexitate.",
		totalLessons: 32,
		completedLessons: 0,
		estimatedHours: 18,
		difficulty: "intermediate",
		tags: ["Sorting", "Complexity", "Divide & Conquer"],
		featured: true,
	},
	{
		id: "searching-algorithms",
		category: "algorithms",
		title: "Searching Algorithms",
		description:
			"Linear, Binary, Jump, Interpolation Search și aplicații practice.",
		totalLessons: 18,
		completedLessons: 0,
		estimatedHours: 10,
		difficulty: "beginner",
		tags: ["Binary Search", "BFS", "DFS"],
		featured: false,
	},
	{
		id: "dynamic-programming",
		category: "algorithms",
		title: "Dynamic Programming",
		description: "Memoizare, tabulare, subprobleme și probleme clasice DP.",
		totalLessons: 40,
		completedLessons: 0,
		estimatedHours: 28,
		difficulty: "advanced",
		tags: ["Memoization", "Knapsack", "LCS", "DP"],
		featured: true,
	},
	{
		id: "greedy",
		category: "algorithms",
		title: "Greedy Algorithms",
		description:
			"Strategii greedy, demonstrarea corectitudinii și probleme clasice.",
		totalLessons: 22,
		completedLessons: 0,
		estimatedHours: 14,
		difficulty: "intermediate",
		tags: ["Greedy", "Huffman", "Interval Scheduling"],
		featured: false,
	},
	{
		id: "graph-algorithms",
		category: "algorithms",
		title: "Graph Algorithms",
		description: "BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, MST.",
		totalLessons: 38,
		completedLessons: 0,
		estimatedHours: 24,
		difficulty: "advanced",
		tags: ["Dijkstra", "BFS/DFS", "MST", "Shortest Path"],
		featured: false,
	},

	// ── DATA STRUCTURES ───────────────────────────────────────────────────────
	{
		id: "arrays-strings",
		category: "datastructures",
		title: "Arrays & Strings",
		description:
			"Operații pe arrays, two pointers, sliding window și manipulare de șiruri.",
		totalLessons: 26,
		completedLessons: 0,
		estimatedHours: 12,
		difficulty: "beginner",
		tags: ["Arrays", "Two Pointers", "Sliding Window"],
		featured: false,
	},
	{
		id: "linked-lists",
		category: "datastructures",
		title: "Linked Lists",
		description:
			"Liste simplu și dublu înlănțuite, operații, reversare și detectare cicluri.",
		totalLessons: 22,
		completedLessons: 0,
		estimatedHours: 12,
		difficulty: "intermediate",
		tags: ["Singly", "Doubly", "Cycle Detection"],
		featured: false,
	},
	{
		id: "stacks-queues",
		category: "datastructures",
		title: "Stacks & Queues",
		description: "LIFO, FIFO, deque, priority queue și aplicații cu stivă.",
		totalLessons: 20,
		completedLessons: 0,
		estimatedHours: 10,
		difficulty: "intermediate",
		tags: ["Stack", "Queue", "Deque", "Priority Queue"],
		featured: false,
	},
	{
		id: "trees",
		category: "datastructures",
		title: "Trees",
		description: "Binary trees, BST, AVL, Red-Black, traversări și operații.",
		totalLessons: 34,
		completedLessons: 0,
		estimatedHours: 20,
		difficulty: "intermediate",
		tags: ["BST", "AVL", "Traversal", "Heap"],
		featured: true,
	},
	{
		id: "hash-tables",
		category: "datastructures",
		title: "Hash Tables",
		description:
			"Funcții de hash, coliziuni, chaining, open addressing și aplicații.",
		totalLessons: 18,
		completedLessons: 0,
		estimatedHours: 10,
		difficulty: "intermediate",
		tags: ["Hashing", "Collision", "HashMap"],
		featured: false,
	},
	{
		id: "graphs",
		category: "datastructures",
		title: "Graphs",
		description:
			"Reprezentare, traversare, componente conexe și grafuri ponderate.",
		totalLessons: 30,
		completedLessons: 0,
		estimatedHours: 18,
		difficulty: "advanced",
		tags: ["Adjacency", "Directed", "Weighted", "DAG"],
		featured: false,
	},

	// ── SYSTEMS ───────────────────────────────────────────────────────────────
	{
		id: "os",
		category: "systems",
		title: "Operating Systems",
		description:
			"Procese, fire de execuție, sincronizare, memorie și sisteme de fișiere.",
		totalLessons: 40,
		completedLessons: 0,
		estimatedHours: 24,
		difficulty: "advanced",
		tags: ["Linux", "Processes", "Memory", "Scheduling"],
		featured: false,
	},
	{
		id: "networking",
		category: "systems",
		title: "Computer Networks",
		description:
			"Modelul OSI, TCP/IP, HTTP, DNS, routing și securitate de rețea.",
		totalLessons: 34,
		completedLessons: 0,
		estimatedHours: 20,
		difficulty: "intermediate",
		tags: ["TCP/IP", "HTTP", "DNS", "Sockets"],
		featured: false,
	},
	{
		id: "computer-architecture",
		category: "systems",
		title: "Computer Architecture",
		description: "CPU, memorie, pipeline, cache și arhitecturi moderne.",
		totalLessons: 28,
		completedLessons: 0,
		estimatedHours: 16,
		difficulty: "advanced",
		tags: ["CPU", "Cache", "Pipeline", "Assembly"],
		featured: false,
	},

	// ── WEB DEVELOPMENT ───────────────────────────────────────────────────────
	{
		id: "html-css",
		category: "web",
		title: "HTML & CSS",
		description:
			"Semantică HTML, Flexbox, Grid, animații CSS și responsive design.",
		totalLessons: 44,
		completedLessons: 0,
		estimatedHours: 20,
		difficulty: "beginner",
		tags: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive"],
		featured: false,
	},
	{
		id: "javascript",
		category: "web",
		title: "JavaScript",
		description: "ES6+, DOM, async/await, Promises, closures și event loop.",
		totalLessons: 56,
		completedLessons: 0,
		estimatedHours: 30,
		difficulty: "intermediate",
		tags: ["ES6+", "Async", "DOM", "Closures"],
		featured: true,
	},
	{
		id: "react",
		category: "web",
		title: "React",
		description: "Componente, hooks, state management, context și performanță.",
		totalLessons: 48,
		completedLessons: 0,
		estimatedHours: 26,
		difficulty: "intermediate",
		tags: ["Hooks", "Context", "Redux", "Performance"],
		featured: true,
	},
	{
		id: "nodejs",
		category: "web",
		title: "Node.js & Express",
		description:
			"Server-side JavaScript, REST APIs, middleware și autentificare.",
		totalLessons: 36,
		completedLessons: 0,
		estimatedHours: 20,
		difficulty: "intermediate",
		tags: ["Node.js", "Express", "REST", "JWT"],
		featured: false,
	},

	// ── DATABASES ─────────────────────────────────────────────────────────────
	{
		id: "sql",
		category: "databases",
		title: "SQL & Relational DBs",
		description: "SELECT, JOIN, indexare, tranzacții, normalizare și PostgreSQL.",
		totalLessons: 38,
		completedLessons: 0,
		estimatedHours: 20,
		difficulty: "intermediate",
		tags: ["SQL", "PostgreSQL", "Joins", "Indexing"],
		featured: true,
	},
	{
		id: "nosql",
		category: "databases",
		title: "NoSQL Databases",
		description: "MongoDB, Redis, modelare de date și scenarii de utilizare.",
		totalLessons: 24,
		completedLessons: 0,
		estimatedHours: 14,
		difficulty: "intermediate",
		tags: ["MongoDB", "Redis", "Document", "Key-Value"],
		featured: false,
	},
	{
		id: "db-design",
		category: "databases",
		title: "Database Design",
		description:
			"Modele ER, normalizare, denormalizare și proiectare pentru scale.",
		totalLessons: 20,
		completedLessons: 0,
		estimatedHours: 12,
		difficulty: "advanced",
		tags: ["ER Diagrams", "Normalization", "Sharding"],
		featured: false,
	},

	// ── CS THEORY ─────────────────────────────────────────────────────────────
	{
		id: "discrete-math",
		category: "theory",
		title: "Discrete Mathematics",
		description: "Logică, mulțimi, relații, combinatorică și teoria grafurilor.",
		totalLessons: 44,
		completedLessons: 0,
		estimatedHours: 26,
		difficulty: "intermediate",
		tags: ["Logic", "Sets", "Combinatorics", "Graphs"],
		featured: false,
	},
	{
		id: "complexity-theory",
		category: "theory",
		title: "Complexity Theory",
		description: "Notația Big O, clase de complexitate P vs NP și reduceri.",
		totalLessons: 26,
		completedLessons: 0,
		estimatedHours: 16,
		difficulty: "advanced",
		tags: ["Big O", "P vs NP", "NP-Hard", "Reductions"],
		featured: false,
	},

	// ── LOGIC & CRITICAL THINKING ─────────────────────────────────────────────
	{
		id: "arguments-and-structure",
		category: "foundations",
		title: "Arguments & Structure",
		description: "Premises, conclusions, deductive vs inductive reasoning, and the 7 most common logical fallacies.",
		totalLessons: 0,
		completedLessons: 0,
		estimatedHours: 0,
		difficulty: "beginner",
		tags: ["Arguments", "Fallacies", "Deductive", "Inductive"],
		featured: false,
	},
	{
		id: "deductive-reasoning",
		category: "foundations",
		title: "Deductive Reasoning",
		description: "Logic grids, syllogisms, and constraint puzzles solved purely through systematic deduction.",
		totalLessons: 0,
		completedLessons: 0,
		estimatedHours: 0,
		difficulty: "intermediate",
		tags: ["Logic Grids", "Syllogisms", "Deduction", "Puzzles"],
		featured: false,
	},
	{
		id: "lsat-logical-reasoning",
		category: "lsat-prep",
		title: "Logical Reasoning",
		description: "LSAT LR question types: assumption, strengthen/weaken, flaw, inference, and parallel reasoning.",
		totalLessons: 0,
		completedLessons: 0,
		estimatedHours: 0,
		difficulty: "advanced",
		tags: ["LSAT", "Assumption", "Inference", "Flaw"],
		featured: true,
	},
	{
		id: "gmat-critical-reasoning",
		category: "gmat-prep",
		title: "Critical Reasoning",
		description: "GMAT CR question types: boldface, evaluate the argument, and complete the argument.",
		totalLessons: 0,
		completedLessons: 0,
		estimatedHours: 0,
		difficulty: "advanced",
		tags: ["GMAT", "Boldface", "Evaluate", "CR"],
		featured: false,
	},
	{
		id: "logic-argument-analysis",
		category: "advanced-analysis",
		title: "Argument Analysis",
		description: "Advanced argumentation: hidden assumptions, evidence evaluation, counterarguments, and multi-layer structures.",
		totalLessons: 0,
		completedLessons: 0,
		estimatedHours: 0,
		difficulty: "advanced",
		tags: ["Assumptions", "Evidence", "Counterarguments", "Analysis"],
		featured: false,
	},
] as Subject[];
