import { useState, useEffect } from "react";

const API_URI = import.meta.env.VITE_API_URI ?? "http://localhost:3000/api";

const useAuth = () => {
	const [user, setUser] = useState<{ userId: string } | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`${API_URI}/auth/me`, {
					credentials: "include",
				});

				if (!response.ok) {
					setUser(null);
					return;
				}

				const { data } = await response.json();
				setUser(data); // ✅ păstrezi obiectul
			} catch {
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, []);

	return { user, isLoading };
};

export default useAuth;
