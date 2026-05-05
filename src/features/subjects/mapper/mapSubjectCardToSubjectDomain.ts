import type { SubjectDomain } from "../../../types/types";
import type { SubjectCardDTO } from "../api/subjectsApi";
import { getSubjectMetadata } from "../data/subjectMetadata";

export function mapSubjectCardToSubjectDomain(dto: SubjectCardDTO): SubjectDomain {
	const meta = getSubjectMetadata(dto.slug);
	const isAvailable = dto.modulesCount > 0;

	return {
		id: dto.slug,
		title: dto.title,
		subtitle: meta.subtitle,
		description: dto.description,
		track: meta.track,
		availability: isAvailable ? "available" : "coming-soon",
		accent: meta.accent,
		href: isAvailable ? `/subjects/${dto.slug}` : undefined,
		modules: dto.modulesCount,
		completedModules: 0,
		lessons: dto.lessonsCount,
		estimatedHours: dto.totalHours,
		topics: meta.topics,
		featured: meta.featured,
	};
}
