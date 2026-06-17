import { useQuery } from "@tanstack/react-query";
import { subjectsApi } from "../api/subjectsApi";
import { subjectQueryKeys } from "../lib/subjectQueryKeys";
import { mapSubjectCardToSubjectDomain } from "../mapper/mapSubjectCardToSubjectDomain";

export function useSubjectsQuery() {
	return useQuery({
		queryKey: subjectQueryKeys.all,
		queryFn: subjectsApi.getSubjects,
		select: (data) => data.map(mapSubjectCardToSubjectDomain),
	});
}
