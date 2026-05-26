import { useQuery } from "@tanstack/react-query";
import { modulesApi } from "../api/modulesApi";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";

export function useModules() {
	return useQuery({
		queryKey: dashboardQueryKeys.modules,
		queryFn: modulesApi.getAll,
		staleTime: 5 * 60 * 1000,
	});
}
