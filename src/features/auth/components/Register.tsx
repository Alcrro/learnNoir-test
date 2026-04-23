import React, { FormEvent } from "react";
import RegisterForm from "./forms/RegisterForm";
import { useRegistration } from "../hooks/useRegistration";
import { useNavigate } from "react-router-dom";
import { useRedirectCountdown } from "../hooks/useRedirectCountdown";

const Register = () => {
	const { mutateAsync, isPending, error, isSuccess } = useRegistration();
	const navigate = useNavigate();
	const [registeredEmail, setRegisteredEmail] = React.useState("");

	const redirectCountdown = useRedirectCountdown({
		enabled: isSuccess,
		seconds: 3,
		onComplete: () => {
			navigate("/auth/login", {
				replace: true,
				state: {
					justRegistered: true,
					registeredEmail,
				},
			});
		},
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		await mutateAsync({ email, password });
		setRegisteredEmail(email);
	};
	return (
		<div>
			<RegisterForm
				handleSubmit={handleSubmit}
				isPending={isPending}
				errorMessage={
					error
						? error instanceof Error
						? error.message
						: "An error occurred while trying to register. Please try again later."
						: null
				}
				successCountdown={redirectCountdown}
				defaultEmail={registeredEmail}
			/>
		</div>
	);
};

export default Register;
