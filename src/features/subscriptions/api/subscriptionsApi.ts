import { apiClient } from "../../../libs/apiClient";

type SubscriptionPlan = "free" | "pro";

type SubscriptionData = {
	plan: SubscriptionPlan;
	creator?: boolean;
};

export const subscriptionsApi = {
	getMyPlan: () =>
		apiClient.get<{ data: SubscriptionData }>("/subscriptions/me").then((r) => r.data),

	createCheckoutSession: (cancelPath: string) =>
		apiClient.post<{ data: { url: string } }>("/subscriptions/create-checkout-session", {
			cancelPath,
		}).then((r) => r.data.url),

	createCreatorCheckoutSession: () =>
		apiClient.post<{ data: { url: string } }>("/subscriptions/create-checkout-session-creator", {}).then((r) => r.data.url),
};
