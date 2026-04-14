const API_URI = import.meta.env.VITE_API_URI || "http://localhost:3000/api";
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

		const { data } = await response.json();
		console.log("mere", { data });

		return data;
	} catch (error) {
		console.log(error);

		throw new Error("internal auth me error");
	}
}
