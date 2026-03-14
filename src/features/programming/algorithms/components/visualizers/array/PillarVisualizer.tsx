import { forwardRef } from "react";
import { normalizeHeight } from "../../../../../../libs/utils/normalizeHeight";
import { ArrowDown } from "lucide-react";

export const PillarAlgorithmVisualization = forwardRef<
	HTMLDivElement,
	{ value: number }
>(({ value }, ref) => {
	const height = normalizeHeight(value);

	return (
		<div
			className="flex flex-col items-center gap-2 w-10"
			ref={ref}
			data-role="box"
		>
			<ArrowDown
				className="compare-arrow absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 text-(--compare-color)"
				size={20}
				strokeWidth={3}
			/>
			<div
				style={{ height }}
				className="w-6 rounded-md bg-linear-to-t from-indigo-500 to-purple-400 shadow-sm transition-all duration-200"
			/>

			<div className="text-xs text-(--text-secondary) font-medium">{value}</div>
		</div>
	);
});
