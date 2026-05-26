import { useEffect, useState } from "react";
import { useIsLessonCompleted } from "./useIsLessonCompleted";
import { useMarkLessonCompleted } from "./useMarkLessonCompleted";
import { useScrollReadProgress } from "./useScrollReadProgress";

export function useLessonReadProgress(lessonId: string) {
	const isCompleted = useIsLessonCompleted(lessonId);
	const { markCompleted, reset } = useMarkLessonCompleted(lessonId);
	const { contentRef, scrollProgress, hasScrollableContent } = useScrollReadProgress({
		disabled: isCompleted,
		onComplete: markCompleted,
	});

	const [displayProgress, setDisplayProgress] = useState(isCompleted ? 100 : 0);

	// Sync display when lesson is already completed (revisit)
	useEffect(() => {
		if (isCompleted) {
			reset();
			setDisplayProgress(100);
		}
	}, [isCompleted, reset]);

	useEffect(() => {
		if (!isCompleted) setDisplayProgress(scrollProgress);
	}, [isCompleted, scrollProgress]);

	return {
		scrollProgress: displayProgress,
		isCompleted,
		hasScrollableContent: isCompleted || hasScrollableContent,
		contentRef,
	};
}
