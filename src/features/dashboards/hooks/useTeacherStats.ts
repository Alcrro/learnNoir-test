import { useQuery } from "@tanstack/react-query";
import { teacherApi } from "../api/teacherApi";

export function useTeacherStats() {
	return useQuery({
		queryKey: ["teacher", "stats"],
		queryFn: teacherApi.getStats,
	});
}
