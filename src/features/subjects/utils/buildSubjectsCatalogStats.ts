import { SubjectDomain } from "../../../types/types";

export type SubjectCatalogStats = {
	totalSubjects: number;
	availableSubjects: number;
	comingSoonSubjects: number;
	totalLessons: number;
	totalHours: number;
	completionRate: number;
};

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
