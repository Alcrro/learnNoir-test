import { NextLessonCard } from "../../../../features/computer-science/algorithms/components/lesson/theory/sidebar/NextLessonCard";
import { PrerequisitesCard } from "../../../../features/computer-science/algorithms/components/lesson/theory/sidebar/PrerequisitesCard";
import { RelatedLessonsCard } from "../../../../features/computer-science/algorithms/components/lesson/theory/sidebar/RelatedLessonsCard";
import type { LessonSidebarData } from "../../hooks/useLessonSidebarData";

type Props = Pick<LessonSidebarData, "prerequisites" | "relatedLessons" | "nextLesson">;

export function TheorySidebar({ prerequisites, relatedLessons, nextLesson }: Props) {
	return (
		<aside className="lesson-theory__sidebar">
			{prerequisites.length > 0 && <PrerequisitesCard prerequisites={prerequisites} />}
			<RelatedLessonsCard relatedLessons={relatedLessons} />
			{nextLesson && <NextLessonCard nextLesson={nextLesson} />}
		</aside>
	);
}
