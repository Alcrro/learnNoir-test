import { apiClient } from "../../../libs/apiClient";

type SubscriptionData = {
	pro: boolean;
	creator: boolean;
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

	createPortalSession: () =>
		apiClient.post<{ data: { url: string } }>("/subscriptions/create-portal-session", {}).then((r) => r.data.url),
};
