import { apiClient } from "../../../libs/apiClient";

export type FeedbackVote = "up" | "down";

export type FeedbackCounts = {
	upvotes: number;
	downvotes: number;
	myVote: FeedbackVote | null;
};

export type FeedbackOption = {
	id: string;
	componentType: string;
	label: string;
	position: number;
};

function base(lessonId: string, componentId: string) {
	return `/lessons/${lessonId}/theory-interactions/${componentId}/feedback`;
}

export const lessonComponentFeedbackApi = {
	getOptions: (lessonId: string, componentId: string) =>
		apiClient.get<{ data: FeedbackOption[] }>(`${base(lessonId, componentId)}-options`)
			.then((r) => r.data),

	getCounts: (lessonId: string, componentId: string) =>
		apiClient.get<{ data: FeedbackCounts }>(base(lessonId, componentId))
			.then((r) => r.data),

	upsert: (lessonId: string, componentId: string, vote: FeedbackVote, message?: string, selectedOptionIds?: string[]) =>
		apiClient.post<void>(base(lessonId, componentId), { vote, message, selectedOptionIds }),

	remove: (lessonId: string, componentId: string) =>
		apiClient.delete<void>(base(lessonId, componentId)),
};
