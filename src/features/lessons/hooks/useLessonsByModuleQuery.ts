import { useQuery } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";

// Fetches all lessons belonging to a module. Enabled only when moduleSlug is non-empty.
export function useLessonsByModuleQuery(moduleSlug: string) {
	return useQuery({
		queryKey: ["lessons-by-module", moduleSlug],
		queryFn: () => lessonsApi.getByModuleSlug(moduleSlug),
		staleTime: 5 * 60 * 1000,
		enabled: !!moduleSlug,
	});
}
