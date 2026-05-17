export type CategoryCapability = "visualizer" | "code-playground" | "exercises";

const CATEGORY_CAPABILITIES: Partial<Record<string, CategoryCapability[]>> = {
	algorithms: ["visualizer", "code-playground", "exercises"],
	"data-structures": ["visualizer", "exercises"],
	// mathematics: [],
	// graph-theory: ["visualizer"],
};

export function hasCapability(
	category: string | undefined,
	cap: CategoryCapability,
): boolean {
	return (CATEGORY_CAPABILITIES[category ?? ""] ?? []).includes(cap);
}
