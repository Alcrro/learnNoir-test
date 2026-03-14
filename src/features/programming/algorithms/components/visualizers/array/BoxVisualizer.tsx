import { forwardRef } from "react";
import "../../../../../../components/styles/gsapComparedIndex.scss";
import { ArrowDown } from "lucide-react";
export const BoxAlgorithmVisualization = forwardRef<
	HTMLDivElement,
	{ value: number }
>(({ value }, ref) => {
	return (
		<div
			ref={ref}
			data-role="box"
			className="relative size-12 border border-(--border-primary) text-(--text-primary) flex items-center justify-center rounded-full shadow-sm bg-(--background-secondary) font-medium"
		>
			<ArrowDown
				className="compare-arrow absolute -top-6 opacity-0 text-(--compare-color)"
				size={20}
				strokeWidth={3}
			/>
			{value}
		</div>
	);
});
