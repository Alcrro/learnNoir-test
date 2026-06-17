import { cn } from "../../../../../../../libs/utils/cn";

type Props = { earned: number; max: number; score: number };

export function ScoreBadge({ earned, max, score }: Props) {
	return (
		<span
			className={cn(
				"font-mono text-xs tabular-nums",
				score >= 70 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-red-400",
			)}
		>
			{earned}/{max} pts
		</span>
	);
}
