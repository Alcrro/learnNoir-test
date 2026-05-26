import { apiClient } from "../../../libs/apiClient";

type SubscriptionPlan = "free" | "pro";

export const subscriptionsApi = {
	getMyPlan: () =>
		apiClient.get<{ data: { plan: SubscriptionPlan } }>("/subscriptions/me").then((r) => r.data),

	createCheckoutSession: (cancelPath: string) =>
		apiClient.post<{ data: { url: string } }>("/subscriptions/create-checkout-session", {
			cancelPath,
		}).then((r) => r.data.url),
};
