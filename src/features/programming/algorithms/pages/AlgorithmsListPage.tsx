import { useParams } from "react-router-dom";
import ProgrammingCatalogPage from "../../catalog/components/ProgrammingCatalogPage";
import { ProgrammingCategory } from "../../catalog/types/catalog.types";
import StatsGrid from "../components/algorithmListPage/StatsGrid";
import { useProgrammingCatalogQuery } from "../../catalog/hooks/useProgrammingCatalogQuery";

function isProgrammingCategory(
	value: string | undefined,
): value is ProgrammingCategory {
	return value === "algorithms" || value === "data-structures";
}

const AlgorithmsListPage = () => {
	const { category } = useParams<{ category: ProgrammingCategory }>();
	const { data } = useProgrammingCatalogQuery(category || "data-structures");

	if (!category) return null;
	if (!isProgrammingCategory(category)) return null;

	return (
		<div className="flex flex-col gap-4">
			<StatsGrid algorithms={data?.lessons ?? []} />
			<ProgrammingCatalogPage />;
		</div>
	);
};

export default AlgorithmsListPage;
