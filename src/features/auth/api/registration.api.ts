import { API_URI, readApiResponse } from "../lib/authApi.shared";
import { RegistrationResponse } from "../types/LoginTypes.type";

export async function registration(email: string, password: string) {
	try {
		const response = await fetch(`${API_URI}/auth/registration`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});

		return readApiResponse<RegistrationResponse>(
			response,
			"We couldn't create your account right now. Please try again.",
		);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("internal Error");
	}
}
