export type Difficulty = "beginner" | "intermediate" | "expert";

export const DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
	beginner: 1,
	intermediate: 2,
	expert: 3,
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
	beginner: "Beginner",
	intermediate: "Intermediate",
	expert: "Expert",
};

export type McqQuestion = {
	id: string;
	type: "mcq";
	difficulty: Difficulty;
	question: string;
	options: string[];
	correctIndex: number;
	explanation: string;
};

export type InputQuestion = {
	id: string;
	type: "input";
	difficulty: Difficulty;
	question: string;
	correctAnswer: string;
	placeholder?: string;
	explanation: string;
};

export type DragDropQuestion = {
	id: string;
	type: "drag-drop";
	difficulty: Difficulty;
	sentence: string;
	blanks: string[];
	items: string[];
	explanation: string;
};

export type QuizQuestion = McqQuestion | InputQuestion | DragDropQuestion;

export type MockQuiz = {
	title: string;
	questions: QuizQuestion[];
};

export type QuizStatus = "locked" | "available" | "completed" | "failed";

export type QuizSummaryItem = {
	id: string;
	title: string;
	description: string;
	primaryDifficulty: Difficulty;
	questionCount: number;
	maxPoints: number;
	estimatedMinutes: number;
	status: QuizStatus;
	score?: number;
	quiz?: MockQuiz;
};
