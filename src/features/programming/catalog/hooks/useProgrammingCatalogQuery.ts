import { useQuery } from "@tanstack/react-query";
import { getProgrammingCatalog } from "../api/getProgrammingCatalog";
import type { ProgrammingCategory } from "../types/catalog.types";

export function useProgrammingCatalogQuery(category: ProgrammingCategory) {
	return useQuery({
		queryKey: ["programming-catalog", category],
		queryFn: () => getProgrammingCatalog(category),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
}
