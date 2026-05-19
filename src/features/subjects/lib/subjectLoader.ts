import { API_URL } from "../../../libs/config";

export async function subjectLoader() {
	const result = await fetch(`${API_URL}/subjects/stats`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	if (!result.ok) {
		throw new Response("Failed to load subjects", { status: result.status });
	}

	return result.json();
}
