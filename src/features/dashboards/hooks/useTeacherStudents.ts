import { useQuery } from "@tanstack/react-query";
import { teacherApi } from "../api/teacherApi";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";

export function useTeacherStudents() {
	return useQuery({
		queryKey: dashboardQueryKeys.teacherStudents,
		queryFn: teacherApi.getStudents,
	});
}
