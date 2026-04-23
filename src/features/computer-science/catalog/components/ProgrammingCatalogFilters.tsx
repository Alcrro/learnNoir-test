import type { ProgrammingCatalogFilter } from "../types/catalog.types";
import { cn } from "../../../../libs/utils/cn";

type Props = {
	filters: ProgrammingCatalogFilter[];
	activeFilterKey: string;
	onSelect: (filterKey: string) => void;
};

const ProgrammingCatalogFilters = ({
	filters,
	activeFilterKey,
	onSelect,
}: Props) => {
	return (
		<div className="flex flex-wrap gap-3">
			{filters.map((filter) => {
				const isActive = filter.key === activeFilterKey;

				return (
					<button
						type="button"
						key={filter.key}
						onClick={() => onSelect(filter.key)}
						className={cn(
							"rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
							isActive
								? "border-(--border-strong) bg-(--bg-page) text-(--text-primary)"
								: "border-(--border) bg-(--bg-page) text-(--text-secondary) hover:border-(--border-strong) hover:text-(--text-primary)",
						)}
					>
						{filter.label}
					</button>
				);
			})}
		</div>
	);
};

export default ProgrammingCatalogFilters;
