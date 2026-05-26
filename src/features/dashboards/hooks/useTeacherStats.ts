import { useQuery } from "@tanstack/react-query";
import { teacherApi } from "../api/teacherApi";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";

export function useTeacherStats() {
	return useQuery({
		queryKey: dashboardQueryKeys.teacherStats,
		queryFn: teacherApi.getStats,
	});
}
