import { useState } from "react";
import { subscriptionsApi } from "../api/subscriptionsApi";

export function useManageSubscription() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const openPortal = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const url = await subscriptionsApi.createPortalSession();
			window.location.href = url;
		} catch {
			setIsLoading(false);
			setError("Could not open subscription portal. Please try again.");
		}
	};

	return { openPortal, isLoading, error };
}
