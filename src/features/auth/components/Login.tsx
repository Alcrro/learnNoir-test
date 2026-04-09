import React from "react";
import { useLogin } from "../hooks/useLogin";
import LoginForm from "./forms/LoginForm";
import { Navigate } from "react-router-dom";

const Login = () => {
	const { mutateAsync, data, isPending, error, isSuccess } = useLogin();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		await mutateAsync({ email, password });
	};

	if (isSuccess) return <Navigate to={"/dashboard"} />;

	return (
		<div className="login_form">
			<h2 className="text-3xl text-center">Login</h2>
			<LoginForm
				handleSubmit={handleSubmit}
				data={data}
				isPending={isPending}
				error={error}
			/>
		</div>
	);
};
export default Login;
