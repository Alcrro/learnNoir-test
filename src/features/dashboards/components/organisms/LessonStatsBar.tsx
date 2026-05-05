import { FileText, Globe, Search } from "lucide-react";
import { StatCounter } from "../atoms/StatCounter";
import type { TeacherLessonDTO } from "../../types/teacher.types";

type Props = { lessons: TeacherLessonDTO[] };

export function LessonStatsBar({ lessons }: Props) {
	const draft = lessons.filter((l) => l.status === "draft").length;
	const reviewed = lessons.filter((l) => l.status === "reviewed").length;
	const published = lessons.filter((l) => l.status === "published").length;

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<StatCounter label="Drafts" value={draft} icon={FileText} tone="slate" />
			<StatCounter label="In review" value={reviewed} icon={Search} tone="amber" />
			<StatCounter label="Published" value={published} icon={Globe} tone="teal" />
		</div>
	);
}
