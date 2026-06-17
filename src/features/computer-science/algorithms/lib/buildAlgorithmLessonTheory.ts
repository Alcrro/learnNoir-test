import type { ProgrammingCatalogItem } from "../../catalog/types/catalog.types";
import type { LessonComplexityCard } from "../components/lesson/AlgorithmDocsIntroduction";
import type { FillBlanksBlock } from "@shared/lesson-content";

export type LessonTheoryCard = {
	title: string;
	body: string;
};

export type LessonTheoryStep = {
	title: string;
	description: string;
	codeHint?: string;
};

export type LessonTheoryComplexityCase = {
	label: string;
	value: string;
	why: string;
	tone: "red" | "amber" | "green";
};

export type LessonTheoryRelated = {
	name: string;
	why: string;
	path?: string;
};

export type LessonTheoryPrereq = {
	name: string;
	status: "done" | "recommended";
};

export type LessonTheorySidebarCard = {
	title: string;
	items: string[];
	accent?: "info" | "warn";
};

// ── V2 learning layout types ──────────────────────────────────────────────────

export type LessonConcreteStep = {
	array: number[];
	highlight: [number, number] | null;
	swapped: boolean;
	description: string;
	label: string;
};

export type LessonRecallQuestion = {
	id: string;
	question: string;
	options: string[];
	correctIndex: number;
	explanation: string;
};

export type LessonTransferScenario = {
	id: string;
	scenario: string;
	answer: "yes" | "no";
	explanation: string;
};

export type LessonComplexityDerivationStep = {
	label: string;
	content: string;
	formula: string;
};

export type LessonTheoryModel = {
	title: string;
	subtitle?: string;
	tags: string[];
	readTimeLabel: string;
	progressLabel: string;
	progressPercent: number;
	progressDots: Array<"done" | "current" | "todo">;
	definition: string;
	intuition: string;
	keyIdea: string;
	whenToUse: string[];
	complexities: LessonComplexityCard[];
	complexityCases: LessonTheoryComplexityCase[];
	complexityExplainer: string;
	steps: LessonTheoryStep[];
	whenGood: string[];
	whenAvoid: string[];
	misconceptions: Array<{ title: string; body: string }>;
	prerequisites: LessonTheoryPrereq[];
	prereqNote?: string;
	relatedLessons: LessonTheoryRelated[];
	nextLesson?: { name: string; path?: string };
	mainCards: LessonTheoryCard[];
	sidebarCards: LessonTheorySidebarCard[];
	// V2 fields — populated by AI + confirmed by teacher
	predictPrompt?: string;
	inlineExample?: { title?: string; steps: LessonConcreteStep[] };
	elaboration?: { question: string; answer: string };
	complexityDerivation?: {
		estimateQuestion: string;
		estimateOptions: string[];
		derivationSteps: LessonComplexityDerivationStep[];
	};
	transferScenarios?: LessonTransferScenario[];
	recallAfterSteps?: LessonRecallQuestion[];
	recallAfterComplexity?: LessonRecallQuestion[];
	recallFinal?: LessonRecallQuestion[];
	fillBlanks?: FillBlanksBlock & { [key: string]: unknown };
};

function titleCase(value: string) {
	return value
		.split(/[\s-]+/g)
		.filter(Boolean)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}

function difficultyLabel(difficulty?: ProgrammingCatalogItem["difficulty"]) {
	switch (difficulty) {
		case "easy":
			return "Easy";
		case "medium":
			return "Medium";
		case "hard":
			return "Hard";
		default:
			return "—";
	}
}

function extractComplexities(lesson: ProgrammingCatalogItem) {
	// `chips` may contain: "O(n²)", "O(1) spatiu", "Stabil" / "Instabil"
	let time: string | undefined;
	let space: string | undefined;

	for (const chip of lesson.chips) {
		const label = chip.label.trim();
		if (!time && /^O\(.+\)$/i.test(label)) time = label;
		if (!space && /spatiu/i.test(label)) {
			space = label.replace(/\s*spatiu\s*/i, "").trim() || label;
		}
	}

	return { time: time ?? "—", space: space ?? "—" };
}

function buildComplexityCards(args: {
	lesson: ProgrammingCatalogItem;
	algorithmId: string;
}): LessonComplexityCard[] {
	const { lesson, algorithmId } = args;

	// Special-case a few popular ones to match the “worst / avg / best” feel from your screenshot.
	if (algorithmId === "bubble-sort") {
		return [
			{ label: "worst", value: "O(n²)", desc: "reverse sorted input" },
			{ label: "average", value: "O(n²)", desc: "random input" },
			{ label: "best", value: "O(n)", desc: "already sorted (with early stop)" },
		];
	}

	if (algorithmId === "binary-search") {
		return [
			{ label: "time", value: "O(log n)", desc: "halve the range each step" },
			{ label: "space", value: "O(1)", desc: "iterative version" },
		];
	}

	const { time, space } = extractComplexities(lesson);
	return [
		{ label: "time", value: time, desc: "order of growth" },
		{ label: "space", value: space, desc: "extra memory used" },
	];
}

function buildComplexityCases(args: {
	lesson: ProgrammingCatalogItem;
	algorithmId: string;
}): {
	cases: LessonTheoryComplexityCase[];
	explainer: string;
} {
	const { lesson, algorithmId } = args;

	if (algorithmId === "bubble-sort") {
		return {
			cases: [
				{
					label: "Worst case",
					value: "O(n²)",
					why: "Reverse-sorted input — every element needs many swaps",
					tone: "red",
				},
				{
					label: "Average case",
					value: "O(n²)",
					why: "Random input — still quadratic on average",
					tone: "amber",
				},
				{
					label: "Best case",
					value: "O(n)",
					why: "Already sorted + early-stop flag",
					tone: "green",
				},
			],
			explainer:
				"You can view it as two nested loops: the outer loop runs ~n passes, and the inner loop compares up to n−i−1 neighbors. Total comparisons are 1 + 2 + … + (n−1) = n(n−1)/2 → O(n²). Space is O(1) because it sorts in place.",
		};
	}

	const { time, space } = extractComplexities(lesson);
	return {
		cases: [
			{
				label: "Time",
				value: time ?? "—",
				why: "How runtime grows with input size",
				tone: "amber",
			},
			{
				label: "Space",
				value: space ?? "—",
				why: "Extra memory beyond the input",
				tone: "green",
			},
			{
				label: "Tip",
				value: "Watch the loops",
				why: "Counting loops is a fast way to estimate complexity",
				tone: "red",
			},
		],
		explainer:
			"As a quick heuristic: nested loops often lead to O(n²), halving a range suggests O(log n), and combining two sorted halves is O(n). Always verify with a tighter bound if needed.",
	};
}

function buildMnemonic(args: { lessonName: string; id: string }) {
	const { lessonName: name, id } = args;

	if (id.includes("bubble")) {
		return `Think “bubbles”: on each pass, the largest element drifts to the right.`;
	}
	if (id.includes("merge")) {
		return `“Split, sort, merge”: you merge two sorted halves into one sorted list.`;
	}
	if (id.includes("quick")) {
		return `Pick a pivot, partition left/right, repeat on subarrays.`;
	}
	if (id.includes("binary-search")) {
		return `Like a dictionary: open in the middle, keep the correct half.`;
	}
	if (id.includes("breadth-first")) {
		return `BFS = “by levels”: neighbors first, then neighbors of neighbors.`;
	}
	if (id.includes("dijkstra")) {
		return `Always expand the currently cheapest known path first.`;
	}
	if (id.includes("knapsack")) {
		return `Knapsack = “take / skip” each item while keeping the best value so far.`;
	}

	return `Boil it down to one sentence and repeat it before you code ${name}.`;
}

function buildPrereqs(args: {
	algorithmPrereqs?: string[];
	category: ProgrammingCatalogItem["category"];
}) {
	const { algorithmPrereqs, category } = args;
	const prereqs = algorithmPrereqs ?? [];
	if (prereqs.length > 0) {
		return prereqs.map((p) => titleCase(p.replace(/[-_]/g, " ")));
	}

	// Generic defaults when we don't have structured prereqs in data.
	if (category === "algorithms") {
		return ["Arrays / lists", "`for` / `while` loops", "Comparisons & swapping"];
	}

	return ["Big-O basics", "Pointers / references", "Basic recursion (optional)"];
}

function buildSteps(args: { id: string }): LessonTheoryStep[] {
	const { id } = args;

	if (id === "bubble-sort") {
		return [
			{
				title: "Start from the left",
				description: "Compare neighbors one pair at a time as you sweep to the right.",
				codeHint: "i and i+1",
			},
			{
				title: "Swap when needed",
				description: "If the left item is bigger than the right one, swap them. Otherwise, move on.",
				codeHint: "arr[i] > arr[i+1]",
			},
			{
				title: "One element settles per pass",
				description:
					"After each full pass, the largest remaining element ends up at the far right.",
			},
			{
				title: "Optimization: stop early",
				description:
					"If a full pass makes no swaps, the array is already sorted. This makes best case O(n).",
				codeHint: "swapped flag",
			},
		];
	}

	if (id.includes("binary-search")) {
		return [
			{
				title: "Keep a valid range",
				description: "Maintain left and right bounds that can still contain the answer.",
				codeHint: "[l, r]",
			},
			{
				title: "Check the middle",
				description: "Compare the middle element with the target and decide which half to keep.",
				codeHint: "mid = (l+r)/2",
			},
			{
				title: "Shrink the range",
				description: "Discard the impossible half and repeat until found or empty.",
			},
		];
	}

	return [
		{
			title: "Define the invariant",
			description:
				"Decide what must always be true after each step (e.g., 'left side is sorted').",
		},
		{
			title: "Apply the core operation",
			description: "Repeat the key operation that pushes the state closer to the goal.",
		},
		{
			title: "Stop at the right condition",
			description: "Terminate when the invariant implies the result is complete.",
		},
	];
}

function buildMisconceptions(args: { id: string }): Array<{ title: string; body: string }> {
	const { id } = args;
	if (id === "bubble-sort") {
		return [
			{
				title: "Mistake #1",
				body:
					`“Bubble Sort is always O(n) in the best case.” False. It becomes O(n) only if you add an early-stop flag (like \`swapped\`). Without it, you still do ~n² comparisons even on sorted input.`,
			},
			{
				title: "Mistake #2",
				body:
					`“The inner loop can run to n each time.” False. It should typically stop at \`n - i - 1\`, because the last i elements are already in place after i passes.`,
			},
		];
	}
	return [
		{
			title: "Common pitfall",
			body:
				"Implementing the algorithm without an invariant usually leads to off-by-one errors and incorrect termination. Write down what must stay true after each step.",
		},
	];
}

function buildV2Fields(id: string): Partial<LessonTheoryModel> {
	if (id === "bubble-sort") {
		return {
			predictPrompt: "Dacă ar trebui să sortezi [5, 3, 8, 1] pas cu pas, ce acțiune ai repeta?",
			inlineExample: {
				title: "Uite ce se întâmplă cu [5, 3, 8, 1]",
				steps: [
					{
						array: [5, 3, 8, 1],
						highlight: null,
						swapped: false,
						label: "Array inițial",
						description: "Pornim cu array-ul [5, 3, 8, 1]. Vom compara vecinii de la stânga la dreapta.",
					},
					{
						array: [5, 3, 8, 1],
						highlight: [0, 1],
						swapped: false,
						label: "Pas 1 — compară 5 și 3",
						description: "Comparăm primii doi vecini: 5 și 3. Deoarece 5 > 3, facem swap.",
					},
					{
						array: [3, 5, 8, 1],
						highlight: [0, 1],
						swapped: true,
						label: "Swap! → [3, 5, 8, 1]",
						description: "Swap efectuat. 3 a ajuns la poziția corectă față de 5.",
					},
					{
						array: [3, 5, 8, 1],
						highlight: [1, 2],
						swapped: false,
						label: "Pas 2 — compară 5 și 8",
						description: "Comparăm 5 și 8. Deoarece 5 < 8, nu facem swap. Continuăm.",
					},
					{
						array: [3, 5, 8, 1],
						highlight: [2, 3],
						swapped: false,
						label: "Pas 3 — compară 8 și 1",
						description: "Comparăm 8 și 1. Deoarece 8 > 1, facem swap.",
					},
					{
						array: [3, 5, 1, 8],
						highlight: [2, 3],
						swapped: true,
						label: "Swap! → [3, 5, 1, 8]",
						description: "8 a ajuns la capătul drept — cel mai mare element e acum la locul lui. Prima trecere completă.",
					},
					{
						array: [3, 5, 1, 8],
						highlight: null,
						swapped: false,
						label: "Trecerea 1 completă",
						description: "Primul pas complet: 8 e la locul lui. Urmează trecerea 2 pe restul array-ului [3, 5, 1].",
					},
				],
			},
			elaboration: {
				question: "De ce funcționează asta? De ce comparând vecinii ajungem la un array sortat?",
				answer: "Fiecare trecere completă garantează că cel mai mare element nesortant ajunge la locul lui (la capătul drept). După n−1 treceri, toate elementele sunt la locul lor. E o invariantă de buclă: după pasul k, ultimele k elemente sunt sortate definitiv.",
			},
			complexityDerivation: {
				estimateQuestion: "Înainte să îți spun — estimează: pentru un array de n = 100 elemente în worst case, câte comparații face algoritmul?",
				estimateOptions: ["~100 (n)", "~1.000 (n²)", "~10.000 (n²)", "~1.000.000 (n³)"],
				derivationSteps: [
					{
						label: "Pasul 1 — Outer loop",
						content: "Outer loop-ul rulează de n ori — câte o trecere completă prin array pentru fiecare element.",
						formula: "n treceri",
					},
					{
						label: "Pasul 2 — Inner loop",
						content: "La trecerea i, inner loop-ul compară n − i − 1 perechi de vecini. Elementele deja sortate (din dreapta) sunt sărite.",
						formula: "n − i − 1 comparații / trecere",
					},
					{
						label: "Pasul 3 — Total comparații",
						content: "Suma tuturor comparațiilor: (n−1) + (n−2) + … + 1 = n(n−1)/2. Aceasta crește pătratic cu n.",
						formula: "n(n−1)/2 ≈ n²/2",
					},
					{
						label: "Concluzie",
						content: "Ignorăm constantele și termenii mai mici — complexitatea timp în worst case este O(n²).",
						formula: "→ O(n²)",
					},
				],
			},
			transferScenarios: [
				{
					id: "s1",
					scenario: "Ai un array de 12 elemente aproape sortate (2-3 elemente deplasate). Alegi bubble sort?",
					answer: "yes",
					explanation: "Da — pentru arrays mici și aproape sortate, bubble sort cu early-stop e O(n) în best case. E o alegere bună.",
				},
				{
					id: "s2",
					scenario: "Sortezi 50.000 de tranzacții bancare zilnice. Alegi bubble sort?",
					answer: "no",
					explanation: "Nu — pentru date mari, O(n²) e prea lent. Merge sort sau quick sort (O(n log n)) sunt mult mai potrivite.",
				},
				{
					id: "s3",
					scenario: "Ești la un interviu și trebuie să implementezi un algoritm de sortare simplu pe tablă. Alegi bubble sort?",
					answer: "yes",
					explanation: "Da — bubble sort e ușor de implementat și de explicat. Pentru demonstrații și învățare e perfect, chiar dacă nu e cel mai eficient.",
				},
			],
			recallAfterSteps: [
				{
					id: "r1",
					question: "Câte treceri complete (pase) face bubble sort pentru un array de n=5 elemente în worst case?",
					options: ["2 pase", "4 pase", "5 pase", "10 pase"],
					correctIndex: 1,
					explanation: "Exact n−1 = 4 pase. La fiecare pas, cel mai mare element nesortant ajunge la locul lui.",
				},
			],
			recallAfterComplexity: [
				{
					id: "r2",
					question: "Care este complexitatea spațiu a bubble sort?",
					options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
					correctIndex: 3,
					explanation: "O(1) — in-place. Nu alocă memorie suplimentară proporțională cu n. Swap-ul se face pe loc.",
				},
			],
			recallFinal: [
				{
					id: "r3",
					question: "Care este output-ul după primul pas complet al lui bubble sort pe [3, 1, 2]?",
					options: ["[1, 2, 3]", "[1, 3, 2]", "[3, 1, 2]", "[3, 2, 1]"],
					correctIndex: 0,
					explanation: "Primul pas: compară 3>1 → swap [1,3,2], compară 3>2 → swap [1,2,3]. Output: [1, 2, 3].",
				},
			],
			fillBlanks: {
				type: "fill-blanks",
				title: "Completează pseudo codul",
				language: "pseudo",
				content: [
					"procedure BUBBLE-SORT(A, n):",
					"  for i ← 0 to n − 1:",
					"    swapped ← {{0}}",
					"    for j ← 0 to {{1}}:",
					"      if A[j] > A[j + 1]:",
					"        swap A[j] ↔ A[j + 1]",
					"        swapped ← {{2}}",
					"    if swapped = {{3}}:",
					"      break",
					"  return A",
				].join("\n"),
				blanks: [
					{ id: 0, options: ["false", "true", "0", "null"], correct: "false" },
					{ id: 1, options: ["n-i-2", "n-1", "n-i-1", "i"], correct: "n-i-2" },
					{ id: 2, options: ["true", "false", "1", "done"], correct: "true" },
					{ id: 3, options: ["false", "true", "nil", "0"], correct: "false" },
				],
			},
		};
	}
	return {};
}

export function buildAlgorithmLessonTheoryModel(args: {
	lesson: ProgrammingCatalogItem;
	algorithmDetail?: {
		id: string;
		group?: string;
		prerequisites?: string[];
		estimatedTime?: number;
	};
	relatedLessons?: ProgrammingCatalogItem[];
	allLessonsInGroup?: ProgrammingCatalogItem[];
}): LessonTheoryModel {
	const { lesson, algorithmDetail, relatedLessons, allLessonsInGroup } = args;
	const id = algorithmDetail?.id ?? lesson.id;

	const tags = [
		titleCase(algorithmDetail?.group ?? lesson.groupLabel ?? lesson.group),
		difficultyLabel(lesson.difficulty),
		typeof (algorithmDetail?.estimatedTime ?? lesson.estimatedTime) === "number"
			? `~${algorithmDetail?.estimatedTime ?? lesson.estimatedTime}m`
			: undefined,
	].filter(Boolean) as string[];

	const definition = lesson.description || `${lesson.name} is a lesson in this module.`;

	const intuition = (() => {
		const group = algorithmDetail?.group ?? lesson.group;
		switch (group) {
			case "sort":
				return `Sorting works by applying local rules that gradually push elements toward their correct positions.`;
			case "search":
				return `Instead of scanning everything, you reduce the search space until the answer becomes obvious.`;
			case "graph":
				return `You treat the problem as nodes + edges, then explore or optimize paths through the network.`;
			case "dynamic-programming":
				return `You split the problem into overlapping subproblems, store results, and avoid recomputation.`;
			case "greedy":
				return `You make the best local choice at each step, backed by a proof that it leads to a global optimum.`;
			case "string":
				return `You match patterns in text efficiently, avoiding repeated comparisons.`;
			case "math":
				return `You leverage mathematical structure to cut the work dramatically.`;
			default:
				return `The core idea is to apply a simple rule repeatedly until the desired result emerges.`;
		}
	})();

	const keyIdea = (() => {
		if (id.includes("bubble"))
			return `Swap out-of-order neighbors until the largest element ends up at the end.`;
		if (id.includes("merge")) return `Split into halves and merge them back in sorted order.`;
		if (id.includes("quick")) return `Partition around a pivot, then solve the subarrays.`;
		if (id.includes("binary-search"))
			return `Halve the search space on every comparison.`;
		if (id.includes("breadth-first"))
			return `Explore the graph level by level using a queue.`;
		if (id.includes("dijkstra"))
			return `Repeatedly choose the closest unreached node and relax its edges.`;
		if (id.includes("knapsack"))
			return `For each item: choose take/skip, tracked in a DP table.`;
		return `Apply a repeatable strategy that consistently reduces the problem.`;
	})();

	const whenToUse = (() => {
		if (id.includes("bubble")) {
			return [
				"Very small datasets",
				"Step-by-step learning / visualization",
				"When simplicity matters more than performance",
			];
		}
		if (id.includes("merge")) {
			return [
				"When you need guaranteed (O(n log n)) time",
				"When stability matters",
				"When merging sorted streams is natural",
			];
		}
		if (id.includes("quick")) {
			return [
				"Fast general-purpose sorting in practice",
				"When extra memory should stay small",
				"When you mitigate worst-case with random/median pivots",
			];
		}
		if (id.includes("binary-search")) {
			return [
				"Searching in sorted collections",
				"Finding boundaries (first true / last true)",
				"Binary search on the answer for optimization problems",
			];
		}
		if (id.includes("breadth-first")) {
			return [
				"Shortest paths in unweighted graphs",
				"Level-order exploration (distance in steps)",
				"Connectivity / components",
			];
		}
		if (id.includes("dijkstra")) {
			return [
				"Shortest paths with non-negative weights",
				"Routing, costs, networks",
				"Incremental optimization problems",
			];
		}
		if (id.includes("knapsack")) {
			return [
				"Optimization under a capacity constraint",
				"Choosing the best subset",
				"When subproblems overlap and DP fits",
			];
		}

		return [
			"When you need the standard approach for this family of problems",
			"When the complexity fits your input size",
		];
	})();

	const prereqs = buildPrereqs({
		algorithmPrereqs: algorithmDetail?.prerequisites,
		category: lesson.category,
	});

	const prerequisites: LessonTheoryPrereq[] = prereqs.map((p, idx) => ({
		name: p,
		status: idx < 3 ? "done" : "recommended",
	}));

	const prereqNote =
		prereqs.length > 3
			? "Don’t know Big-O yet? You can continue, but the complexity section will be harder to fully understand."
			: undefined;

	const groupLessons = allLessonsInGroup ?? [];
	const groupTotal = Math.max(1, groupLessons.length);
	const positionInGroup =
		groupLessons.findIndex((l) => l.id === lesson.id) >= 0
			? groupLessons.findIndex((l) => l.id === lesson.id) + 1
			: 1;

	const progressPercent = Math.max(0, Math.min(100, lesson.progress ?? 0));
	const dotsTotal = Math.min(8, Math.max(4, groupTotal));
	const currentDot = Math.max(
		1,
		Math.min(dotsTotal, Math.round((positionInGroup / groupTotal) * dotsTotal)),
	);
	const progressDots: Array<"done" | "current" | "todo"> = Array.from(
		{ length: dotsTotal },
		(_, i) => {
			const n = i + 1;
			if (n < currentDot) return "done";
			if (n === currentDot) return "current";
			return "todo";
		},
	);

	const readTimeMinutes =
		typeof (algorithmDetail?.estimatedTime ?? lesson.estimatedTime) === "number"
			? (algorithmDetail?.estimatedTime ?? lesson.estimatedTime)
			: Math.max(8, Math.round((definition.length + intuition.length) / 180));

	const { cases: complexityCases, explainer: complexityExplainer } =
		buildComplexityCases({ lesson, algorithmId: id });

	const steps = buildSteps({ id });

	const whenGood =
		id === "bubble-sort"
			? ["Small arrays (< 20 items)", "Nearly sorted input", "Learning / demos", "No extra memory"]
			: whenToUse;

	const whenAvoid =
		id === "bubble-sort"
			? [
					"Large datasets (> 1000 items)",
					"When performance matters",
					"Reverse-sorted input",
					"Real production sorting",
				]
			: ["When input is huge and performance is critical", "When a better algorithm fits your constraints"];

	const misconceptions = buildMisconceptions({ id });

	const related: LessonTheoryRelated[] =
		relatedLessons?.slice(0, 4).map((l) => ({
			name: l.name,
			path: l.path,
			why: l.difficulty ? `Good next step for ${difficultyLabel(l.difficulty)} level` : "Related concept",
		})) ?? [];

	const nextLesson = relatedLessons?.[0]
		? { name: relatedLessons[0].name, path: relatedLessons[0].path }
		: undefined;

	const sidebarCards: LessonTheorySidebarCard[] = [
		{
			title: "What you should know first",
			items: prereqs,
			accent: prereqs.length > 0 ? "info" : "warn",
		},
		{
			title: "Related lessons",
			items:
				relatedLessons && relatedLessons.length > 0
					? relatedLessons.slice(0, 6).map((l) => l.name)
					: ["Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
		},
		{
			title: "How to remember it",
			items: [buildMnemonic({ lessonName: lesson.name, id })],
			accent: "info",
		},
	];

	const mainCards: LessonTheoryCard[] = [
		{
			title: "Central idea",
			body: keyIdea,
		},
		{
			title: "Analogy (so it sticks)",
			body: (() => {
				if (id.includes("bubble")) {
					return `Imagine heavier bubbles floating up: each pass swaps out-of-order neighbors so the largest values drift to the end.`;
				}
				if (id.includes("binary-search")) {
					return `Finding a word in a dictionary: you open in the middle and keep only the half that can contain it.`;
				}
				if (id.includes("dijkstra")) {
					return `Like growing a “known shortest” region: repeatedly lock in the closest node and expand from it.`;
				}
				return `Attach it to a repeated action: “split”, “choose”, “expand”, “merge” — and watch how each step reduces the problem.`;
			})(),
		},
		{
			title: "How it works (short)",
			body: (() => {
				if (id.includes("bubble")) {
					return `Scan left to right, compare neighbors, and swap if they are out of order. After each pass, the largest element ends up at the far right. Stop early if a pass makes no swaps.`;
				}
				if (id.includes("merge")) {
					return `Split the array until size 1, then merge sorted halves back together by repeatedly taking the smallest front element.`;
				}
				if (id.includes("quick")) {
					return `Pick a pivot, partition elements smaller to the left and larger to the right, then recurse on the two partitions.`;
				}
				if (id.includes("binary-search")) {
					return `Maintain a range [l, r]. Check the middle, then keep only the half that can contain the target. Repeat until found or empty.`;
				}
				if (id.includes("breadth-first")) {
					return `Start from a node, use a queue, visit all direct neighbors first, then the next layer. Track distance/parent if you need paths.`;
				}
				if (id.includes("dijkstra")) {
					return `Initialize distances to infinity. Repeatedly pop the node with the smallest current distance from a priority queue, relax edges, and update distances.`;
				}
				if (id.includes("knapsack")) {
					return `Build a DP table: for each item and capacity, choose “take” or “skip” to maximize total value.`;
				}
				return `Follow the standard steps for the technique and verify the invariant after each iteration.`;
			})(),
		},
	];

	return {
		title: lesson.name,
		subtitle: lesson.groupLabel,
		tags,
		readTimeLabel: `~${readTimeMinutes} min`,
		progressLabel: `Lesson ${positionInGroup} of ${groupTotal}`,
		progressPercent,
		progressDots,
		definition,
		intuition,
		keyIdea,
		whenToUse,
		complexities: buildComplexityCards({ lesson, algorithmId: id }),
		complexityCases,
		complexityExplainer,
		steps,
		whenGood,
		whenAvoid,
		misconceptions,
		prerequisites,
		prereqNote,
		relatedLessons: related,
		nextLesson,
		mainCards,
		sidebarCards,
		...buildV2Fields(id),
	};
}

