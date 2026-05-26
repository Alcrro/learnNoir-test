import { useQuery } from "@tanstack/react-query";
import { getProgrammingCatalog } from "../api/getProgrammingCatalog";
import type { ProgrammingCategory } from "../types/catalog.types";
import { catalogQueryKeys } from "../lib/catalogQueryKeys";

export function useProgrammingCatalogQuery(category: ProgrammingCategory) {
	return useQuery({
		queryKey: catalogQueryKeys.programming(category),
		queryFn: () => getProgrammingCatalog(category),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
}
