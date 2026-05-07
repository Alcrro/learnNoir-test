const BASE =
	(import.meta.env["VITE_API_URI"] as string | undefined) ?? "http://localhost:3000/api";

type ProgressPayload = {
	status?: "not_started" | "in_progress" | "completed";
	quizScore?: number;
	readScore?: number;
	outputScore?: number;
};

export async function patchLessonProgress(
	lessonId: string,
	payload: ProgressPayload,
): Promise<void> {
	await fetch(`${BASE}/progress/lesson/${lessonId}`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	}).catch(() => {});
}
