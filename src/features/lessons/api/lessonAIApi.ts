import { apiClient } from "../../../libs/apiClient";

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
		apiClient.post<{ data: string }>("/lessons/ai/generate", { topic, field }).then((r) => r.data),

	improve: (text: string, context?: string) =>
		apiClient.post<{ data: string }>("/lessons/ai/improve", { text, context }).then((r) => r.data),

	review: (lesson: { title: string; description: string; content: string }) =>
		apiClient.post<{ data: LessonReviewResult }>("/lessons/ai/review", lesson).then((r) => r.data),

	generateQuiz: (content: string, count?: number) =>
		apiClient.post<{ data: QuizQuestion[] }>("/lessons/ai/quiz", { content, count }).then((r) => r.data),

	generateBlocks: (text: string) =>
		apiClient.post<{ data: { nodes?: unknown[]; [k: string]: unknown } }>("/lessons/ai/blocks", { topic: text })
			.then((r) => {
				const raw = r.data;
				if (Array.isArray(raw)) return raw as Record<string, unknown>[];
				if (Array.isArray((raw as Record<string, unknown[]>).nodes)) return (raw as Record<string, unknown[]>).nodes;
				return [] as Record<string, unknown>[];
			}),
};
