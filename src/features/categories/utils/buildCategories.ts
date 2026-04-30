import { CATEGORY_META } from "../../subjects/data/subjects.data";

export function buildCategories() {
	return Object.entries(CATEGORY_META).map(([id, meta]) => ({ id, ...meta }));
}
