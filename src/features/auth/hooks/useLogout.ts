import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout.api";
import { authQueryKeys } from "../lib/authQueryKeys";

export const useLogout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => logout(),
		onSuccess: () => {
			queryClient.setQueryData(authQueryKeys.me, null);
			queryClient.setQueriesData({ queryKey: ["profile"] }, null);
			queryClient.invalidateQueries({ queryKey: authQueryKeys.me });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});
};
