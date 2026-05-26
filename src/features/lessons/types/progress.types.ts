export type SpacedRepetitionInfo = {
	reviewCount: number;
	lastReviewedAt: string | null;
	nextReviewAt: string | null;
	isDue: boolean;
	daysUntilReview: number | null;
};

export type LessonWithReview = {
	lessonId: string;
	lessonSlug: string;
	lessonTitle: string;
	sr: SpacedRepetitionInfo;
};

export type LessonProgress = {
	id: string;
	userId: string;
	lessonId: string;
	status: "not_started" | "in_progress" | "completed";
	weightedScore: number;
	quizScore: number;
	readScore: number;
	outputScore: number;
	lastActivityAt: string | null;
	createdAt: string | null;
	updatedAt: string | null;
	nextReviewAt: string | null;
	lastReviewedAt: string | null;
	reviewCount: number;
};

export type MyLessonProgress = LessonProgress & {
	lessonTitle: string;
	lessonSlug: string;
	lessonStatus: string;
	moduleName: string;
};

export type UpsertProgressInput = {
	status?: LessonProgress["status"];
	quizScore?: number;
	readScore?: number;
	outputScore?: number;
};

export type QuizBlockScore = {
	id: string;
	userId: string;
	lessonBlockId: string;
	score: number;
	passed: boolean;
	attempts: number;
};
