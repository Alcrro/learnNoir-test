import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";
import { useRedirectCountdown } from "./useRedirectCountdown";
import { resolveRedirectTarget } from "../lib/authRedirect";
import type { AuthLocationState } from "../types/LoginTypes.type";

export function useLoginPage() {
	const { mutateAsync, isPending, error, isSuccess } = useLogin();
	const navigate = useNavigate();
	const location = useLocation();

	const locationState = (location.state ?? null) as AuthLocationState | null;
	const redirectTarget = resolveRedirectTarget(locationState);

	const redirectCountdown = useRedirectCountdown({
		enabled: isSuccess,
		seconds: 2,
		onComplete: () => navigate(redirectTarget, { replace: true }),
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await mutateAsync({
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		});
	};

	return { handleSubmit, isPending, error, redirectCountdown, locationState };
}
