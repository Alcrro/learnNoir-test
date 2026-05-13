import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";
import { useLessonDataStore } from "../store/useLessonDataStore";
import { useLessonEditStore } from "../store/useLessonEditStore";

export function useLessonEdit() {
	const queryClient = useQueryClient();

	const saveMutation = useMutation({
		mutationFn: () => {
			const { lesson } = useLessonDataStore.getState();
			const { editTitle, editDescription } = useLessonEditStore.getState();
			if (!lesson) throw new Error("No lesson loaded");
			return lessonsApi.update(lesson.id, {
				title: editTitle.trim(),
				description: editDescription.trim() || null,
				durationSeconds: lesson.durationSeconds,
			});
		},
		onSuccess: () => {
			const { lesson } = useLessonDataStore.getState();
			if (lesson) {
				void queryClient.invalidateQueries({ queryKey: ["lesson-by-slug", lesson.slug] });
			}
			useLessonEditStore.getState().setIsEditing(false);
		},
	});

	useEffect(() => {
		useLessonEditStore.getState()._patch({ isSaving: saveMutation.isPending });
	}, [saveMutation.isPending]);

	useEffect(() => {
		useLessonEditStore.setState({ save: () => saveMutation.mutate() });
	}, [saveMutation.mutate]);
}
