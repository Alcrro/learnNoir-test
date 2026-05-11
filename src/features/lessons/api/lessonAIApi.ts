import { API_URL } from "../../../libs/config";

async function post<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

export type LessonReviewResult = {
	clarity: number;
	accuracy: string;
	completeness: string;
	suggestions: string[];
};

export type QuizQuestion = {
	question: string;
	options: [string, string, string, string];
	correctIndex: number;
	explanation: string;
};

export const lessonAIApi = {
	generate: (topic: string, field: "title" | "description" | "content") =>
		post<{ data: string }>("/lessons/ai/generate", { topic, field }).then((r) => r.data),

	improve: (text: string, context?: string) =>
		post<{ data: string }>("/lessons/ai/improve", { text, context }).then((r) => r.data),

	review: (lesson: { title: string; description: string; content: string }) =>
		post<{ data: LessonReviewResult }>("/lessons/ai/review", lesson).then((r) => r.data),

	generateQuiz: (content: string, count?: number) =>
		post<{ data: QuizQuestion[] }>("/lessons/ai/quiz", { content, count }).then((r) => r.data),
};
