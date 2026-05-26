export type ContentBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "content";
	data: { content: Record<string, unknown>[] };
};

export type InteractiveBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "interactive";
	engine: string;
	data: Record<string, unknown>;
};

export type AssessmentBlock = {
	id: string;
	lessonId: string;
	position: number;
	type: "assessment";
	engine: string;
	data: Record<string, unknown>;
};

export type LessonBlock = ContentBlock | InteractiveBlock | AssessmentBlock;
