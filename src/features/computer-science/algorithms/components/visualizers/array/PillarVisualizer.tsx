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
			ref={ref}
			data-role="box"
			className="flex flex-col items-center gap-2 w-10 relative"
		>
			<ArrowDown
				className="compare-arrow absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 text-(--compare-color)"
				size={20}
				strokeWidth={3}
			/>
			<div
				style={{ height: `${height}px` }}
				data-role="bar"
				className="relative w-6 rounded-md bg-(--default_color) shadow-sm"
			/>
			<div className="text-xs text-(--text-secondary) font-medium">{value}</div>
		</div>
	);
});
