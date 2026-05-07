import { useQuery } from "@tanstack/react-query";
import { subjectsApi } from "../api/subjectsApi";

export function useSubjectsQuery() {
	return useQuery({
		queryKey: ["subjects"],
		queryFn: subjectsApi.getSubjects,
	});
}
