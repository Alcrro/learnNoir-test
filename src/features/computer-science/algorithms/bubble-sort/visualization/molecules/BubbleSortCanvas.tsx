import type { StepV2 } from "../../../shared/AlgorithmTypesV2";
import { ArrayRow } from "./ArrayRow";
import { TempRow } from "./TempRow";

interface BubbleSortCanvasProps {
	step: StepV2;
	sortedSet: Set<number>;
	swapEmptyIdx: number;
	tempValue: number | null | undefined;
}

export function BubbleSortCanvas({ step, sortedSet, swapEmptyIdx, tempValue }: BubbleSortCanvasProps) {
	return (
		<div className="bssv-canvas-container rounded-xl border border-(--border) bg-(--bg-primary) p-5">
			<span className="bssv-canvas-badge px-4 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full border bg-(--bg-primary) border-(--border) text-(--text-muted)">
				Bubble Sort
			</span>
			<div className="flex flex-col gap-4">
				<ArrayRow step={step} sortedSet={sortedSet} swapEmptyIdx={swapEmptyIdx} />
				<TempRow tempValue={tempValue} />
			</div>
		</div>
	);
}
