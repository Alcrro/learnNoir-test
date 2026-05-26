export const theoryQueryKeys = {
	root: (lessonId: string) => ["theory-interactions", lessonId] as const,
	approved: (lessonId: string) => ["theory-interactions", lessonId, "approved"] as const,
	myAttempts: (lessonId: string) => ["theory-interactions", lessonId, "my-attempts"] as const,
	myProgress: (lessonId: string) => ["theory-interactions", lessonId, "my-progress"] as const,
	allVersions: (lessonId: string) => ["theory-interactions", lessonId, "all"] as const,
	feedback: (lessonId: string, componentId: string) => ["feedback", lessonId, componentId] as const,
	feedbackOptions: (lessonId: string, componentId: string) => ["feedback-options", lessonId, componentId] as const,
};
