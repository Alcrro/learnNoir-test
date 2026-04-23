import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithCredentials } from "../api/login.api";
import { authQueryKeys } from "../lib/authQueryKeys";

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			loginWithCredentials(email, password),
		onSuccess: async (data) => {
			if (data.userId) {
				queryClient.setQueryData(authQueryKeys.me, { userId: data.userId });
			}

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: authQueryKeys.me }),
				queryClient.invalidateQueries({ queryKey: ["profile"] }),
			]);
		},
	});
};
