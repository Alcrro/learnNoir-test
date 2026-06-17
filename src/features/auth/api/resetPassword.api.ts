import { apiClient } from "../../../libs/apiClient";

export const resetPasswordApi = {
	reset: (code: string, newPassword: string) =>
		apiClient.post("/auth/reset-password", { code, newPassword }),
};
