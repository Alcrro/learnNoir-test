import type { StepV2 } from "../../../shared/AlgorithmTypesV2";
import { STEP_COLORS } from "../lib/stepColors";

interface StepHeaderProps {
	step: StepV2;
	currentFrame: number;
	totalFrames: number;
}

function resolveStepLabel(type: StepV2["type"]): string {
	if (type === "compare") return "Compare";
	if (type === "swap") return "Swap";
	return "Pass done";
}

export function StepHeader({ step, currentFrame, totalFrames }: StepHeaderProps) {
	const cyan = STEP_COLORS.cyan;
	return (
		<div className="flex items-center justify-between flex-wrap gap-3">
			<div className="flex items-center gap-2">
				<span
					className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border"
					style={{ color: cyan, borderColor: `${cyan}50`, backgroundColor: `${cyan}12` }}
				>
					Bubble Sort
				</span>
				<span className="font-mono text-sm text-(--text-primary) font-semibold">
					{resolveStepLabel(step.type)}
				</span>
			</div>
			<span className="text-xs font-mono text-(--text-muted)">
				{currentFrame + 1} / {totalFrames}
			</span>
		</div>
	);
}
