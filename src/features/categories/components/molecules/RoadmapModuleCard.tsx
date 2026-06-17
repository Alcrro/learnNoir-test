import { Link } from "react-router-dom";
import { ImportanceBadge } from "../atoms/ImportanceBadge";
import { cn } from "../../../../libs/utils/cn";
import type { Subject } from "../../../subjects/data/subjects.data";

interface RoadmapModuleCardProps {
	subject: Subject;
	subjectSlug: string;
}

export function RoadmapModuleCard({ subject, subjectSlug }: RoadmapModuleCardProps) {
	const href = `/subjects/${subjectSlug}/${subject.category}/${subject.id}`;
	const isCompleted =
		subject.completedLessons > 0 && subject.completedLessons >= subject.totalLessons;

	return (
		<Link
			to={href}
			className={cn(
				"group block rounded-lg border bg-(--bg-primary) px-4 py-3 transition-all",
				"hover:shadow-md hover:border-(--border-hover)",
				subject.importance === "essential"
					? "border-(--border-hover) shadow-sm"
					: "border-(--border)",
				isCompleted && "opacity-60",
			)}
		>
			<div className="flex items-start justify-between gap-2">
				<p
					className={cn(
						"font-semibold leading-tight text-(--text-primary) group-hover:text-(--accent)",
						subject.importance === "essential" ? "text-sm" : "text-xs",
					)}
				>
					{subject.title}
				</p>
				<ImportanceBadge importance={subject.importance} className="mt-0.5 shrink-0" />
			</div>

			{subject.totalLessons > 0 && (
				<p className="mt-1 text-xs text-(--text-tertiary)">
					{subject.totalLessons} lessons · {subject.estimatedHours}h
				</p>
			)}

			{isCompleted && (
				<p className="mt-1 text-xs font-medium text-emerald-500">✓ Completed</p>
			)}
		</Link>
	);
}
