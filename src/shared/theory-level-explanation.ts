export type ExplanationLevel = "copil" | "licean" | "student" | "expert";

export type ExplanationSource = "teacher" | "ai";

export interface TheoryLevelExplanation {
	id: string;
	lessonBlockId: string;
	level: ExplanationLevel;
	content: string;
	source: ExplanationSource;
	createdAt: string;
	updatedAt: string;
}

export interface UpsertTheoryLevelExplanationInput {
	level: ExplanationLevel;
	content: string;
	source: ExplanationSource;
}

export type ExplanationStatus = "teacher" | "ai" | "empty";

export interface ExplanationMeta {
	level: ExplanationLevel;
	status: ExplanationStatus;
}

export const EXPLANATION_LEVELS: ExplanationLevel[] = ["copil", "licean", "student", "expert"];
