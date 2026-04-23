import type { SubjectCatalogStats } from "../../../libs/utils/subjectsCatalog.utils";

type SubjectsCatalogStatsProps = {
	stats: SubjectCatalogStats;
};

export function SubjectsCatalogStats({ stats }: SubjectsCatalogStatsProps) {
	const items = [
		{
			label: "Available now",
			value: stats.availableSubjects,
			tone: "text-[var(--teal-text)]",
		},
		{
			label: "Coming soon",
			value: stats.comingSoonSubjects,
			tone: "text-[var(--amber-text)]",
		},
		{
			label: "Lessons mapped",
			value: stats.totalLessons,
			tone: "text-[var(--text-primary)]",
		},
		{
			label: "Estimated hours",
			value: `~${stats.totalHours}h`,
			tone: "text-[var(--text-primary)]",
		},
	];

	return (
		<section className="rounded-[24px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-[var(--text-primary)]">Catalog progress</p>
					<p className="text-xs text-[var(--text-secondary)]">
						Overall completion across all planned subject modules
					</p>
				</div>

				<p className="text-sm font-semibold text-[var(--blue-text)]">
					{stats.completionRate}%
				</p>
			</div>

			<div
				className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]"
				role="progressbar"
				aria-valuenow={stats.completionRate}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={`Catalog completion ${stats.completionRate}%`}
			>
				<div
					className="h-full rounded-full bg-[var(--blue)] transition-all duration-500"
					style={{ width: `${stats.completionRate}%` }}
				/>
			</div>

			<div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{items.map((item) => (
					<div
						key={item.label}
						className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4"
					>
						<p className={`text-2xl font-semibold ${item.tone}`}>{item.value}</p>
						<p className="mt-1 text-xs text-[var(--text-secondary)]">{item.label}</p>
					</div>
				))}
			</div>
		</section>
	);
}
