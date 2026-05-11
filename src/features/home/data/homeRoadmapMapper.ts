import { CircleDashed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ACCENT_STYLES } from "../../subjects/data/subjectAccestMapper";
import { SUBJECT_ICONS } from "../../subjects/data/SubjectIconCardMapper";
import type { SubjectDomain } from "../../../types/types";

export type RoadmapCardProps = {
	id: string;
	icon: LucideIcon;
	title: string;
	subtitle: string;
	topics: string[];
	iconClass: string;
	topicBadgeClass: string;
};

export function mapSubjectToRoadmapCard(subject: SubjectDomain): RoadmapCardProps {
	const accent = ACCENT_STYLES[subject.accent];
	const Icon = SUBJECT_ICONS[subject.id] ?? CircleDashed;

	return {
		id: subject.id,
		icon: Icon,
		title: subject.title,
		subtitle: subject.subtitle,
		topics: subject.topics,
		iconClass: accent.icon,
		topicBadgeClass: accent.topic,
	};
}
