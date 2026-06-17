import type { StepV2 } from "../../shared/AlgorithmTypesV2";

export function generateBubbleSortStepsV2(
	array: { id: number; value: number }[],
): StepV2[] {
	const steps: StepV2[] = [];
	const arr = array.map((o) => ({ ...o }));

	const snapshot = () => arr.map((o) => ({ ...o }));

	for (let i = 0; i < arr.length - 1; i++) {
		let swapped = false;
		let lastJ = 0;

		for (let j = 0; j < arr.length - i - 1; j++) {
			lastJ = j;
			const leftVal = arr[j]!.value;
			const rightVal = arr[j + 1]!.value;

			steps.push({
				array: snapshot(),
				type: "compare",
				compare: [j, j + 1],
				line: [3, 4],
				vars: { i, j, swapped, leftVal, rightVal },
			});

			if (leftVal > rightVal) {
				[arr[j], arr[j + 1]] = [arr[j + 1]!, arr[j]!];
				swapped = true;

				steps.push({
					array: snapshot(),
					type: "swap",
					swap: [j, j + 1],
					line: [5, 6],
					vars: { i, j, swapped, leftVal, rightVal },
				});
			}
		}

		steps.push({
			array: snapshot(),
			type: "noSwap",
			sorted: [arr.length - 1 - i],
			line: [7, 8],
			vars: { i, j: lastJ, swapped, leftVal: null, rightVal: null },
		});

		if (!swapped) break;
	}

	steps.push({
		array: snapshot(),
		type: "noSwap",
		sorted: [0],
		line: [7],
		vars: {
			i: arr.length - 1,
			j: 0,
			swapped: false,
			leftVal: null,
			rightVal: null,
		},
	});

	return steps;
}
