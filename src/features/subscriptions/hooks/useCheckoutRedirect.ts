import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { subscriptionsApi } from "../api/subscriptionsApi";
import { useGetMe } from "../../auth/hooks/useAuth";

export function useCheckoutRedirect() {
	const { data: me } = useGetMe();
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(false);
	const [checkoutError, setCheckoutError] = useState<string | null>(null);

	const startCheckout = async () => {
		if (!me?.userId) {
			navigate("/auth/login", { state: { from: location.pathname } });
			return;
		}

		setIsLoading(true);
		setCheckoutError(null);
		try {
			const stripeUrl = await subscriptionsApi.createCheckoutSession(location.pathname);
			window.location.href = stripeUrl;
		} catch {
			setIsLoading(false);
			setCheckoutError("Could not start checkout. Please try again.");
		}
	};

	return { startCheckout, isLoading, checkoutError };
}
