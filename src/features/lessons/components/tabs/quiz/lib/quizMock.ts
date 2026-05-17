import type { MockQuiz } from "./quizTypes";

// ── 1. Fundamentals ──────────────────────────────────────────────────────────
const BS_FUNDAMENTALS: MockQuiz = {
	title: "Bubble Sort — Fundamentals",
	questions: [
		{
			id: "bs1-1",
			type: "mcq",
			difficulty: "beginner",
			question: "What does Bubble Sort do to adjacent elements?",
			options: [
				"Inserts them in sorted position",
				"Compares and swaps them if out of order",
				"Merges them into a sorted subarray",
				"Selects the minimum and places it first",
			],
			correctIndex: 1,
			explanation:
				"Bubble Sort repeatedly scans the array, comparing adjacent pairs and swapping them when they're in the wrong order.",
		},
		{
			id: "bs1-2",
			type: "mcq",
			difficulty: "beginner",
			question: "After the first full pass of Bubble Sort, what is guaranteed?",
			options: [
				"The array is fully sorted",
				"The smallest element is at index 0",
				"The largest element is in its final position",
				"Half the array is sorted",
			],
			correctIndex: 2,
			explanation:
				"The largest element 'bubbles up' to the last position after one complete pass through the array.",
		},
		{
			id: "bs1-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "What is the worst-case time complexity of Bubble Sort?",
			options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
			correctIndex: 2,
			explanation:
				"In the worst case (reverse-sorted array), every adjacent pair must be swapped — n*(n-1)/2 comparisons, giving O(n²).",
		},
		{
			id: "bs1-4",
			type: "mcq",
			difficulty: "intermediate",
			question: "Which property makes Bubble Sort a stable sorting algorithm?",
			options: [
				"It runs in O(n) on sorted input",
				"It never swaps equal adjacent elements",
				"It uses no extra memory",
				"It always makes exactly n passes",
			],
			correctIndex: 1,
			explanation:
				"Equal elements are never swapped, so their original relative order is always preserved — the definition of a stable sort.",
		},
		{
			id: "bs1-5",
			type: "input",
			difficulty: "intermediate",
			question:
				"With the early-exit optimization, how many passes does Bubble Sort need on an already-sorted array? (enter a number)",
			correctAnswer: "1",
			placeholder: "Enter a number…",
			explanation:
				"A single pass with zero swaps is sufficient to confirm the array is sorted — the algorithm exits immediately.",
		},
		{
			id: "bs1-6",
			type: "mcq",
			difficulty: "expert",
			question:
				"Cocktail Shaker Sort is a bidirectional variant of Bubble Sort. What specific problem does it address?",
			options: [
				"It reduces space complexity to O(log n)",
				"It eliminates the 'turtle' problem where small elements travel left very slowly",
				"It achieves O(n log n) worst-case time complexity",
				"It removes duplicate comparisons within each pass",
			],
			correctIndex: 1,
			explanation:
				"In standard Bubble Sort, large elements bubble right quickly, but small elements ('turtles') near the right end move left only one position per pass. Alternating scan direction fixes this.",
		},
		{
			id: "bs1-7",
			type: "mcq",
			difficulty: "expert",
			question: "For an array of length n in the worst case, what is the exact number of swaps Bubble Sort performs?",
			options: ["n²", "n(n−1)/2", "n(n+1)/2", "2n−1"],
			correctIndex: 1,
			explanation:
				"The number of swaps equals the number of inversions. For a reverse-sorted array the inversion count is n*(n-1)/2.",
		},
	],
};

// ── 2. Swaps and Inversions ──────────────────────────────────────────────────
const BS_SWAPS: MockQuiz = {
	title: "Swaps and Inversions",
	questions: [
		{
			id: "bs2-1",
			type: "mcq",
			difficulty: "beginner",
			question: "What is an inversion in an array?",
			options: [
				"A pair of indices (i, j) where i < j but arr[i] > arr[j]",
				"An element that is not at its sorted position",
				"Two identical elements next to each other",
				"An element that has been swapped more than once",
			],
			correctIndex: 0,
			explanation:
				"An inversion is any pair where a larger element appears before a smaller one — exactly the pairs Bubble Sort must fix.",
		},
		{
			id: "bs2-2",
			type: "input",
			difficulty: "beginner",
			question: "How many inversions does the array [3, 1, 2] have? (enter a number)",
			correctAnswer: "2",
			placeholder: "Enter a number…",
			explanation:
				"The inversions are (3,1) and (3,2). Element 3 appears before both 1 and 2, which are smaller.",
		},
		{
			id: "bs2-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "What is the relationship between the number of swaps Bubble Sort performs and inversions?",
			options: [
				"Swaps = inversions × 2",
				"Swaps = inversions exactly",
				"Swaps ≤ inversions",
				"There is no direct relationship",
			],
			correctIndex: 1,
			explanation:
				"Each adjacent swap removes exactly one inversion. The total swap count equals the total inversion count of the input.",
		},
		{
			id: "bs2-4",
			type: "input",
			difficulty: "intermediate",
			question: "For array [5, 4, 3, 2, 1] (n=5), how many total swaps does Bubble Sort perform? (enter a number)",
			correctAnswer: "10",
			placeholder: "Enter a number…",
			explanation:
				"Fully reversed array has n*(n-1)/2 = 5*4/2 = 10 inversions, so exactly 10 swaps.",
		},
		{
			id: "bs2-5",
			type: "mcq",
			difficulty: "intermediate",
			question: "Which array has more inversions?",
			options: [
				"[1, 2, 3, 4, 5]",
				"[2, 1, 3, 4, 5]",
				"[5, 4, 3, 2, 1]",
				"[1, 3, 2, 5, 4]",
			],
			correctIndex: 2,
			explanation:
				"[5,4,3,2,1] is fully reversed and has 10 inversions — the maximum for n=5. The others have 0, 1, and 2 respectively.",
		},
		{
			id: "bs2-6",
			type: "mcq",
			difficulty: "expert",
			question: "Why does swapping only adjacent elements guarantee that each swap reduces the inversion count by exactly 1?",
			options: [
				"Because adjacent elements have the smallest difference in value",
				"Swapping non-adjacent elements could introduce new inversions with elements in between",
				"It avoids touching already-sorted elements",
				"Adjacent swaps keep the algorithm stable",
			],
			correctIndex: 1,
			explanation:
				"When you swap arr[i] and arr[i+1] (out of order), you fix exactly their inversion. No other pair's order changes, so the inversion count drops by exactly 1.",
		},
	],
};

// ── 3. Early Exit Optimization ───────────────────────────────────────────────
const BS_EARLY_EXIT: MockQuiz = {
	title: "Early Exit Optimization",
	questions: [
		{
			id: "bs3-1",
			type: "mcq",
			difficulty: "beginner",
			question: "What boolean flag is used in the optimized Bubble Sort?",
			options: ["sorted", "done", "swapped", "finished"],
			correctIndex: 2,
			explanation:
				"`swapped` is set to true whenever a swap occurs in a pass. If a pass ends with swapped=false, the array is sorted.",
		},
		{
			id: "bs3-2",
			type: "mcq",
			difficulty: "beginner",
			question: "What is the best-case time complexity of Bubble Sort with the early-exit optimization?",
			options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
			correctIndex: 2,
			explanation:
				"On a sorted array, one pass finds no swaps and exits — only n-1 comparisons are made, giving O(n) best case.",
		},
		{
			id: "bs3-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "Without the early-exit flag, what is the best-case complexity of the basic Bubble Sort?",
			options: ["O(n)", "O(n log n)", "O(n²)", "O(n√n)"],
			correctIndex: 2,
			explanation:
				"Without the flag, the outer loop always runs n-1 times regardless of input order, giving O(n²) even on sorted data.",
		},
		{
			id: "bs3-4",
			type: "input",
			difficulty: "intermediate",
			question:
				"Optimized Bubble Sort on a sorted array of 100 elements: how many comparisons are made? (enter a number)",
			correctAnswer: "99",
			placeholder: "Enter a number…",
			explanation:
				"A single pass compares n-1 = 99 adjacent pairs, finds no swaps, sets swapped=false, and exits.",
		},
		{
			id: "bs3-5",
			type: "mcq",
			difficulty: "expert",
			question:
				"You apply the early-exit optimization and also shrink the inner loop boundary after each pass. What is this combined optimization called?",
			options: [
				"Comb Sort",
				"Shell Sort",
				"Standard Bubble Sort with two optimizations",
				"Gnome Sort",
			],
			correctIndex: 2,
			explanation:
				"Tracking the last swap position to shrink the active range is a second optimization layered on top of early exit — it's still standard Bubble Sort, just better tuned.",
		},
	],
};

// ── 4. Bubble Sort Variants ───────────────────────────────────────────────────
const BS_VARIANTS: MockQuiz = {
	title: "Bubble Sort Variants",
	questions: [
		{
			id: "bs4-1",
			type: "mcq",
			difficulty: "beginner",
			question: "Cocktail Shaker Sort differs from Bubble Sort because it scans in…",
			options: [
				"Only left-to-right",
				"Only right-to-left",
				"Alternating left-to-right and right-to-left",
				"Random direction each pass",
			],
			correctIndex: 2,
			explanation:
				"Each full pass of Cocktail Shaker Sort consists of one left-to-right scan followed by one right-to-left scan.",
		},
		{
			id: "bs4-2",
			type: "mcq",
			difficulty: "intermediate",
			question: "What are 'turtles' in the context of Bubble Sort?",
			options: [
				"Large elements near the beginning that move right quickly",
				"Small elements near the end that move left very slowly",
				"Elements that are already in their sorted position",
				"Elements that cause the most comparisons",
			],
			correctIndex: 1,
			explanation:
				"'Turtles' are small elements near the right end. They move left only one position per pass, making standard Bubble Sort slow on such inputs.",
		},
		{
			id: "bs4-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "Comb Sort improves Bubble Sort by…",
			options: [
				"Scanning in both directions",
				"Starting with a large gap between compared elements and shrinking it",
				"Selecting the minimum on each pass",
				"Using a min-heap for comparisons",
			],
			correctIndex: 1,
			explanation:
				"Comb Sort uses a gap > 1 initially (similar to Shell Sort's idea) to move elements large distances quickly, eliminating turtles efficiently.",
		},
		{
			id: "bs4-4",
			type: "mcq",
			difficulty: "intermediate",
			question: "Odd-Even Sort (Brick Sort) is notable because it can…",
			options: [
				"Sort in O(n log n) time",
				"Be parallelized efficiently on multi-processor systems",
				"Sort without any comparisons",
				"Guarantee O(n) time on nearly-sorted input",
			],
			correctIndex: 1,
			explanation:
				"Odd-Even Sort alternates between comparing odd-indexed pairs and even-indexed pairs — independent comparisons in each phase can run in parallel.",
		},
		{
			id: "bs4-5",
			type: "mcq",
			difficulty: "expert",
			question: "What is the approximate shrink factor used by Comb Sort to reduce the gap each round?",
			options: ["1.3", "2.0", "1.5", "φ (golden ratio ≈ 1.618)"],
			correctIndex: 0,
			explanation:
				"A shrink factor of 1.3 was found empirically to give the best results. Dividing the current gap by 1.3 (rounding down) each iteration works well in practice.",
		},
		{
			id: "bs4-6",
			type: "mcq",
			difficulty: "expert",
			question: "Cocktail Shaker Sort has the same worst-case complexity as Bubble Sort. What does it improve in practice?",
			options: [
				"Worst-case to O(n log n)",
				"Reduces the number of passes needed for inputs with turtles",
				"Space complexity from O(n) to O(1)",
				"Eliminates comparisons between sorted elements",
			],
			correctIndex: 1,
			explanation:
				"By moving elements in both directions each round, small elements near the end ('turtles') can move multiple positions per full pass, reducing total passes.",
		},
	],
};

// ── 5. Complexity Deep Dive ──────────────────────────────────────────────────
const BS_COMPLEXITY: MockQuiz = {
	title: "Complexity Analysis",
	questions: [
		{
			id: "bs5-1",
			type: "mcq",
			difficulty: "beginner",
			question: "What is the space complexity of Bubble Sort?",
			options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
			correctIndex: 3,
			explanation:
				"Bubble Sort sorts in-place, using only a constant number of extra variables (loop indices, swap temp). Space is O(1).",
		},
		{
			id: "bs5-2",
			type: "mcq",
			difficulty: "beginner",
			question: "What is the average-case time complexity of Bubble Sort?",
			options: ["O(n)", "O(n log n)", "O(n²)", "O(n√n)"],
			correctIndex: 2,
			explanation:
				"On a random input, roughly half the pairs are inversions. The expected swap count is still Θ(n²), giving average-case O(n²).",
		},
		{
			id: "bs5-3",
			type: "input",
			difficulty: "intermediate",
			question:
				"For n = 4 elements in the worst case, how many comparisons does Bubble Sort make? (enter a number)",
			correctAnswer: "6",
			placeholder: "Enter a number…",
			explanation:
				"Worst-case comparisons = n*(n-1)/2 = 4*3/2 = 6.",
		},
		{
			id: "bs5-4",
			type: "mcq",
			difficulty: "intermediate",
			question: "The inner loop boundary shrinks by 1 after each outer pass because…",
			options: [
				"The first element is always sorted after each pass",
				"The last i elements are already in their final positions",
				"The algorithm only needs half the iterations",
				"It prevents the swapped flag from being reset",
			],
			correctIndex: 1,
			explanation:
				"After pass i, the i largest elements have bubbled to the end and are in their final sorted positions. There is no need to compare them again.",
		},
		{
			id: "bs5-5",
			type: "mcq",
			difficulty: "expert",
			question: "Which of the following is TRUE about the exact comparison count for Bubble Sort (no early exit)?",
			options: [
				"It is always n² comparisons",
				"It is always n*(n-1)/2 comparisons regardless of input",
				"It depends on the number of inversions in the input",
				"It varies between n-1 and n*(n-1)/2 depending on the input",
			],
			correctIndex: 1,
			explanation:
				"Without early exit, the outer loop always runs n-1 times and the inner loop always runs n-1-i times. The comparison count is always n*(n-1)/2, independent of the input order.",
		},
	],
};

// ── 6. Stability and Properties ──────────────────────────────────────────────
const BS_STABILITY: MockQuiz = {
	title: "Stability and Properties",
	questions: [
		{
			id: "bs6-1",
			type: "mcq",
			difficulty: "beginner",
			question: "A sorting algorithm is called 'stable' if…",
			options: [
				"It always runs in the same amount of time",
				"It uses no extra memory",
				"Equal elements maintain their original relative order",
				"It produces the same result on every run",
			],
			correctIndex: 2,
			explanation:
				"Stability means: if two elements have equal keys, the one that appeared first in the input still appears first in the output.",
		},
		{
			id: "bs6-2",
			type: "mcq",
			difficulty: "beginner",
			question: "Is Bubble Sort an in-place algorithm?",
			options: [
				"No, it needs O(n) extra memory for a temporary copy",
				"Yes, it sorts using only a constant amount of extra space",
				"Only in the optimized version",
				"No, it uses a stack of size O(log n)",
			],
			correctIndex: 1,
			explanation:
				"Bubble Sort uses only a handful of variables (loop counters, a temp variable for swapping). No additional array or data structure is needed.",
		},
		{
			id: "bs6-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "Bubble Sort is described as 'adaptive'. What does this mean?",
			options: [
				"It can sort any data type",
				"Its performance improves on nearly-sorted input",
				"It adapts the comparison direction based on input",
				"It resizes its auxiliary data structure dynamically",
			],
			correctIndex: 1,
			explanation:
				"With the early-exit flag, Bubble Sort exits early when no swaps occur. On nearly-sorted input with few inversions, this makes it significantly faster than O(n²).",
		},
		{
			id: "bs6-4",
			type: "mcq",
			difficulty: "intermediate",
			question: "You sort records by last name using Bubble Sort. Two records have the same last name. What is guaranteed?",
			options: [
				"The record that appeared first in the input will appear first in the output",
				"The records will be in the same position as in the input",
				"Nothing is guaranteed about their relative order",
				"The record with the shorter first name will appear first",
			],
			correctIndex: 0,
			explanation:
				"Because Bubble Sort is stable, equal-key elements retain their input order. The original first record stays before the original second record.",
		},
		{
			id: "bs6-5",
			type: "mcq",
			difficulty: "expert",
			question: "Which of the following O(n²) sorting algorithms is NOT stable?",
			options: [
				"Bubble Sort",
				"Insertion Sort",
				"Selection Sort",
				"Cocktail Shaker Sort",
			],
			correctIndex: 2,
			explanation:
				"Selection Sort is not stable — it swaps the minimum element into position, which can change the relative order of equal elements. Bubble Sort, Insertion Sort, and Cocktail Shaker Sort are all stable.",
		},
	],
};

// ── 7. Comparison with Other Sorts ───────────────────────────────────────────
const BS_COMPARISON: MockQuiz = {
	title: "Comparison with Other Sorts",
	questions: [
		{
			id: "bs7-1",
			type: "mcq",
			difficulty: "beginner",
			question: "Which sorting algorithm always performs exactly n*(n-1)/2 comparisons, regardless of input?",
			options: ["Bubble Sort (no early exit)", "Insertion Sort", "Merge Sort", "Quick Sort"],
			correctIndex: 0,
			explanation:
				"Without early exit, Bubble Sort always runs all n*(n-1)/2 comparisons. The others vary based on input order.",
		},
		{
			id: "bs7-2",
			type: "mcq",
			difficulty: "intermediate",
			question: "Insertion Sort and Bubble Sort both have O(n²) average complexity. Which is generally faster in practice?",
			options: [
				"Bubble Sort, because it uses adjacent swaps",
				"Insertion Sort, because it performs fewer writes on average",
				"They are identical in practice",
				"Bubble Sort, because it has better cache performance",
			],
			correctIndex: 1,
			explanation:
				"Insertion Sort makes at most one write per comparison in the best case and typically fewer data movements overall, giving a smaller constant factor.",
		},
		{
			id: "bs7-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "Merge Sort has O(n log n) time complexity but Bubble Sort is sometimes preferred for very small arrays. Why?",
			options: [
				"Bubble Sort is faster on reverse-sorted arrays",
				"Merge Sort requires O(n) extra memory; for tiny n the overhead matters",
				"Bubble Sort has better worst-case complexity for n < 10",
				"Merge Sort is unstable for small arrays",
			],
			correctIndex: 1,
			explanation:
				"Merge Sort allocates auxiliary memory and has recursive call overhead. For n < ~10 elements, these constants dominate and simple O(n²) sorts win.",
		},
		{
			id: "bs7-4",
			type: "mcq",
			difficulty: "intermediate",
			question: "What advantage does Selection Sort have over Bubble Sort?",
			options: [
				"Better time complexity",
				"It is stable",
				"Fewer total writes/swaps (at most n-1 swaps)",
				"Better performance on nearly-sorted input",
			],
			correctIndex: 2,
			explanation:
				"Selection Sort does exactly n-1 swaps regardless of input — useful when writes are expensive. Bubble Sort can do up to n*(n-1)/2 swaps.",
		},
		{
			id: "bs7-5",
			type: "mcq",
			difficulty: "expert",
			question: "Quicksort has O(n²) worst-case but outperforms Bubble Sort in practice. The primary reason is…",
			options: [
				"Quicksort uses fewer comparisons in the worst case",
				"Quicksort has much better cache behavior and a smaller average-case constant",
				"Quicksort is stable, Bubble Sort is not",
				"Quicksort uses in-place sorting, Bubble Sort does not",
			],
			correctIndex: 1,
			explanation:
				"Quicksort's average O(n log n) with small constants and sequential memory access patterns give it far better practical performance despite the same worst-case asymptote.",
		},
	],
};

// ── 8. Loop Invariants ───────────────────────────────────────────────────────
const BS_INVARIANTS: MockQuiz = {
	title: "Loop Invariants and Correctness",
	questions: [
		{
			id: "bs8-1",
			type: "mcq",
			difficulty: "beginner",
			question: "After k complete outer passes of Bubble Sort, what is guaranteed about the array?",
			options: [
				"The first k elements are in sorted order",
				"The last k elements are in their final sorted positions",
				"Exactly k elements have been swapped",
				"The array is sorted up to the midpoint",
			],
			correctIndex: 1,
			explanation:
				"Each pass bubbles the current maximum to its correct final position at the end. After k passes, the k largest elements are in place.",
		},
		{
			id: "bs8-2",
			type: "mcq",
			difficulty: "intermediate",
			question: "The loop invariant for the outer loop of Bubble Sort states that after i passes…",
			options: [
				"arr[0..i-1] is sorted",
				"arr[n-i..n-1] contains the i largest elements in sorted order",
				"The number of inversions has been reduced by i",
				"All elements at even indices are in sorted order",
			],
			correctIndex: 1,
			explanation:
				"The formal invariant: after the i-th pass, arr[n-i..n-1] holds the i globally largest elements in their correct final positions.",
		},
		{
			id: "bs8-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "Why is the outer loop upper bound (n-1) sufficient — why not n passes?",
			options: [
				"The last element doesn't need to be compared",
				"After n-1 passes, all elements are in their final position — the remaining element must already be correct",
				"The inner loop handles the last pass automatically",
				"n passes would cause an index out-of-bounds error",
			],
			correctIndex: 1,
			explanation:
				"After n-1 elements are placed correctly, there is only one element left and it must be the smallest — already in its correct position.",
		},
		{
			id: "bs8-4",
			type: "mcq",
			difficulty: "expert",
			question: "You have an array of n elements and you know it has at most k inversions (k << n²). Which algorithm takes advantage of this?",
			options: [
				"Merge Sort",
				"Selection Sort",
				"Optimized Bubble Sort (early exit + last-swap tracking)",
				"Heap Sort",
			],
			correctIndex: 2,
			explanation:
				"With k inversions, optimized Bubble Sort performs exactly k swaps and at most k+n-1 comparisons — O(k+n) time. For nearly-sorted input this is much better than O(n²).",
		},
		{
			id: "bs8-5",
			type: "mcq",
			difficulty: "expert",
			question: "Prove by invariant: after all passes, the array is sorted. Which termination argument is correct?",
			options: [
				"The loop runs forever but the array is sorted when a pass finds no swaps",
				"Each pass reduces the inversion count by at least 1; since inversions ≥ 0, the loop terminates, and 0 inversions means sorted",
				"The array is sorted after exactly n iterations, proven by induction",
				"The swapped flag ensures termination after at most 2 passes",
			],
			correctIndex: 1,
			explanation:
				"Each pass reduces inversions by at least 1 (it fixes at least the one rightmost inversion). The count is bounded below by 0, so the loop must terminate. Zero inversions ↔ sorted array.",
		},
	],
};

// ── 9. Edge Cases ────────────────────────────────────────────────────────────
const BS_EDGE_CASES: MockQuiz = {
	title: "Edge Cases and Special Inputs",
	questions: [
		{
			id: "bs9-1",
			type: "mcq",
			difficulty: "beginner",
			question: "What does Bubble Sort return on an empty array?",
			options: [
				"It throws an error",
				"An empty array — no iterations occur",
				"An array with one null element",
				"It enters an infinite loop",
			],
			correctIndex: 1,
			explanation:
				"With n=0, the outer loop condition (i < n-1 = -1) is false immediately, so the algorithm returns the empty array unchanged.",
		},
		{
			id: "bs9-2",
			type: "mcq",
			difficulty: "beginner",
			question: "Bubble Sort is run on [42] (a single element). What happens?",
			options: [
				"It throws an index error",
				"It performs one swap",
				"It returns [42] immediately with no comparisons",
				"It needs one full pass",
			],
			correctIndex: 2,
			explanation:
				"With n=1, the outer loop runs 0 times (n-1 = 0 iterations). No comparisons or swaps occur.",
		},
		{
			id: "bs9-3",
			type: "mcq",
			difficulty: "intermediate",
			question: "Bubble Sort (optimized) is run on [5, 5, 5, 5]. How many swaps occur?",
			options: ["0", "4", "6", "1"],
			correctIndex: 0,
			explanation:
				"All elements are equal, so no adjacent pair is ever out of order. Zero swaps occur. The first pass ends with swapped=false and the algorithm exits.",
		},
		{
			id: "bs9-4",
			type: "mcq",
			difficulty: "intermediate",
			question: "On input [1, 2, 3, 4, 5] (already sorted, with early exit), how many outer passes run?",
			options: ["0", "1", "4", "5"],
			correctIndex: 1,
			explanation:
				"One pass is needed to verify the array is sorted (swapped remains false). The outer loop then exits — exactly 1 pass, n-1 comparisons.",
		},
		{
			id: "bs9-5",
			type: "mcq",
			difficulty: "expert",
			question: "On a reverse-sorted array of n elements, what is the position of the smallest element after exactly 1 pass?",
			options: [
				"Index 0 — it has reached the front",
				"Index n-2 — it moved one step left",
				"Index n-1 — unchanged",
				"Index n/2 — it reaches the midpoint",
			],
			correctIndex: 1,
			explanation:
				"In a left-to-right pass, the minimum moves left only once — past the element immediately to its right. After one pass on a reversed array, it is at position n-2.",
		},
	],
};

// ── 10. Code Tracing ─────────────────────────────────────────────────────────
const BS_CODE_TRACING: MockQuiz = {
	title: "Code Tracing",
	questions: [
		{
			id: "bs10-1",
			type: "mcq",
			difficulty: "beginner",
			question:
				"After one left-to-right pass on [4, 2, 7, 1, 3], what does the array look like?",
			options: [
				"[2, 4, 1, 3, 7]",
				"[1, 2, 3, 4, 7]",
				"[4, 2, 1, 3, 7]",
				"[2, 4, 7, 1, 3]",
			],
			correctIndex: 0,
			explanation:
				"Pass: (4,2)→swap→[2,4,7,1,3]; (4,7)→ok; (7,1)→swap→[2,4,1,7,3]; (7,3)→swap→[2,4,1,3,7]. Result: [2,4,1,3,7].",
		},
		{
			id: "bs10-2",
			type: "input",
			difficulty: "beginner",
			question:
				"After two complete passes on [5, 3, 1, 4, 2], what value is at index 4 (last position)? (enter a number)",
			correctAnswer: "5",
			placeholder: "Enter a number…",
			explanation:
				"Pass 1: 5 bubbles to end → [..., 5]. Pass 2: 4 bubbles to position before 5 → [..., 4, 5]. Index 4 = 5.",
		},
		{
			id: "bs10-3",
			type: "mcq",
			difficulty: "intermediate",
			question:
				'What bug exists in this code?\n\nfor i in range(n):\n  for j in range(n - 1):\n    if arr[j] > arr[j+1]:\n      arr[j], arr[j+1] = arr[j+1], arr[j]',
			options: [
				"The outer loop should start at 1",
				"The inner loop should be range(n - 1 - i) to skip already-sorted elements",
				"The comparison should be arr[j] >= arr[j+1]",
				"arr[j] and arr[j+1] are swapped in the wrong order",
			],
			correctIndex: 1,
			explanation:
				"Without `n - 1 - i`, the inner loop always runs n-1 times, comparing elements already at their final position. This is correct but wastes O(n) comparisons per pass.",
		},
		{
			id: "bs10-4",
			type: "mcq",
			difficulty: "intermediate",
			question:
				"Optimized Bubble Sort is run on [3, 2, 1]. After which pass does `swapped` remain False?",
			options: ["Pass 1", "Pass 2", "Pass 3", "Pass 4"],
			correctIndex: 1,
			explanation:
				"Pass 1: swaps (3,2) and (3,1) — swapped=True, array=[2,1,3]. Pass 2: swaps (2,1) — swapped=True, array=[1,2,3]. Pass 3: no swaps — swapped=False → exit. So swapped stays False on Pass 3.",
		},
		{
			id: "bs10-5",
			type: "mcq",
			difficulty: "expert",
			question:
				"A developer changes `arr[j] > arr[j+1]` to `arr[j] >= arr[j+1]`. What property of the sort changes?",
			options: [
				"The algorithm becomes faster",
				"The sort becomes unstable — equal elements may be swapped",
				"The sort no longer terminates",
				"The worst-case complexity improves",
			],
			correctIndex: 1,
			explanation:
				"Using `>=` causes equal adjacent elements to be swapped unnecessarily, breaking the stability guarantee. With `>`, equal elements are never swapped and relative order is preserved.",
		},
	],
};

// ── Registry ─────────────────────────────────────────────────────────────────
export const QUIZ_REGISTRY: Record<string, MockQuiz> = {
	"bs-fundamentals": BS_FUNDAMENTALS,
	"bs-swaps": BS_SWAPS,
	"bs-early-exit": BS_EARLY_EXIT,
	"bs-variants": BS_VARIANTS,
	"bs-complexity": BS_COMPLEXITY,
	"bs-stability": BS_STABILITY,
	"bs-comparison": BS_COMPARISON,
	"bs-invariants": BS_INVARIANTS,
	"bs-edge-cases": BS_EDGE_CASES,
	"bs-code-tracing": BS_CODE_TRACING,
};

// Kept for backwards compatibility — existing block data that has no quizId falls back here.
export const BUBBLE_SORT_QUIZ = BS_FUNDAMENTALS;
