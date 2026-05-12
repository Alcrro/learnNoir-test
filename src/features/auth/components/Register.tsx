import RegisterForm from "./forms/RegisterForm";
import { useRegisterPage } from "../hooks/useRegisterPage";

const Register = () => {
	const { handleSubmit, isPending, error, redirectCountdown, registeredEmail } = useRegisterPage();

	return (
		<RegisterForm
			handleSubmit={handleSubmit}
			isPending={isPending}
			errorMessage={
				error instanceof Error
					? error.message
					: error
						? "An error occurred while trying to register. Please try again later."
						: null
			}
			successCountdown={redirectCountdown}
			defaultEmail={registeredEmail}
		/>
	);
};

export default Register;
