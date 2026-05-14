import { SubjectCatalogStats } from "../../lib/buildSubjectsCatalogStats";
import ProgressBar from "../molecules/SubjectProgressBar";
import SubjectCatalogStatItem from "../molecules/SubjectCatalogStatItem";

type SubjectsCatalogStatsProps = {
	stats: SubjectCatalogStats;
};

export function SubjectsCatalogStats({ stats }: SubjectsCatalogStatsProps) {
	return (
		<section className="rounded-3xl border border-(--border) bg-(--bg-card) p-5 shadow-sm">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-(--text-primary)">
						Catalog progress
					</p>
					<p className="text-xs text-(--text-secondary)">
						Overall completion across all planned subject modules
					</p>
				</div>

				<p className="text-sm font-semibold text-(--blue-text)">
					{stats.completionRate}%
				</p>
			</div>

			<ProgressBar
				progress={stats.completionRate}
				className="mt-4"
				accent={{ progress: "bg-(--blue)" }}
				ariaLabel={`Catalog completion ${stats.completionRate}%`}
			/>

			<SubjectCatalogStatItem statsMapper={stats} />
		</section>
	);
}
