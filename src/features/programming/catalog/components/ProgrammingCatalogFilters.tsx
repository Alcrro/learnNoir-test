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
								? "border-[#3E3E3E] bg-[#262626] text-white"
								: "border-[#343434] bg-[#171717] text-[#BFBFBF] hover:border-[#4A4A4A] hover:text-white",
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
