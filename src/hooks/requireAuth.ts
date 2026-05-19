import UseAuth from "./protectedRoute";

export async function requireAuth() {
	const { userId } = await UseAuth();

	if (!userId)
		throw new Response("You are not authorized to access this page.", {
			status: 401,
		});
	return null;
}
