import { API_URL } from "./config";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json", ...init?.headers },
		...init,
	});

	if (!res.ok) {
		const body = await res.json().catch(() => null) as { error?: string } | null;
		throw new Error(body?.error ?? `HTTP ${res.status}`);
	}

	return res.json() as Promise<T>;
}

export const apiClient = {
	get: <T>(path: string) => request<T>(path),
	post: <T>(path: string, body: unknown) =>
		request<T>(path, { method: "POST", body: JSON.stringify(body) }),
	put: <T>(path: string, body: unknown) =>
		request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
	patch: <T>(path: string, body?: unknown) =>
		request<T>(path, {
			method: "PATCH",
			body: body !== undefined ? JSON.stringify(body) : undefined,
		}),
	delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
