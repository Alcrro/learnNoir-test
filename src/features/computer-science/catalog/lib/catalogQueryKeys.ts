import type { ProgrammingCategory } from "../types/catalog.types";

export const catalogQueryKeys = {
	programming: (category: ProgrammingCategory) => ["programming-catalog", category] as const,
};
