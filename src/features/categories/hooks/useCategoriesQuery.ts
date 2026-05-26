import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../api/categoriesApi";
import { categoryQueryKeys } from "../lib/categoryQueryKeys";

export function useCategoriesQuery(subjectSlug: string) {
	return useQuery({
		queryKey: categoryQueryKeys.bySubject(subjectSlug),
		queryFn: () => categoriesApi.getBySubject(subjectSlug),
		staleTime: 5 * 60 * 1000,
		enabled: !!subjectSlug,
	});
}
