import type { Subject } from "../../../subjects/data/subjects.data";
import SubjectCard from "../../../subjects/data/SubjectCard";

type CategoryMeta = {
	label: string;
	description: string;
	color: string;
	icon: string;
};

interface CategorySectionProps {
	categoryId: string;
	meta: CategoryMeta;
	items: Subject[];
}

export function CategorySection({ categoryId, meta, items }: CategorySectionProps) {
	return (
		<section aria-labelledby={`section-${categoryId}`}>
			<div className="flex items-center gap-3 mb-4">
				<h2
					id={`section-${categoryId}`}
					className="text-sm font-medium text-(--text-primary) whitespace-nowrap"
				>
					{meta.label}
				</h2>
				<span className="text-xs text-(--text-secondary) whitespace-nowrap">
					{items.length} subject{items.length !== 1 ? "s" : ""}
				</span>
				<div
					className="flex-1 h-px bg-(--border-strong) ml-4"
					aria-hidden="true"
				/>
				<p className="hidden sm:block text-xs text-(--text-secondary) whitespace-nowrap">
					{meta.description}
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{items.map((subject) => (
					<SubjectCard
						key={subject.id}
						subject={subject}
						categoryMeta={meta}
						navigateTo={`${categoryId}/${subject.id}`}
					/>
				))}
			</div>
		</section>
	);
}
