export const authQueryKeys = {
	me: ["auth", "me"] as const,
	profile: (userId?: string) => ["profile", userId] as const,
};
