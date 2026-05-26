import { useQuery } from "@tanstack/react-query";
import { subjectsApi } from "../api/subjectsApi";
import { subjectQueryKeys } from "../lib/subjectQueryKeys";

export function useSubjectsQuery() {
	return useQuery({
		queryKey: subjectQueryKeys.all,
		queryFn: subjectsApi.getSubjects,
	});
}
