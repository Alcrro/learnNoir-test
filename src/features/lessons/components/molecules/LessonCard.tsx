import { Link } from "react-router-dom";
import { ArrowRight, Clock, CheckCircle, Circle, PlayCircle } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import type { LessonDTO } from "../../api/lessonsApi";
import type { LessonProgress } from "../../api/progressApi";

type Props = {
	lesson: LessonDTO;
	progress: LessonProgress | null | undefined;
	href: string;
	position: number;
};

const STATUS_CONFIG = {
	completed: {
		icon: CheckCircle,
		label: "Completed",
		className: "text-emerald-500",
		barClass: "bg-emerald-500",
	},
	in_progress: {
		icon: PlayCircle,
		label: "In progress",
		className: "text-blue-400",
		barClass: "bg-blue-400",
	},
	not_started: {
		icon: Circle,
		label: "Not started",
		className: "text-(--text-muted)",
		barClass: "bg-(--border)",
	},
};

function formatDuration(seconds: number): string {
	if (seconds < 60) return `${seconds}s`;
	const mins = Math.round(seconds / 60);
	if (mins < 60) return `${mins}min`;
	const hrs = Math.floor(mins / 60);
	const rem = mins % 60;
	return rem > 0 ? `${hrs}h ${rem}min` : `${hrs}h`;
}

export function LessonCard({ lesson, progress, href, position }: Props) {
	const statusKey = progress?.status ?? "not_started";
	const config = STATUS_CONFIG[statusKey];
	const StatusIcon = config.icon;
	const score = progress?.weightedScore ?? 0;

	return (
		<Link
			to={href}
			className="group flex items-start gap-4 rounded-xl border border-(--border) bg-(--surface) p-5 transition-all hover:border-(--border-strong) hover:shadow-lg"
		>
			{/* Position badge */}
			<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--border) text-sm font-medium text-(--text-muted) group-hover:border-(--border-strong)">
				{position}
			</div>

			{/* Main content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<h3 className="text-base font-semibold text-(--text-primary) leading-snug">
						{lesson.title}
					</h3>
					<div className="hidden rounded-full border border-(--border) p-1.5 text-(--text-muted) transition group-hover:border-(--border-strong) group-hover:text-(--text-primary) sm:block shrink-0">
						<ArrowRight className="h-3.5 w-3.5" />
					</div>
				</div>

				{lesson.description && (
					<p className="mt-1 text-sm text-(--text-secondary) line-clamp-2">
						{lesson.description}
					</p>
				)}

				{/* Meta row */}
				<div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-(--text-muted)">
					{lesson.durationSeconds > 0 && (
						<div className="flex items-center gap-1">
							<Clock className="h-3.5 w-3.5" />
							<span>{formatDuration(lesson.durationSeconds)}</span>
						</div>
					)}

					<div className={cn("flex items-center gap-1", config.className)}>
						<StatusIcon className="h-3.5 w-3.5" />
						<span>{config.label}</span>
					</div>

					{statusKey !== "not_started" && (
						<span className="text-(--text-muted)">{score}% score</span>
					)}
				</div>

				{/* Progress bar — only when there is progress to show */}
				{statusKey !== "not_started" && (
					<div className="mt-3 h-1 w-full rounded-full bg-(--border)">
						<div
							className={cn("h-1 rounded-full transition-all", config.barClass)}
							style={{ width: `${score}%` }}
						/>
					</div>
				)}
			</div>
		</Link>
	);
}
