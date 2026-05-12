import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "./useRegistration";
import { useRedirectCountdown } from "./useRedirectCountdown";

export function useRegisterPage() {
	const { mutateAsync, isPending, error, isSuccess } = useRegistration();
	const navigate = useNavigate();
	const [registeredEmail, setRegisteredEmail] = useState("");

	const redirectCountdown = useRedirectCountdown({
		enabled: isSuccess,
		seconds: 3,
		onComplete: () =>
			navigate("/auth/login", {
				replace: true,
				state: { justRegistered: true, registeredEmail },
			}),
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		await mutateAsync({ email, password });
		setRegisteredEmail(email);
	};

	return { handleSubmit, isPending, error, redirectCountdown, registeredEmail };
}
