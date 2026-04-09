import React, { FormEvent } from "react";
import RegisterForm from "./forms/RegisterForm";
import { useRegistration } from "../hooks/useRegistration";

const Register = () => {
	const { mutateAsync, data, isPending, error } = useRegistration();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		await mutateAsync({ email, password });
	};
	return (
		<div>
			<h2 className="text-3xl text-center">Register</h2>
			<RegisterForm
				handleSubmit={handleSubmit}
				data={data}
				isPending={isPending}
				error={error}
			/>
		</div>
	);
};

export default Register;
