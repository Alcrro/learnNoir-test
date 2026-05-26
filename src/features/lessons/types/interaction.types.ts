export type TheoryInteractionComponentType =
	| "predict_prompt"
	| "concrete_example"
	| "elaboration"
	| "interactive_exercise"
	| "transfer"
	| "recall_1"
	| "recall_2"
	| "recall_final";

export type TheoryInteractionStatus = "draft" | "approved";

export type TheoryInteractionDTO = {
	id: string;
	lessonId: string;
	componentType: TheoryInteractionComponentType;
	content: Record<string, unknown> | unknown[];
	status: TheoryInteractionStatus;
	version: number;
	createdAt: string;
	updatedAt: string;
};

export type LessonContextForAI = {
	subject: string;
	lessonType: string;
	title: string;
	mainContent: string;
	keyPoints?: string[];
	examples?: string[];
};

export type RecordAttemptInput = {
	chosenAnswer: unknown;
	correctAnswer: unknown | null;
	isCorrect: boolean | null;
};

export type TheoryAttemptDTO = {
	id: string;
	userId: string;
	interactionId: string;
	isCorrect: boolean | null;
	chosenAnswer: unknown;
	correctAnswer: unknown | null;
	attemptNumber: number;
	createdAt: string;
};
