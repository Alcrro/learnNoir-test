import { API_URI, readApiResponse } from "../lib/authApi.shared";

export const logout = async () => {
	try {
		const response = await fetch(`${API_URI}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error("Failed to logout");
		}

		return readApiResponse<Record<string, unknown> | null>(
			response,
			"Failed to logout",
		);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error(
			"An error occurred while trying to logout. Please try again later.",
		);
	}
};
