export const dashboardQueryKeys = {
	teacherLessons: ["teacher", "lessons"] as const,
	teacherStats: ["teacher", "stats"] as const,
	teacherStudents: ["teacher", "students"] as const,
	lessonHistory: (lessonId: string | null) => ["lesson", "history", lessonId] as const,
	modules: ["modules"] as const,
};
