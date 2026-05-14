import { CATEGORY_META, Subject } from "../../subjects/data/subjects.data";

// Grupează subjects filtrate după categorie păstrând ordinea din CATEGORY_META
export function groupByCategory(subjects: Subject[]): [string, Subject[]][] {
	const map = new Map<string, Subject[]>(
		Object.keys(CATEGORY_META).map((k) => [k, []]),
	);
	subjects.forEach((s) => map.get(s.category)?.push(s));
	// Elimină categoriile goale
	return [...map.entries()].filter(([, items]) => items.length > 0);
}
