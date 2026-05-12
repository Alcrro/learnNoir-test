import type { SubjectDomain } from "../../../../types/types";
import { SubjectOverviewCard } from "./SubjectOverviewCard";

type Props = {
	subjects: SubjectDomain[];
};

export function FeaturedSubjectsSection({ subjects }: Props) {
	if (subjects.length === 0) return null;

	return (
		<section className="rounded-3xl border border-(--border) bg-(--bg-card) p-5 shadow-sm">
			<div className="mb-4 flex items-center justify-between gap-3">
				<div>
					<h2 className="text-lg font-semibold text-(--text-primary)">Featured subjects</h2>
					<p className="text-sm text-(--text-secondary)">
						Best entry points if you want to start from the current active curriculum.
					</p>
				</div>
				<p className="text-sm text-(--text-secondary)">{subjects.length} highlighted</p>
			</div>
			<div className="grid gap-4 lg:grid-cols-2">
				{subjects.map((subject) => (
					<SubjectOverviewCard key={`featured-${subject.id}`} subject={subject} />
				))}
			</div>
		</section>
	);
}
