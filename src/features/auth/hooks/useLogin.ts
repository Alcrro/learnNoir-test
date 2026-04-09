import { useMutation } from "@tanstack/react-query";
import { loginWithCredentials } from "../api/login.api";

export const useLogin = () => {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			loginWithCredentials(email, password),
	});
};
