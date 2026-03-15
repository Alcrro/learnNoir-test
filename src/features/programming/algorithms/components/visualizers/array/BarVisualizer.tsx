import { forwardRef } from "react";
import { cn } from "../../../../../../libs/utils/cn";
import { ArrowDown } from "lucide-react";

const MAX_VALUE = 99;
const MIN_VALUE = -99;

const MIN_BAR = 0;
const MAX_BAR = 99;

// eslint-disable-next-line react-refresh/only-export-components
export function normalizeHeight(value: number) {
	const ratio = (value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);

	return MIN_BAR + ratio * (MAX_BAR - MIN_BAR);
}

const BarVisualizer = forwardRef<HTMLDivElement, { value: number }>(
	({ value }, ref) => {
		const height = normalizeHeight(value);
		return (
			<div
				ref={ref}
				className=" mt-auto"
			>
				<div
					data-role="bar"
					style={{ height: `${height * 4}px`, marginTop: "auto" }}
					className={cn(
						"relative w-8 bg-blue-500 rounded-md flex items-end justify-center",
					)}
				>
					<ArrowDown
						className="compare-arrow absolute -top-6 opacity-0 text-(--compare-color)"
						size={20}
						strokeWidth={3}
					/>
					<span className="text-xs text-white absolute -top-8">{value}</span>
				</div>
			</div>
		);
	},
);

export default BarVisualizer;
