import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";
import { useLessonContext } from "../context/LessonContext";
import { useLessonBySlugQuery } from "./useLessonBySlugQuery";
import { useLessonEditStore } from "../store/useLessonEditStore";

export function useLessonEdit() {
	const { lessonSlug } = useLessonContext();
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const queryClient = useQueryClient();

	const saveMutation = useMutation({
		mutationFn: () => {
			const { editTitle, editDescription } = useLessonEditStore.getState();
			if (!lesson) throw new Error("No lesson loaded");
			return lessonsApi.update(lesson.id, {
				title: editTitle.trim(),
				description: editDescription.trim() || null,
				durationSeconds: lesson.durationSeconds,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["lesson-by-slug", lessonSlug] });
			useLessonEditStore.getState().setIsEditing(false);
		},
	});

	return { save: () => saveMutation.mutate(), isSaving: saveMutation.isPending };
}
