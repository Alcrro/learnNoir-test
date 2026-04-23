import type {
	SubjectAvailability,
	SubjectDomain,
	SubjectTrack,
	SubjectsCatalogFilters,
} from "../../types/types";

export type SubjectCatalogStats = {
	totalSubjects: number;
	availableSubjects: number;
	comingSoonSubjects: number;
	totalLessons: number;
	totalHours: number;
	completionRate: number;
};

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

export function buildSubjectsCatalogStats(
	subjects: SubjectDomain[],
): SubjectCatalogStats {
	const totalLessons = subjects.reduce(
		(sum, subject) => sum + subject.lessons,
		0,
	);
	const totalHours = subjects.reduce(
		(sum, subject) => sum + subject.estimatedHours,
		0,
	);
	const totalModules = subjects.reduce(
		(sum, subject) => sum + subject.modules,
		0,
	);
	const completedModules = subjects.reduce(
		(sum, subject) => sum + subject.completedModules,
		0,
	);

	return {
		totalSubjects: subjects.length,
		availableSubjects: subjects.filter(
			(subject) => subject.availability === "available",
		).length,
		comingSoonSubjects: subjects.filter(
			(subject) => subject.availability === "coming-soon",
		).length,
		totalLessons,
		totalHours,
		completionRate:
			totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
	};
}

export function getSubjectProgress(subject: SubjectDomain) {
	if (subject.modules <= 0) {
		return 0;
	}

	return Math.round((subject.completedModules / subject.modules) * 100);
}

export function getAvailabilityCopy(availability: SubjectAvailability) {
	if (availability === "available") {
		return "Available now";
	}

	return "Coming soon";
}

export function getTrackCopy(track: SubjectTrack) {
	switch (track) {
		case "technology":
			return "Technology";
		case "mathematics":
			return "Mathematics";
		case "science":
			return "Science";
	}
}
