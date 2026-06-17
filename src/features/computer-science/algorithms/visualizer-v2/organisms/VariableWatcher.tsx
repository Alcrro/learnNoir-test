import { useEffect, useRef, type FC } from "react";
import { gsap } from "gsap";
import { cn } from "../../../../../libs/utils/cn";
import type { BubbleSortVars } from "../../shared/AlgorithmTypesV2";

type VarBoxProps = {
	label: string;
	value: string;
	highlighted: boolean;
};

function VarBox({ label, value, highlighted }: VarBoxProps) {
	const valueRef = useRef<HTMLSpanElement>(null);
	const prevValueRef = useRef(value);

	useEffect(() => {
		if (prevValueRef.current === value) return;
		prevValueRef.current = value;

		if (!valueRef.current) return;
		gsap.fromTo(
			valueRef.current,
			{ scale: 1.5, color: "var(--compare-color)" },
			{ scale: 1, color: "inherit", duration: 0.35, ease: "back.out(2)" },
		);
	}, [value]);

	return (
		<div className="flex flex-col items-center gap-1.5">
			<span className="text-[10px] font-mono text-(--text-muted) uppercase tracking-widest select-none">
				{label}
			</span>
			<div
				className={cn(
					"flex items-center justify-center w-16 h-10 rounded-lg border font-mono text-base font-semibold transition-colors duration-200",
					"bg-(--bg-card) text-(--text-primary)",
					highlighted
						? "border-(--compare-color) bg-(--compare-color)/10"
						: "border-(--border)",
				)}
			>
				<span ref={valueRef}>{value}</span>
			</div>
		</div>
	);
}

type Props = {
	vars: BubbleSortVars | undefined;
	stepType: string | undefined;
};

const VariableWatcher: FC<Props> = ({ vars, stepType }) => {
	if (!vars) {
		return (
			<div className="rounded-xl border border-(--border) border-dashed p-5 flex items-center justify-center">
				<p className="text-xs text-(--text-muted) text-center">
					Step forward to see execution state
				</p>
			</div>
		);
	}

	const isSwap = stepType === "swap";
	const isCompare = stepType === "compare";
	const hasComparison = vars.leftVal !== null && vars.rightVal !== null;

	return (
		<div className="rounded-xl border border-(--border) overflow-hidden">
			<div className="flex items-center gap-2 px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)">
				<span className="text-xs font-medium text-(--text-secondary) tracking-wide">
					Execution State
				</span>
			</div>

			<div className="p-4 flex flex-col gap-4">
				<div className="flex items-end gap-4">
					<VarBox label="i" value={String(vars.i)} highlighted={false} />
					<VarBox
						label="j"
						value={String(vars.j)}
						highlighted={isCompare || isSwap}
					/>
					<VarBox
						label="swapped"
						value={vars.swapped ? "true" : "false"}
						highlighted={vars.swapped}
					/>
				</div>

				{hasComparison && (
					<div
						className={cn(
							"flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-sm",
							isSwap
								? "border-(--sorted-color)/40 bg-(--sorted-color)/10"
								: "border-(--border) bg-(--bg-secondary)",
						)}
					>
						<span className="font-semibold text-(--text-primary)">
							{vars.leftVal}
						</span>
						<span className="text-[10px] text-(--text-muted)">
							arr[{vars.j}]
						</span>

						<span
							className={cn(
								"px-1.5 font-bold text-sm",
								isSwap
									? "text-(--sorted-color)"
									: "text-(--compare-color)",
							)}
						>
							{isSwap ? ">" : "≤"}
						</span>

						<span className="font-semibold text-(--text-primary)">
							{vars.rightVal}
						</span>
						<span className="text-[10px] text-(--text-muted)">
							arr[{vars.j + 1}]
						</span>

						<span
							className={cn(
								"ml-auto text-xs font-semibold",
								isSwap
									? "text-(--sorted-color)"
									: "text-(--text-muted)",
							)}
						>
							{isSwap ? "↕ swap" : "skip"}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default VariableWatcher;
