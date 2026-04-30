import type {
	SubjectDomain,
	SubjectsCatalogFilters,
} from "../../../types/types";

export function filterSubjectsCatalog(
	subjects: SubjectDomain[],
	filters: SubjectsCatalogFilters,
) {
	const query = filters.search.trim().toLowerCase();

	return subjects.filter((subject) => {
		if (filters.track !== "all" && subject.track !== filters.track) {
			return false;
		}

		if (
			filters.availability !== "all" &&
			subject.availability !== filters.availability
		) {
			return false;
		}

		if (!query) {
			return true;
		}

		const searchableText = [
			subject.title,
			subject.subtitle,
			subject.description,
			subject.track,
			...subject.topics,
		]
			.join(" ")
			.toLowerCase();

		return searchableText.includes(query);
	});
}
