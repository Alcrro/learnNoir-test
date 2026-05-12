import LoginForm from "./forms/LoginForm";
import { useLoginPage } from "../hooks/useLoginPage";

type Props = {
	variant?: "page" | "modal";
};

const Login = ({ variant = "page" }: Props) => {
	const { handleSubmit, isPending, error, redirectCountdown, locationState } = useLoginPage();

	return (
		<LoginForm
			handleSubmit={handleSubmit}
			isPending={isPending}
			errorMessage={
				error instanceof Error
					? error.message
					: error
						? "An error occurred while trying to login. Please try again later."
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
	);
};

export default Login;
