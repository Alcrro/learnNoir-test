import { useQuery } from "@tanstack/react-query";
import { modulesApi } from "../api/modulesApi";

export function useModules() {
	return useQuery({
		queryKey: ["modules"],
		queryFn: modulesApi.getAll,
		staleTime: 5 * 60 * 1000,
	});
}
