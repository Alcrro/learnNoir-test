import { queryClient } from "../libs/queryClient";
import { authQueryKeys } from "../features/auth/lib/authQueryKeys";
import { getMe } from "../features/auth/api/me.api";

export async function requireAuth() {
	const user = await queryClient.ensureQueryData({
		queryKey: authQueryKeys.me,
		queryFn: getMe,
		staleTime: 10 * 60 * 1000,
	});

	if (!user?.userId)
		throw new Response("You are not authorized to access this page.", {
			status: 401,
		});
	return null;
}
