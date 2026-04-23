import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registration } from "../api/registration.api";
import { authQueryKeys } from "../lib/authQueryKeys";

export const useRegistration = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			registration(email, password),
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
