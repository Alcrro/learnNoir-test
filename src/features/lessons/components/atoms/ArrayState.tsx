import type { ExampleBlock } from "@shared/lesson-content";
import { cn } from "../../../../libs/utils/cn";

type Props = { state: ExampleBlock["states"][number] };

export function ArrayState({ state }: Props) {
	const compare = new Set(state.highlights?.compare ?? []);
	const swap = new Set(state.highlights?.swap ?? []);
	const sorted = new Set(state.highlights?.sorted ?? []);

	return (
		<div className="flex items-center gap-3">
			<div className="flex gap-1">
				{state.array.map((val, idx) => {
					const isCompare = compare.has(idx);
					const isSwap = swap.has(idx);
					const isSorted = sorted.has(idx);

					return (
						<div
							key={idx}
							className={cn(
								"flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
								isSorted && "border-emerald-500/50 bg-emerald-500/15 text-emerald-400",
								isSwap && "border-violet-500/50 bg-violet-500/15 text-violet-400",
								isCompare && "border-amber-400/50 bg-amber-400/15 text-amber-300",
								!isCompare &&
									!isSwap &&
									!isSorted &&
									"border-(--border) bg-(--surface) text-(--text-primary)",
							)}
						>
							{val}
						</div>
					);
				})}
			</div>
			<span className="text-xs text-(--text-muted) italic">{state.action}</span>
		</div>
	);
}
