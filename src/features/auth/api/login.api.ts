import { LoginResponse, LoginError } from "../types/LoginTypes.type";

const API_URI = import.meta.env.VITE_API_URI || "http://localhost:3000";

export async function loginWithCredentials(
	email: string,
	password: string,
): Promise<LoginResponse | LoginError> {
	try {
		const response = await fetch(`${API_URI}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		console.log({ data });
		return data;
	} catch (error) {
		console.log("Login error: ", error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error(
			"An error occurred while trying to login. Please try again later.",
		);
	}
}
