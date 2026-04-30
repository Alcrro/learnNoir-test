import { Subject } from "../../subjects/data/subjects.data";

type FilterOptions = {
	category: string;
	difficulty: string;
	search: string;
};

export function applyFilters(
	subjects: Subject[],
	{ category, difficulty, search }: FilterOptions,
) {
	const q = search.trim().toLowerCase();
	return subjects.filter((s) => {
		if (category !== "all" && s.category !== category) return false;
		if (difficulty !== "all" && s.difficulty !== difficulty) return false;
		if (q) {
			const hit =
				s.title.toLowerCase().includes(q) ||
				s.description.toLowerCase().includes(q) ||
				s.tags.some((t) => t.toLowerCase().includes(q));
			if (!hit) return false;
		}
		return true;
	});
}
