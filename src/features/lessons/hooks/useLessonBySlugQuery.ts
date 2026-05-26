import { useQuery } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useLessonBySlugQuery(slug: string) {
	return useQuery({
		queryKey: lessonQueryKeys.bySlug(slug),
		queryFn: () => lessonsApi.getBySlug(slug),
		staleTime: 10 * 60 * 1000,
		enabled: !!slug,
	});
}
