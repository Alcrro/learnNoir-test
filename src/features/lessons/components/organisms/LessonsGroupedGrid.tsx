import type { LessonGroup } from "../../hooks/useLessonListPage";
import type { LessonDTO } from "../../api/lessonsApi";
import type { LessonProgress } from "../../api/progressApi";
import { GroupedLessonCard } from "../molecules/GroupedLessonCard";

type Props = {
	groups: LessonGroup[];
	progressMap: Record<string, LessonProgress | null> | undefined;
	buildHref: (lesson: LessonDTO) => string;
};

export function LessonsGroupedGrid({ groups, progressMap, buildHref }: Props) {
	return (
		<div className="mt-6 flex flex-col gap-3">
			{groups.map((group, index) => (
				<GroupedLessonCard
					key={group.baseTitle}
					group={group}
					progressMap={progressMap}
					buildHref={buildHref}
					position={index + 1}
				/>
			))}
		</div>
	);
}
