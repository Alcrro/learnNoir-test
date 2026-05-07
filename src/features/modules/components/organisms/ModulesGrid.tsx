import type { ModuleCard as ModuleCardType } from "../../../categories/api/categoriesApi";
import { ModuleCard } from "../molecules/ModuleCard";

interface ModulesGridProps {
	modules: ModuleCardType[];
	categorySlug: string;
	subjectSlug: string;
}

export function ModulesGrid({ modules, categorySlug, subjectSlug }: ModulesGridProps) {
	return (
		<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{modules.map((module) => (
				<ModuleCard
					key={module.id}
					module={module}
					categorySlug={categorySlug}
					subjectSlug={subjectSlug}
				/>
			))}
		</div>
	);
}
