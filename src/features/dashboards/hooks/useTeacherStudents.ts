import { useQuery } from "@tanstack/react-query";
import { teacherApi } from "../api/teacherApi";

export function useTeacherStudents() {
	return useQuery({
		queryKey: ["teacher", "students"],
		queryFn: teacherApi.getStudents,
	});
}
