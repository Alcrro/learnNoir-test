import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProgrammingCatalogFilters from "./ProgrammingCatalogFilters";
import ProgrammingCatalogSection from "./ProgrammingCatalogSection";
import ProgrammingCatalogSkeleton from "./ProgrammingCatalogSkeleton";
import { useProgrammingCatalogQuery } from "../hooks/useProgrammingCatalogQuery";
import {
	buildProgrammingFilters,
	filterProgrammingLessons,
	groupProgrammingLessons,
} from "../lib/catalogUtils";
import type { ProgrammingCategory } from "../types/catalog.types";

function isProgrammingCategory(value: string | undefined): value is ProgrammingCategory {
	return value === "algorithms" || value === "data-structures";
}

const ProgrammingCatalogContent = ({
	category,
}: {
	category: ProgrammingCategory;
}) => {
	const [activeFilterKey, setActiveFilterKey] = useState("all");
	const { data, isPending } = useProgrammingCatalogQuery(category);

	const filters = useMemo(
		() => buildProgrammingFilters(data?.lessons ?? []),
		[data?.lessons],
	);

	const sections = useMemo(() => {
		const filteredLessons = filterProgrammingLessons(
			data?.lessons ?? [],
			activeFilterKey,
		);
		return groupProgrammingLessons(filteredLessons);
	}, [activeFilterKey, data?.lessons]);

	if (isPending) {
		return <ProgrammingCatalogSkeleton />;
	}

	if (!data || data.lessons.length === 0) {
		return (
			<div className="rounded-2xl border border-[#343434] bg-[#1C1C1C] p-8 text-[#B8B8B8]">
				Nu exista lectii disponibile momentan pentru aceasta categorie.
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<ProgrammingCatalogFilters
				filters={filters}
				activeFilterKey={activeFilterKey}
				onSelect={setActiveFilterKey}
			/>

			<div className="space-y-12">
				{sections.map((section) => (
					<ProgrammingCatalogSection
						key={section.group}
						section={section}
					/>
				))}
			</div>
		</div>
	);
};

const ProgrammingCatalogPage = () => {
	const { category } = useParams();

	if (!isProgrammingCategory(category)) return null;

	return (
		<div className="space-y-8 rounded-[28px] bg-[#151515] p-4 md:p-6">
			<ProgrammingCatalogContent
				key={category}
				category={category}
			/>
		</div>
	);
};

export default ProgrammingCatalogPage;
