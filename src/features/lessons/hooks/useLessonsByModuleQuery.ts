import { useQuery } from "@tanstack/react-query";
import { lessonsApi, type ProgrammingLanguage } from "../api/lessonsApi";

// Fetches all lessons belonging to a module, optionally filtered by language.
export function useLessonsByModuleQuery(moduleSlug: string, language?: ProgrammingLanguage | null) {
	return useQuery({
		queryKey: ["lessons-by-module", moduleSlug, language ?? null],
		queryFn: () => lessonsApi.getByModuleSlug(moduleSlug, language),
		staleTime: 5 * 60 * 1000,
		enabled: !!moduleSlug,
	});
}
