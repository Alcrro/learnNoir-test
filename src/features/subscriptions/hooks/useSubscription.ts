import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { subscriptionsApi } from "../api/subscriptionsApi";
import { useGetMe } from "../../auth/hooks/useAuth";

const SUBSCRIPTION_QUERY_KEY = ["subscription"] as const;

export function useSubscription() {
	const { data: me } = useGetMe();

	return useQuery({
		queryKey: SUBSCRIPTION_QUERY_KEY,
		queryFn: () => subscriptionsApi.getMyPlan(),
		enabled: !!me?.userId,
		staleTime: 5 * 60 * 1000,
	});
}

export function useIsPro(): boolean {
	const { data } = useSubscription();
	return data?.plan === "pro";
}

export function useCheckoutRedirect() {
	const { data: me } = useGetMe();
	const navigate = useNavigate();
	const location = useLocation();
	const qc = useQueryClient();
	const [isLoading, setIsLoading] = useState(false);

	const startCheckout = async () => {
		if (!me?.userId) {
			navigate("/auth/login", { state: { from: location.pathname } });
			return;
		}

		setIsLoading(true);
		try {
			const stripeUrl = await subscriptionsApi.createCheckoutSession(location.pathname);
			window.location.href = stripeUrl;
		} catch {
			setIsLoading(false);
		}
	};

	return { startCheckout, isLoading };
}
