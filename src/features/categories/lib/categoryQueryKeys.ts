export const categoryQueryKeys = {
	bySubject: (subjectSlug: string) => ["categories", subjectSlug] as const,
	catalogSubjects: (subjectSlug: string) => ["catalog-subjects", subjectSlug] as const,
};
