import { useMutation } from "@tanstack/react-query";
import { registration } from "../api/registration.api";

export const useRegistration = () => {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			registration(email, password),
	});
};
