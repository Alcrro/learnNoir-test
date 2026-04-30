import React from "react";
import {
	SUBJECT_CATALOG_MAPPER,
	SubjectCatalogStatsProps,
} from "../../../features/subjects/data/subjectCalatokStatsMapper";

const SubjectCatalogStatItem = ({
	statsMapper,
}: {
	statsMapper: SubjectCatalogStatsProps;
}) => {
	const stats = SUBJECT_CATALOG_MAPPER(statsMapper);
	return (
		<div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{stats.map((item) => (
				<div
					key={item.label}
					className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-4"
				>
					<p className={`text-2xl font-semibold ${item.tone}`}>{item.value}</p>
					<p className="mt-1 text-xs text-(--text-secondary)">{item.label}</p>
				</div>
			))}
		</div>
	);
};

export default SubjectCatalogStatItem;
