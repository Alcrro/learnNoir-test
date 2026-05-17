import { API_URL } from "../../../libs/config";

type SubscriptionPlan = "free" | "pro";

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

export const subscriptionsApi = {
	getMyPlan: () =>
		get<{ data: { plan: SubscriptionPlan } }>("/subscriptions/me").then((r) => r.data),

	createCheckoutSession: (cancelPath: string) =>
		post<{ data: { url: string } }>("/subscriptions/create-checkout-session", {
			cancelPath,
		}).then((r) => r.data.url),
};
