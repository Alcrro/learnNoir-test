import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "../../auth/hooks/useAuth";
import { subscriptionsApi } from "../api/subscriptionsApi";
import { subscriptionQueryKeys } from "../lib/subscriptionQueryKeys";

export function useSubscription() {
	const { data: me } = useGetMe();

	return useQuery({
		queryKey: subscriptionQueryKeys.myPlan,
		queryFn: () => subscriptionsApi.getMyPlan(),
		enabled: !!me?.userId,
		staleTime: 5 * 60 * 1000,
	});
}
