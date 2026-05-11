import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";
import type { LessonDTO } from "../api/lessonsApi";

export function useLessonEdit(lesson: LessonDTO) {
	const queryClient = useQueryClient();

	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(lesson.title);
	const [description, setDescription] = useState(lesson.description ?? "");
	const [durationSeconds, setDurationSeconds] = useState(lesson.durationSeconds);

	const isDirty =
		title !== lesson.title ||
		description !== (lesson.description ?? "") ||
		durationSeconds !== lesson.durationSeconds;

	const saveMutation = useMutation({
		mutationFn: () =>
			lessonsApi.update(lesson.id, {
				title: title.trim(),
				description: description.trim() || null,
				durationSeconds,
			}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["lesson-by-slug", lesson.slug] });
			setIsEditing(false);
		},
	});

	const cancel = () => {
		setTitle(lesson.title);
		setDescription(lesson.description ?? "");
		setDurationSeconds(lesson.durationSeconds);
		setIsEditing(false);
	};

	return {
		isEditing,
		setIsEditing,
		title,
		setTitle,
		description,
		setDescription,
		durationSeconds,
		setDurationSeconds,
		isDirty,
		save: () => saveMutation.mutate(),
		isSaving: saveMutation.isPending,
		saveError: saveMutation.isError,
		cancel,
	};
}
