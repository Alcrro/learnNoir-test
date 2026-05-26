export type ProgrammingLanguage = "python" | "javascript" | "java" | "cpp";

export type LessonDTO = {
	id: string;
	moduleId: string;
	language?: ProgrammingLanguage | null;
	title: string;
	slug: string;
	description: string | null;
	durationSeconds: number;
	position: number | null;
	isActive: boolean;
	status: "draft" | "reviewed" | "published";
	authors: { userId: string; role: string | null }[];
	createdAt: string;
	updatedAt: string;
};

export type UpdateLessonPayload = {
	title?: string;
	description?: string | null;
	durationSeconds?: number;
};
