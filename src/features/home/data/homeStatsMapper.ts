import { Binary, BookOpen, Clock, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SubjectCatalogStats } from "../../subjects/utils/buildSubjectsCatalogStats";

export type StatItem = {
	label: string;
	value: string;
	icon: LucideIcon;
};

export function buildHomeStats(stats: SubjectCatalogStats): StatItem[] {
	return [
		{ label: "Lessons", value: String(stats.totalLessons), icon: BookOpen },
		{ label: "Active tracks", value: String(stats.availableSubjects), icon: Binary },
		{ label: "Hours of content", value: `~${stats.totalHours}h`, icon: Clock },
		{
			label: "Subjects roadmap",
			value: String(stats.availableSubjects + stats.comingSoonSubjects),
			icon: Layers,
		},
	];
}
