import type { UserProfile } from "../types/UserProfile.type";

import { API_URL as VITE_API_URI } from "../../../libs/config";

export async function getProfile(userId?: string): Promise<UserProfile> {
	if (!userId) {
		throw new Error("Missing user id for profile request");
	}

	const response = await fetch(`${VITE_API_URI}/profiles/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	const { data } = await response.json();

	return data;
}
