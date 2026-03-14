import type { AlgorithmTypeProp } from "../../features/programming/algorithms/data/algorithmArray";

export function generateArray(
	size: number,
	min: number,
	max: number = 99,
): AlgorithmTypeProp[] {
	const array: AlgorithmTypeProp[] = [];
	for (let i = 0; i < size; i++) {
		array.push({
			id: i,
			value: Math.floor(Math.random() * (max - min + 1)) + min,
		});
	}

	return array;
}
