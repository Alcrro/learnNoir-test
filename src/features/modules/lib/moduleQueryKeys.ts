export const moduleQueryKeys = {
	byCategory: (subject: string, category: string) => ["category-modules", subject, category] as const,
};
