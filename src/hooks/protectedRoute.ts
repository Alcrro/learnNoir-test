const protectedRoute = async () => {
	const response = await fetch("http://localhost:3000/api/auth/me", {
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
