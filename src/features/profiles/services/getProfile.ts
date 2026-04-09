import type { UserProfile } from "../types/UserProfile.type";

const VITE_API_URI =
	import.meta.env.VITE_API_URI || "http://localhost:3000/api";

export async function getProfile(userId?: string): Promise<UserProfile> {
	const response = await fetch(`${VITE_API_URI}/profiles/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	const { data } = await response.json();
	console.log("profile ", data);

	return data;
}
