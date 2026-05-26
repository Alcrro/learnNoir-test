export type LessonTabId = "theoryTab" | "vizTab" | "codeTab" | "quizTab" | "watchTab" | "exerciseTab";

export type SidebarPrereq = {
	name: string;
	status: "done" | "recommended";
};

export type SidebarRelated = {
	name: string;
	why: string;
	path?: string;
};

export type LessonSidebarData = {
	prerequisites: SidebarPrereq[];
	relatedLessons: SidebarRelated[];
	nextLesson: { name: string } | undefined;
	title: string;
};
