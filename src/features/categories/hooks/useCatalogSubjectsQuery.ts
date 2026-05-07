import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../api/categoriesApi";
import { mapCatalogToSubjects } from "../utils/mapCatalogToSubjects";

export function useCatalogSubjectsQuery(subjectSlug: string) {
	return useQuery({
		queryKey: ["catalog-subjects", subjectSlug],
		queryFn: () =>
			categoriesApi.getBySubject(subjectSlug).then(mapCatalogToSubjects),
		staleTime: 5 * 60 * 1000,
		enabled: !!subjectSlug,
	});
}
