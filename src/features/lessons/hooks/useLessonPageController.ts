import { useEffect } from "react";
import { useLessonBySlugQuery } from "./useLessonBySlugQuery";
import { useLessonBlocksQuery } from "./useLessonBlocksQuery";
import { useLessonProgressQuery } from "./useLessonProgressQuery";
import { useLessonPermissions } from "./useLessonPermissions";
import { useLessonEdit } from "./useLessonEdit";
import { useLessonDataStore } from "../store/useLessonDataStore";
import { useLessonEditStore } from "../store/useLessonEditStore";
import { useLessonAIStore } from "../store/useLessonAIStore";

export function useLessonPageController(lessonSlug: string) {
	const { data: lesson, isLoading: loadingLesson, isError } = useLessonBySlugQuery(lessonSlug);
	const { data: blocks = [], isLoading: loadingBlocks } = useLessonBlocksQuery(lesson?.id ?? "");
	const { data: progress } = useLessonProgressQuery(lesson?.id ?? "");
	const { canEdit } = useLessonPermissions(lesson);

	useLessonEdit();

	// Seed edit fields only when navigating to a new lesson.
	useEffect(() => {
		if (lesson) {
			useLessonEditStore.getState()._patch({
				editTitle: lesson.title,
				editDescription: lesson.description ?? "",
			});
		}
	}, [lesson?.id]);

	// Keep server data in sync with the store.
	useEffect(() => {
		useLessonDataStore.getState()._patch({ lesson: lesson ?? null, blocks, progress: progress ?? null, canEdit });
	}, [lesson, blocks, progress, canEdit]);

	// Clean up all stores when leaving the lesson page.
	useEffect(() => {
		return () => {
			useLessonDataStore.getState().reset();
			useLessonEditStore.getState().reset();
			useLessonAIStore.getState().reset();
		};
	}, []);

	return { loadingLesson, loadingBlocks, isError };
}
