import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout.api";

export const useLogout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => logout(),
		onError: (error) => {
			console.error("Logout failed: ", error);
			// Optionally, you can show a notification to the user about the error
		},
		onSuccess: () => {
			console.log("Logout successful");
			queryClient.setQueriesData({ queryKey: ["profile"] }, null);
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});
};
