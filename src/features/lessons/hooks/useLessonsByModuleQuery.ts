import { useQuery } from "@tanstack/react-query";
import { lessonsApi, type ProgrammingLanguage } from "../api/lessonsApi";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useLessonsByModuleQuery(moduleSlug: string, language?: ProgrammingLanguage | null) {
	return useQuery({
		queryKey: lessonQueryKeys.byModule(moduleSlug, language ?? null),
		queryFn: () => lessonsApi.getByModuleSlug(moduleSlug, language),
		staleTime: 5 * 60 * 1000,
		enabled: !!moduleSlug,
	});
}
