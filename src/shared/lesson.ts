export type LessonAuthor = {
	userId: string;
	role: string | null;
};

export interface ILesson {
	id: string;
	moduleId: string;
	title: string;
	slug: string;
	description?: string | null;
	durationSeconds: number;
	position: number | null;
	isActive: boolean;
	status: LessonStatus;
	authors: LessonAuthor[];
	createdAt: Date;
	updatedAt: Date;
}

export type LessonStatus = "draft" | "reviewed" | "published";
