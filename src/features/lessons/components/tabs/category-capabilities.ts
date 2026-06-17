// Which optional tabs are unlocked per URL category slug.
// Tabs fără isAvailable (theory, quiz, watch) apar mereu — acest fișier controlează doar cele trei tab-uri opționale.
// Folosit în: tab-registry.tsx → isAvailable callbacks → LessonTabContent.tsx linia 30.
export type CategoryCapability = "visualizer" | "code-playground" | "exercises";

// Cheile sunt slug-urile din URL: /subjects/:subject/:category/:module/:lesson
// O categorie absentă din acest record → primește [] → tab-urile opționale sunt ascunse.
const CATEGORY_CAPABILITIES: Partial<Record<string, CategoryCapability[]>> = {
	algorithms: ["visualizer", "code-playground", "exercises"],
	"data-structures": ["visualizer", "exercises"],
	"logic-and-critical-thinking": ["exercises"],
	web: ["visualizer"],
	// mathematics: [],
	// graph-theory: ["visualizer"],
};

// Returnează true dacă categoria suportă capability-ul cerut.
// Apelat din TAB_REGISTRY pentru vizTab, codeTab, exerciseTab.
export function hasCapability(
	category: string | undefined,
	cap: CategoryCapability,
): boolean {
	return (CATEGORY_CAPABILITIES[category ?? ""] ?? []).includes(cap);
}
