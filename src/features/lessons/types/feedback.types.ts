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
