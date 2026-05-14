import type { FC } from "react";
import type { StepType } from "../../shared/AlgorithmTypes";
import { cn } from "../../../../../libs/utils/cn";

type Props = {
	stepType?: StepType | "noSwap";
	currentStep: number;
};

const labels: Record<string, string> = {
	compare: "Comparing",
	swap: "Swapping",
	sorted: "Sorted",
	noSwap: "No swap",
};

const colors: Record<string, string> = {
	compare:
		"bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
	swap: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	sorted: "bg-green-500/10 text-green-500 border-green-500/20",
	noSwap: "bg-gray-500/10 text-(--text-secondary) border-gray-500/20",
};

const StepTypeBadge: FC<Props> = ({ stepType, currentStep }) => {
	if (currentStep < 0 || !stepType) return null;
	return (
		<span
			className={cn(
				"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border transition-colors",
				colors[stepType] ?? "bg-gray-500/10 text-(--text-secondary) border-gray-500/20",
			)}
		>
			{labels[stepType] ?? stepType}
		</span>
	);
};

export default StepTypeBadge;
