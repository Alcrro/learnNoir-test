import { cn } from "../../../../../../../libs/utils/cn";

const barColor = (score: number) =>
	score >= 70
		? "bg-emerald-500"
		: score >= 40
			? "bg-amber-400"
			: "bg-red-400";

type Props = { score: number; className?: string };

export function QuizProgressBar({ score, className }: Props) {
	const clamped = Math.min(100, Math.max(0, score));

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<div className="h-1 flex-1 overflow-hidden rounded-full bg-(--border)">
				<div
					className={cn("h-full rounded-full transition-all", barColor(clamped))}
					style={{ width: `${clamped}%` }}
				/>
			</div>
			<span
				className={cn(
					"w-8 shrink-0 text-right text-[10px] font-semibold tabular-nums",
					clamped >= 70
						? "text-emerald-400"
						: clamped >= 40
							? "text-amber-400"
							: "text-red-400",
				)}
			>
				{clamped}%
			</span>
		</div>
	);
}
