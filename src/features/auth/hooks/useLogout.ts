import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout.api";
import { authQueryKeys } from "../lib/authQueryKeys";

export const useLogout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => logout(),
		onSuccess: () => {
			queryClient.clear();
		},
	});
};
