import { useEffect } from "react";
import { useLessonBySlugQuery } from "./useLessonBySlugQuery";
import { useLessonBlocksQuery } from "./useLessonBlocksQuery";
import { useLessonEditStore } from "../store/useLessonEditStore";
import { useLessonAIStore } from "../store/useLessonAIStore";

export function useLessonPageController(lessonSlug: string) {
	const { data: lesson, isLoading: loadingLesson, isError } = useLessonBySlugQuery(lessonSlug);
	const { isLoading: loadingBlocks } = useLessonBlocksQuery(lesson?.id ?? "");

	// Clean up UI stores when leaving the lesson page.
	useEffect(() => {
		return () => {
			useLessonEditStore.getState().reset();
			useLessonAIStore.getState().reset();
		};
	}, []);

	return { lesson, loadingLesson, loadingBlocks, isError };
}
