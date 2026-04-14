import DefaultButton from "../../../../components/atoms/DefaultButton";
import EmailFormGroup from "../../../../components/molecules/forms/EmailFormGroup";
import PasswordFormGroup from "../../../../components/molecules/PasswordFormGroup";
import { LoginError, LoginResponse } from "../../types/LoginTypes.type";

type LoginProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	data: LoginResponse | LoginError | undefined;
	isPending: boolean;
	error: Error | null;
};
const LoginForm = ({ handleSubmit, data, isPending, error }: LoginProps) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 mt-4"
		>
			<div className="form_group flex flex-col gap-2">
				<EmailFormGroup />
			</div>
			<div className="form_group flex flex-col gap-2">
				<PasswordFormGroup />
			</div>
			<DefaultButton
				variant="primary"
				type="submit"
				disabled={isPending}
			>
				Login
			</DefaultButton>
			{error && (
				<p className="text-red-500 text-sm">
					{error instanceof Error
						? error.message
						: "An error occurred while trying to login. Please try again later."}
				</p>
			)}
			{data && (
				<p className="text-green-500 text-sm text-center">Login successful!</p>
			)}
		</form>
	);
};

export default LoginForm;
