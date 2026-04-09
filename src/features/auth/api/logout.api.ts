const API_URI = import.meta.env.VITE_API_URI || "http://localhost:3000";

export const logout = async () => {
	try {
		const response = await fetch(`${API_URI}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error("Failed to logout");
		}

		const data = await response.json();
		return data ?? null;
	} catch (error) {
		console.log("Logout error: ", error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error(
			"An error occurred while trying to logout. Please try again later.",
		);
	}
};
