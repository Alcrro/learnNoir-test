const API_URL =
	(import.meta.env["VITE_API_URI"] as string | undefined) ?? "http://localhost:3000/api";

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

// The three block types that can appear in a lesson, discriminated by `type`.
export type ContentBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "content";
	data: { content: Record<string, unknown>[] };
};

export type InteractiveBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "interactive";
	// e.g. "algorithm:bubble-sort", "math:formula"
	engine: string;
	data: Record<string, unknown>;
};

export type AssessmentBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "assessment";
	// e.g. "quiz:mcq", "quiz:input", "quiz:code"
	engine: string;
	data: Record<string, unknown>;
};

export type LessonBlock = ContentBlock | InteractiveBlock | AssessmentBlock;

export const lessonBlocksApi = {
	// GET /lessons-block/lesson/:lessonId — all blocks for a lesson, sorted by position.
	getByLessonId: (lessonId: string) =>
		get<{ success: boolean; data: LessonBlock[] }>(
			`/lessons-block/lesson/${lessonId}`,
		).then((r) => r.data),
};
