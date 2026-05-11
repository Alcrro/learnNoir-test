// components/SubjectsStats.jsx
import type { Subject } from "../../data/subjects.data";

// ── SubjectsStats ─────────────────────────────────────────────────────────────
// Props:
//   subjects — array complet (nefiltat) de subjects
type SubjectsStatsProps = {
	subjects: Subject[];
};

export default function SubjectsStats({ subjects }: SubjectsStatsProps) {
	const totalLessons = subjects.reduce((s, x) => s + x.totalLessons, 0);
	const completedLessons = subjects.reduce((s, x) => s + x.completedLessons, 0);
	const totalHours = subjects.reduce((s, x) => s + x.estimatedHours, 0);
	const completedSubs = subjects.filter(
		(x) => x.completedLessons === x.totalLessons && x.totalLessons > 0,
	).length;
	const inProgressSubs = subjects.filter(
		(x) => x.completedLessons > 0 && x.completedLessons < x.totalLessons,
	).length;
	const pct =
		totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

	const stats = [
		{
			value: subjects.length,
			label: "Subjects",
			color: "text-(--text-secondary)",
		},
		{
			value: `${completedLessons}/${totalLessons}`,
			label: "Lessons",
			color: "text-(--text-secondary)",
		},
		{
			value: inProgressSubs,
			label: "In progress",
			color: "text-indigo-600 dark:text-indigo-400",
		},
		{
			value: completedSubs,
			label: "Completed",
			color: "text-emerald-600 dark:text-emerald-400",
		},
		{
			value: `~${totalHours}h`,
			label: "Est. total",
			color: "text-amber-600 dark:text-amber-400",
		},
	];

	return (
		<div className="bg-(--bg-card) border-(--border-color) rounded-xl p-4 gap-4 flex flex-col">
			{/* Header + pct */}
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
					Overall progress
				</span>
				<span className="text-xs font-medium text-(--text-secondary) tabular-nums">
					{pct}%
				</span>
			</div>

			{/* Progress bar */}
			<div
				className="h-1.5 rounded-full bg-(--bg-tertiary) overflow-hidden"
				role="progressbar"
				aria-valuenow={pct}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={`Overall progress: ${pct}%`}
			>
				<div
					className="h-full rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-700"
					style={{ width: `${pct}%` }}
				/>
			</div>

			{/* Stats row */}
			<div className="grid grid-cols-2 sm:grid-cols-5 gap-y-3 gap-x-4 text-center">
				{stats.map((s) => (
					<div
						key={s.label}
						className="flex flex-col gap-0.5 "
					>
						<span className={`text-lg font-medium tabular-nums ${s.color}`}>
							{s.value}
						</span>
						<span className="text-[11px] text-(--text-secondary) uppercase tracking-wider">
							{s.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
