export type ActivityType = "content" | "quiz" | "exercise" | "critical_thinking";

export type LessonActivity = {
	id: string;
	lessonId: string;
	lessonBlockId: string | null;
	type: ActivityType;
	title: string;
	weight: number;
	required: boolean;
	position: number;
};

export type CreateLessonActivity = {
	lessonId: string;
	lessonBlockId?: string | null;
	type: ActivityType;
	title: string;
	weight?: number;
	required?: boolean;
	position?: number;
};
