import type { StepV2 } from "../../../shared/AlgorithmTypesV2";
import { ArrayBox } from "../atoms/ArrayBox";
import { getBoxColor } from "../lib/bubbleSortStepUtils";

interface ArrayRowProps {
	step: StepV2;
	sortedSet: Set<number>;
	swapEmptyIdx: number;
}

export function ArrayRow({ step, sortedSet, swapEmptyIdx }: ArrayRowProps) {
	return (
		<div className="flex flex-col gap-2">
			<span className="font-mono text-xs text-(--text-secondary)">int array[]</span>
			<div className="flex items-center gap-1">
				<span className="text-[10px] font-mono shrink-0 mr-1 text-(--text-muted)">(light)</span>
				<div className="flex gap-1.5 flex-wrap">
					{step.array.map((item, idx) => (
						<ArrayBox
							key={item.id}
							color={getBoxColor(idx, step, sortedSet)}
							isEmpty={idx === swapEmptyIdx}
							value={item.value}
						/>
					))}
				</div>
				<span className="text-[10px] font-mono shrink-0 ml-1 text-(--text-muted)">(heavy)</span>
			</div>
		</div>
	);
}
