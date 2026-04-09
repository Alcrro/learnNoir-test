import { useLogout } from "../../hooks/useLogout";
import DefaultButton from "../../../../components/atoms/DefaultButton";

const LogoutForm = () => {
	const { mutateAsync, data, isPending, isError } = useLogout();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Implement logout logic here, such as clearing tokens, updating state, etc.
		await mutateAsync();
	};

	return (
		<form onSubmit={handleSubmit}>
			<DefaultButton
				variant="destructive"
				type="submit"
				size="sm"
				disabled={isPending}
				className="rounded-md"
			>
				Logout
			</DefaultButton>
			{isError && (
				<p className="text-red-500 text-sm">
					An error occurred while trying to logout. Please try again later.
				</p>
			)}
			{data && (
				<p className="text-green-500 text-sm text-center">Logout successful!</p>
			)}
		</form>
	);
};

export default LogoutForm;
