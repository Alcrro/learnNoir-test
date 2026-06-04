import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { subscriptionsApi } from "../api/subscriptionsApi";
import { useGetMe } from "../../auth/hooks/useAuth";

export function useUpgradeToCreator() {
	const { data: me } = useGetMe();
	const navigate = useNavigate();
	const location = useLocation();

	return useMutation({
		mutationFn: async () => {
			if (!me?.userId) {
				navigate("/auth/login", { state: { from: location.pathname } });
				return null;
			}
			return subscriptionsApi.createCreatorCheckoutSession();
		},
		onSuccess: (url) => {
			if (url) window.location.href = url;
		},
	});
}
