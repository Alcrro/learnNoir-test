import { apiClient } from "../../../libs/apiClient";

export const forgotPasswordApi = {
	send: (email: string) => apiClient.post("/auth/forgot-password", { email }),
};
