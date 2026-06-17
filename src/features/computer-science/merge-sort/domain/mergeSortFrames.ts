import type { MergeSortFrame } from "../types/mergeSort.types";

const v = (value: number) => ({ id: `v${value}`, label: String(value) });

export const mergeSortFrames: MergeSortFrame[] = [
	// Frame 0 — root
	{
		rows: [
			[{ id: "root", items: [v(3), v(7), v(8), v(5), v(4), v(2), v(6), v(1)], state: "active" }],
			[],
			[],
			[],
		],
		stepLabel: "mergeSort([3,7,8,5,4,2,6,1])",
		description:
			"Start: mergeSort is called on the full array. The plan — split in half recursively until every sub-array is a single element, then merge back in sorted order.",
		phase: "divide",
	},
	// Frame 1 — level 1: split into 2 halves; root shown idle above
	{
		rows: [
			[{ id: "root", items: [v(3), v(7), v(8), v(5), v(4), v(2), v(6), v(1)], state: "idle" }],
			[
				{ id: "L", items: [v(3), v(7), v(8), v(5)], state: "active" },
				{ id: "R", items: [v(4), v(2), v(6), v(1)], state: "active" },
			],
			[],
			[],
		],
		stepLabel: "Divide → level 1",
		description:
			"Split the full array in half → Left=[3,7,8,5] and Right=[4,2,6,1]. Both halves will be sorted recursively.",
		phase: "divide",
	},
	// Frame 2 — level 2: all four pairs; upper levels idle
	{
		rows: [
			[{ id: "root", items: [v(3), v(7), v(8), v(5), v(4), v(2), v(6), v(1)], state: "idle" }],
			[
				{ id: "L", items: [v(3), v(7), v(8), v(5)], state: "idle" },
				{ id: "R", items: [v(4), v(2), v(6), v(1)], state: "idle" },
			],
			[
				{ id: "LL", items: [v(3), v(7)], state: "active" },
				{ id: "LR", items: [v(8), v(5)], state: "active" },
				{ id: "RL", items: [v(4), v(2)], state: "active" },
				{ id: "RR", items: [v(6), v(1)], state: "active" },
			],
			[],
		],
		stepLabel: "Divide → level 2",
		description:
			"Both halves split simultaneously: [3,7], [8,5], [4,2], [6,1]. This is BFS order — all nodes at the same depth divide at the same step.",
		phase: "divide",
	},
	// Frame 3 — base cases: 8 single elements; upper levels idle
	{
		rows: [
			[{ id: "root", items: [v(3), v(7), v(8), v(5), v(4), v(2), v(6), v(1)], state: "idle" }],
			[
				{ id: "L", items: [v(3), v(7), v(8), v(5)], state: "idle" },
				{ id: "R", items: [v(4), v(2), v(6), v(1)], state: "idle" },
			],
			[
				{ id: "LL", items: [v(3), v(7)], state: "idle" },
				{ id: "LR", items: [v(8), v(5)], state: "idle" },
				{ id: "RL", items: [v(4), v(2)], state: "idle" },
				{ id: "RR", items: [v(6), v(1)], state: "idle" },
			],
			[
				{ id: "LLL", items: [v(3)], state: "active" },
				{ id: "LLR", items: [v(7)], state: "active" },
				{ id: "LRL", items: [v(8)], state: "active" },
				{ id: "LRR", items: [v(5)], state: "active" },
				{ id: "RLL", items: [v(4)], state: "active" },
				{ id: "RLR", items: [v(2)], state: "active" },
				{ id: "RRL", items: [v(6)], state: "active" },
				{ id: "RRR", items: [v(1)], state: "active" },
			],
		],
		stepLabel: "Base cases",
		description:
			"All sub-arrays are now single elements — base case reached. A single element is already sorted by definition.",
		phase: "divide",
	},
	// Frame 4 — merge pairs; singles consumed, upper levels still idle
	{
		rows: [
			[{ id: "root", items: [v(3), v(7), v(8), v(5), v(4), v(2), v(6), v(1)], state: "idle" }],
			[
				{ id: "L", items: [v(3), v(7), v(8), v(5)], state: "idle" },
				{ id: "R", items: [v(4), v(2), v(6), v(1)], state: "idle" },
			],
			[
				{ id: "LL", items: [v(3), v(7)], state: "sorted" },
				{ id: "LR", items: [v(5), v(8)], state: "sorted" },
				{ id: "RL", items: [v(2), v(4)], state: "sorted" },
				{ id: "RR", items: [v(1), v(6)], state: "sorted" },
			],
			[],
		],
		stepLabel: "Merge pairs",
		description:
			"Merge all 4 pairs at once: [3]+[7]→[3,7]  [8]+[5]→[5,8]  [4]+[2]→[2,4]  [6]+[1]→[1,6]. Note how 5 and 8 swap positions.",
		phase: "merge",
	},
	// Frame 5 — merge halves; pairs consumed, root still idle above
	{
		rows: [
			[{ id: "root", items: [v(3), v(7), v(8), v(5), v(4), v(2), v(6), v(1)], state: "idle" }],
			[
				{ id: "L", items: [v(3), v(5), v(7), v(8)], state: "sorted" },
				{ id: "R", items: [v(1), v(2), v(4), v(6)], state: "sorted" },
			],
			[],
			[],
		],
		stepLabel: "Merge halves",
		description:
			"Merge the sorted 2-pairs: [3,7]+[5,8]→[3,5,7,8]  [2,4]+[1,6]→[1,2,4,6]. Elements interleave to produce sorted order.",
		phase: "merge",
	},
	// Frame 6 — final merge: root
	{
		rows: [
			[{ id: "root", items: [v(1), v(2), v(3), v(4), v(5), v(6), v(7), v(8)], state: "sorted" }],
			[],
			[],
			[],
		],
		stepLabel: "Final merge",
		description:
			"Final merge: [3,5,7,8] + [1,2,4,6] → [1,2,3,4,5,6,7,8]. Both sorted halves combined into the complete sorted result.",
		phase: "merge",
	},
	// Frame 7 — done
	{
		rows: [
			[{ id: "root", items: [v(1), v(2), v(3), v(4), v(5), v(6), v(7), v(8)], state: "done" }],
			[],
			[],
			[],
		],
		stepLabel: "Done!",
		description:
			"Array fully sorted: [1,2,3,4,5,6,7,8] ✓  Time complexity: O(n log n) — log₂(8)=3 levels of splits, each O(n) to merge.",
		phase: "done",
	},
];
