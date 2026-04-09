import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/me.api";

export function useGetMe() {
	return useQuery({
		queryKey: ["geMe"],
		queryFn: () => getMe(),

		staleTime: 1000 * 60 * 10,

		refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to keep profile data fresh

		refetchOnMount: false, // Refetch when the component mounts to ensure we have the latest profile data
		refetchOnWindowFocus: false,
	});
}
