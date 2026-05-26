import { useIsLessonCompleted } from "./useIsLessonCompleted";
import { useMarkLessonCompleted } from "./useMarkLessonCompleted";
import { useScrollReadProgress } from "./useScrollReadProgress";

export function useLessonReadProgress(lessonId: string) {
	const isCompleted = useIsLessonCompleted(lessonId);
	const { markCompleted } = useMarkLessonCompleted(lessonId);
	const { contentRef, scrollProgress, hasScrollableContent } = useScrollReadProgress({
		disabled: isCompleted,
		onComplete: markCompleted,
	});

	return {
		scrollProgress: isCompleted ? 100 : scrollProgress,
		isCompleted,
		hasScrollableContent: isCompleted || hasScrollableContent,
		contentRef,
	};
}
