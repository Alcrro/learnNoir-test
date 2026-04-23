import { useState, useEffect } from "react";
import { API_URI } from "../features/auth/lib/authApi.shared";

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
