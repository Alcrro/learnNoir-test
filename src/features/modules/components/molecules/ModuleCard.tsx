import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { ModuleCard as ModuleCardType } from "../../../categories/api/categoriesApi";

interface ModuleCardProps {
	module: ModuleCardType;
	categorySlug: string;
	subjectSlug: string;
}

export function ModuleCard({ module, categorySlug, subjectSlug }: ModuleCardProps) {
	return (
		<Link
			to={`/subjects/${subjectSlug}/${categorySlug}/${module.slug}`}
			className="group block rounded-xl border border-(--border) bg-(--surface) p-5 transition-all hover:border-(--border-strong) hover:shadow-lg"
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-(--text-primary)">
						{module.name}
					</h3>
				</div>
				<div className="hidden rounded-full border border-(--border) p-2 text-(--text-muted) transition group-hover:border-(--border-strong) group-hover:text-(--text-primary) sm:block">
					<ArrowRight className="h-4 w-4" />
				</div>
			</div>

			<div className="mt-4 flex items-center gap-4 text-sm text-(--text-muted)">
				<div className="flex items-center gap-1.5">
					<BookOpen className="h-4 w-4" />
					<span>{module.lessonCount} lessons</span>
				</div>
				<div className="flex items-center gap-1.5">
					<Clock className="h-4 w-4" />
					<span>~{module.estimatedHours}h</span>
				</div>
			</div>
		</Link>
	);
}
