import { Navigate } from "react-router-dom";
import { useGetMe } from "../hooks/useAuth";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
	const { data: user } = useGetMe();

	if (user)
		return (
			<Navigate
				to="/"
				replace
			/>
		);

	return children;
};

export default GuestGuard;
