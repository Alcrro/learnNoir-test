import { API_URI } from "../features/auth/lib/authApi.shared";

const protectedRoute = async () => {
	const response = await fetch(`${API_URI}/auth/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	const { data } = await response.json();

	if (!data || !data.userId) {
		return { userId: null };
	}

	return {
		userId: data.userId,
	};
};

export default protectedRoute;
