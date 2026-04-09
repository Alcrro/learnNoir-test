const API_URI = import.meta.env.VITE_API_URI || "http://localhost:3000/api";
export async function registration(email: string, password: string) {
	try {
		const response = await fetch(`${API_URI}/auth/registration`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("internal Error");
	}
}
