import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../api/categoriesApi";

export function useCategoriesQuery(subjectSlug: string) {
	return useQuery({
		queryKey: ["categories", subjectSlug],
		queryFn: () => categoriesApi.getBySubject(subjectSlug),
		staleTime: 5 * 60 * 1000,
		enabled: !!subjectSlug,
	});
}
