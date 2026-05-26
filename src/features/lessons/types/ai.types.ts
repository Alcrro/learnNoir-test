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
