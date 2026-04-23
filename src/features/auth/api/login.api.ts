import { API_URI, readApiResponse } from "../lib/authApi.shared";
import { LoginResponse } from "../types/LoginTypes.type";

export async function loginWithCredentials(
	email: string,
	password: string,
): Promise<LoginResponse> {
	try {
		const response = await fetch(`${API_URI}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});

		return readApiResponse<LoginResponse>(
			response,
			"Invalid email or password. Please try again.",
		);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error(
			"An error occurred while trying to login. Please try again later.",
		);
	}
}
