import { API_URL } from "../../../libs/config";

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
	getOptions: async (lessonId: string, componentId: string): Promise<FeedbackOption[]> => {
		const res = await fetch(`${API_URL}${base(lessonId, componentId)}-options`, {
			credentials: "include",
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const json = (await res.json()) as { data: FeedbackOption[] };
		return json.data;
	},

	getCounts: async (lessonId: string, componentId: string): Promise<FeedbackCounts> => {
		const res = await fetch(`${API_URL}${base(lessonId, componentId)}`, {
			credentials: "include",
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const json = (await res.json()) as { data: FeedbackCounts };
		return json.data;
	},

	upsert: async (lessonId: string, componentId: string, vote: FeedbackVote, message?: string, selectedOptionIds?: string[]): Promise<void> => {
		const res = await fetch(`${API_URL}${base(lessonId, componentId)}`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ vote, message, selectedOptionIds }),
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
	},

	remove: async (lessonId: string, componentId: string): Promise<void> => {
		const res = await fetch(`${API_URL}${base(lessonId, componentId)}`, {
			method: "DELETE",
			credentials: "include",
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
	},
};
