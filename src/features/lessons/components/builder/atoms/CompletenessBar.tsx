import { cn } from "../../../../../libs/utils/cn";
import type { CompletenessLabel } from "../lib/completenessScore";

type Props = {
	score: number;
	label: CompletenessLabel;
	className?: string;
};

const fillColors: Record<CompletenessLabel, string> = {
	incomplete: "bg-red-500",
	partial:    "bg-orange-400",
	good:       "bg-yellow-400",
	complete:   "bg-green-500",
};

export function CompletenessBar({ score, label, className }: Props) {
	return (
		<div className={cn("h-1.5 w-full rounded-full bg-(--surface-2)", className)}>
			<div
				className={cn("h-full rounded-full transition-all duration-300", fillColors[label])}
				style={{ width: `${score}%` }}
			/>
		</div>
	);
}
