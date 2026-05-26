import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../api/categoriesApi";
import { mapCatalogToSubjects } from "../lib/mapCatalogToSubjects";
import { categoryQueryKeys } from "../lib/categoryQueryKeys";

export function useCatalogSubjectsQuery(subjectSlug: string) {
	return useQuery({
		queryKey: categoryQueryKeys.catalogSubjects(subjectSlug),
		queryFn: () =>
			categoriesApi.getBySubject(subjectSlug).then(mapCatalogToSubjects),
		staleTime: 5 * 60 * 1000,
		enabled: !!subjectSlug,
	});
}
