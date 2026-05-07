import type { LessonDTO } from "../../api/lessonsApi";
import type { LessonProgress } from "../../api/progressApi";
import { LessonCard } from "../molecules/LessonCard";

type Props = {
	lessons: LessonDTO[];
	// Map from lessonId → progress. Undefined means progress hasn't loaded yet.
	progressMap: Record<string, LessonProgress | null> | undefined;
	buildHref: (lesson: LessonDTO) => string;
};

export function LessonsGrid({ lessons, progressMap, buildHref }: Props) {
	return (
		<div className="mt-6 flex flex-col gap-3">
			{lessons.map((lesson, index) => (
				<LessonCard
					key={lesson.id}
					lesson={lesson}
					progress={progressMap?.[lesson.id]}
					href={buildHref(lesson)}
					position={index + 1}
				/>
			))}
		</div>
	);
}
