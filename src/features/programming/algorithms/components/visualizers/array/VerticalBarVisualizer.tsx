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
		<div className="flex flex-col items-center gap-1 w-10">
			<div
				className="relative h-20 w-6 flex flex-col items-center"
				ref={ref}
			>
				<ArrowDown
					className="compare-arrow absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 text-(--compare-color)"
					size={20}
					strokeWidth={3}
				/>
				<div
					className={` text-xs text-(--text-secondary) absolute left-1/2 -translate-x-1/2 ${
						isNegative ? "top-5" : "bottom-5"
					}`}
				></div>

				{/* <div className="absolute top-1/2 w-full h-px bg-(--border-primary)" /> */}

				<div
					style={{ height }}
					data-role="bar"
					className={`absolute left-0 w-full rounded-md
						${isNegative ? "bg-red-400 top-1/2" : "bg-blue-400 bottom-1/2"}`}
				/>
				<span className={cn("absolute", isNegative ? "top-0" : "bottom-0")}>
					{value}
				</span>
			</div>
		</div>
	);
});
