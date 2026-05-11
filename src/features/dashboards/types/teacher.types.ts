export type TeacherLessonDTO = {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	durationSeconds: number;
	position: number | null;
	isActive: boolean;
	status: "draft" | "reviewed" | "published";
	moduleId: string;
	moduleName: string;
	createdAt: string;
	updatedAt: string;
	studentCount: number;
	completionRate: number;
	avgScore: number;
};

export type TeacherStatsDTO = {
	totalLessons: number;
	publishedLessons: number;
	draftLessons: number;
	reviewedLessons: number;
	totalStudents: number;
	avgCompletionRate: number;
	liveLesson: { id: string; title: string; lastActivityAt: string } | null;
};

export type TeacherStudentDTO = {
	userId: string;
	username: string;
	avatarUrl: string | null;
	lessonsTotal: number;
	lessonsCompleted: number;
	lessonsInProgress: number;
	avgScore: number;
	lastActivityAt: string | null;
};

export type ModuleDTO = {
	id: string;
	name: string;
	slug: string;
	position: number;
	categoryId: string;
};

export type CreateLessonPayload = {
	title: string;
	moduleId: string;
	description?: string | null;
	durationSeconds?: number;
	position?: number | null;
	isActive?: boolean;
	slug?: string;
};

export type UpdateLessonPayload = Partial<CreateLessonPayload>;

export type LessonEditChange = { field: string; from: string; to: string };

export type LessonEditEntry = {
	id: string;
	lessonId: string;
	editorId: string;
	editorName: string;
	changedAt: string;
	changes: LessonEditChange[];
};
