import { useMemo, useState } from "react";
import type { SubjectDomain, SubjectsCatalogFilters } from "../types/types";
import {
	buildSubjectsCatalogStats,
	filterSubjectsCatalog,
} from "../libs/utils/subjectsCatalog.utils";

const INITIAL_FILTERS: SubjectsCatalogFilters = {
	search: "",
	track: "all",
	availability: "all",
};

export function useSubjectsCatalog(subjects: SubjectDomain[]) {
	const [filters, setFilters] =
		useState<SubjectsCatalogFilters>(INITIAL_FILTERS);

	const filteredSubjects = useMemo(
		() => filterSubjectsCatalog(subjects, filters),
		[subjects, filters],
	);

	const featuredSubjects = useMemo(
		() => subjects.filter((subject) => subject.featured),
		[subjects],
	);

	const overallStats = useMemo(
		() => buildSubjectsCatalogStats(subjects),
		[subjects],
	);

	const filteredStats = useMemo(
		() => buildSubjectsCatalogStats(filteredSubjects),
		[filteredSubjects],
	);

	const hasActiveFilters =
		filters.search.trim().length > 0 ||
		filters.track !== "all" ||
		filters.availability !== "all";

	function updateSearch(search: string) {
		setFilters((current) => ({ ...current, search }));
	}

	function updateTrack(track: SubjectsCatalogFilters["track"]) {
		setFilters((current) => ({ ...current, track }));
	}

	function updateAvailability(
		availability: SubjectsCatalogFilters["availability"],
	) {
		setFilters((current) => ({ ...current, availability }));
	}

	function resetFilters() {
		setFilters(INITIAL_FILTERS);
	}

	return {
		filters,
		filteredSubjects,
		featuredSubjects,
		overallStats,
		filteredStats,
		hasActiveFilters,
		updateSearch,
		updateTrack,
		updateAvailability,
		resetFilters,
	};
}
