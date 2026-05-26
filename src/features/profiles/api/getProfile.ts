import { apiClient } from "../../../libs/apiClient";
import type { UserProfile } from "../types/UserProfile.type";

export async function getProfile(userId?: string): Promise<UserProfile> {
	if (!userId) {
		throw new Error("Missing user id for profile request");
	}
	const { data } = await apiClient.get<{ data: UserProfile }>(`/profiles/${userId}`);
	return data;
}
