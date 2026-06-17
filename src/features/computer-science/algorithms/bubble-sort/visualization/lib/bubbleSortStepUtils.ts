import type { StepV2 } from "../../../shared/AlgorithmTypesV2";
import { STEP_COLORS } from "./stepColors";

export function getBoxColor(
	idx: number,
	step: StepV2,
	sortedSet: Set<number>,
): string {
	if (sortedSet.has(idx)) return STEP_COLORS.green;
	if (step.type === "compare" && step.compare?.includes(idx)) return STEP_COLORS.amber;
	if (step.type === "swap" && step.swap?.includes(idx)) return STEP_COLORS.amber;
	return STEP_COLORS.cyan;
}

export function buildDescription(step: StepV2): string {
	const v = step.vars;
	if (step.type === "compare") {
		const ord = (v.leftVal ?? 0) > (v.rightVal ?? 0) ? ">" : "≤";
		return `Comparing index ${v.j} and ${v.j + 1}: ${v.leftVal} ${ord} ${v.rightVal}${ord === ">" ? " → swap needed" : " → no swap"}`;
	}
	if (step.type === "swap") {
		return `Swap! temp = ${v.leftVal}, move ${v.rightVal} left, put temp on the right.`;
	}
	if (step.type === "noSwap" && step.sorted) {
		const sortedIdx = step.sorted[0] ?? -1;
		return sortedIdx === 0
			? "Array fully sorted! All elements are in their final positions."
			: `Pass ${v.i + 1} complete — element at position ${sortedIdx} is now in its final position.`;
	}
	return "";
}
