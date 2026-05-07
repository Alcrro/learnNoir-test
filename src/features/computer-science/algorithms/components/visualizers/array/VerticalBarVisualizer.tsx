import { forwardRef } from "react";
import { normalizeHeight } from "../../../../../../libs/utils/normalizeHeight";
import { ArrowDown } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";

export const VerticalAlgorithmVisualization = forwardRef<
	HTMLDivElement,
	{ value: number }
>(({ value }, ref) => {
	const height = normalizeHeight(value);
	const isNegative = value < 0;

	return (
		<div
			ref={ref}
			data-role="box"
			className="flex flex-col items-center gap-1 w-10"
		>
			<div className="relative h-20 w-6 flex flex-col items-center">
				<ArrowDown
					className="compare-arrow absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 text-(--compare-color)"
					size={20}
					strokeWidth={3}
				/>
				<div
					style={{ height }}
					data-role="bar"
					className={cn(
						"absolute left-0 w-full rounded-md bg-(--default_color)",
						isNegative ? "top-1/2" : "bottom-1/2",
					)}
				/>
				<span
					className={cn(
						"absolute text-xs text-(--text-secondary)",
						isNegative ? "top-0" : "bottom-0",
					)}
				>
					{value}
				</span>
			</div>
		</div>
	);
});
