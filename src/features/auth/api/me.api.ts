import { API_URI, readApiResponse } from "../lib/authApi.shared";

export async function getMe(): Promise<{ userId: string } | null> {
	try {
		const response = await fetch(`${API_URI}/auth/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			return null;
		}

		const { data } = await readApiResponse<{ data: { userId: string } | null }>(
			response,
			"We couldn't verify your session.",
		);
		return data;
	} catch {
		throw new Error("internal auth me error");
	}
}
