import React from "react";
import { useLogin } from "../hooks/useLogin";
import LoginForm from "./forms/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useRedirectCountdown } from "../hooks/useRedirectCountdown";

type AuthLocationState = {
	backgroundLocation?: {
		pathname: string;
		search?: string;
		hash?: string;
	};
	justRegistered?: boolean;
	registeredEmail?: string;
	redirectTo?: string;
};

type LoginProps = {
	variant?: "page" | "modal";
};

const Login = ({ variant = "page" }: LoginProps) => {
	const { mutateAsync, isPending, error, isSuccess } = useLogin();
	const navigate = useNavigate();
	const location = useLocation();
	const locationState = (location.state ?? null) as AuthLocationState | null;
	const backgroundLocation = locationState?.backgroundLocation;
	const redirectTarget = backgroundLocation
		? `${backgroundLocation.pathname}${backgroundLocation.search ?? ""}${backgroundLocation.hash ?? ""}`
		: (locationState?.redirectTo ?? "/dashboard");

	const redirectCountdown = useRedirectCountdown({
		enabled: isSuccess,
		seconds: 2,
		onComplete: () => {
			navigate(redirectTarget, { replace: true });
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		await mutateAsync({ email, password });
	};

	return (
		<div className="login_form">
			<LoginForm
				handleSubmit={handleSubmit}
				isPending={isPending}
				errorMessage={
					error
						? error instanceof Error
						? error.message
						: "An error occurred while trying to login. Please try again later."
						: null
				}
				infoMessage={
					locationState?.justRegistered
						? `Use ${locationState.registeredEmail ?? "your new account email"} to sign in.`
						: null
				}
				successCountdown={redirectCountdown}
				defaultEmail={locationState?.registeredEmail}
				variant={variant}
			/>
		</div>
	);
};
export default Login;
