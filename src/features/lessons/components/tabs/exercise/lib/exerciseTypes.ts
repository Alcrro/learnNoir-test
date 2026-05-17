export type ExerciseDifficulty = "easy" | "medium" | "hard";

export type ExerciseExample = {
	input: string;
	output: string;
	explanation?: string;
};

export type ExerciseTestCase = {
	input: unknown;
	expected: unknown;
	isHidden: boolean;
	label?: string;
};

export type Exercise = {
	id: string;
	lessonId: string;
	algorithmId: string;
	title: string;
	difficulty: ExerciseDifficulty;
	description: string;
	examples: ExerciseExample[];
	constraints: string[];
	hints: string[];
	starterCode: string;
	testCases: ExerciseTestCase[];
	tags: string[];
	position: number;
	createdAt: string | null;
};

export type TestRunResult = {
	passed: boolean;
	input: unknown;
	expected: unknown;
	actual: unknown;
	error?: string;
	executionTimeMs: number;
};

export type CodeRunResult = {
	results: TestRunResult[];
	passedCount: number;
	totalCount: number;
	totalTimeMs: number;
};

export type ExerciseProgressItem = {
	exerciseId: string;
	status: "passed" | "failed" | "error";
	score: number;
	passedTests: number;
	totalTests: number;
	hintsUsed: number;
};

export type ExerciseStatus = "not_started" | "passed" | "failed";
