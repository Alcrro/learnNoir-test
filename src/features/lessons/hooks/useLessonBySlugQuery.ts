import { useQuery } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";

// Fetches a single lesson by its URL slug. Used on the LessonPage.
export function useLessonBySlugQuery(slug: string) {
	return useQuery({
		queryKey: ["lesson-by-slug", slug],
		queryFn: () => lessonsApi.getBySlug(slug),
		staleTime: 10 * 60 * 1000,
		enabled: !!slug,
	});
}
