import type { ExerciseProgressItem, ExerciseStatus } from "./exerciseTypes";

export function buildStatusMap(
	items: ExerciseProgressItem[],
): Record<string, ExerciseStatus> {
	const map: Record<string, ExerciseStatus> = {};
	for (const item of items) {
		map[item.exerciseId] = item.status === "passed" ? "passed" : "failed";
	}
	return map;
}
