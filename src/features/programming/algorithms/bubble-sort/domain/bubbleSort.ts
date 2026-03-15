import type { Step } from "../../shared/AlgorithmTypes";

export function generateBubbleSortSteps(
	array: { id: number; value: number }[],
): Step[] {
	const steps: Step[] = [];
	const arr = array.map((o) => ({ ...o }));

	const snapshot = () => arr.map((o) => ({ ...o }));

	for (let i = 0; i < arr.length - 1; i++) {
		let swapped = false;

		for (let j = 0; j < arr.length - i - 1; j++) {
			steps.push({
				array: snapshot(),
				compare: [j, j + 1],
				line: [3, 4],
			});

			if (arr[j].value > arr[j + 1].value) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

				steps.push({
					array: snapshot(),
					swap: [j, j + 1],
					line: [5, 6],
				});
				swapped = true;
			}
		}

		steps.push({
			array: snapshot(),
			sorted: [arr.length - 1 - i],
			line: 7,
		});

		steps.push({
			array: snapshot(),
			line: 8,
		});

		if (!swapped) break;
	}

	steps.push({
		array: snapshot(),
		sorted: [0],
		line: 7,
	});

	return steps;
}
