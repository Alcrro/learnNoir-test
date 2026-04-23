import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/me.api";
import { authQueryKeys } from "../lib/authQueryKeys";

export function useGetMe() {
	return useQuery({
		queryKey: authQueryKeys.me,
		queryFn: () => getMe(),
		retry: false,

		staleTime: 1000 * 60 * 10,

		refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to keep profile data fresh

		refetchOnMount: true, // Refetch when the component mounts to ensure we have the latest profile data
		refetchOnWindowFocus: false,
	});
}
