import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";
import { useLessonContext } from "../context/LessonContext";
import { useLessonBySlugQuery } from "./useLessonBySlugQuery";
import { useLessonEditStore } from "../store/useLessonEditStore";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

const TITLE_MAX = 200;
const TITLE_MIN = 3;

export function useLessonEdit() {
	const { lessonSlug } = useLessonContext();
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const queryClient = useQueryClient();

	const saveMutation = useMutation({
		mutationFn: () => {
			const { editTitle, editDescription } = useLessonEditStore.getState();
			if (!lesson) throw new Error("No lesson loaded");

			const title = editTitle.trim();
			if (title.length < TITLE_MIN) throw new Error(`Titlul trebuie să aibă cel puțin ${TITLE_MIN} caractere.`);
			if (title.length > TITLE_MAX) throw new Error(`Titlul este prea lung (${title.length}/${TITLE_MAX} caractere).`);

			return lessonsApi.update(lesson.id, {
				title,
				description: editDescription.trim() || null,
				durationSeconds: lesson.durationSeconds,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: lessonQueryKeys.bySlug(lessonSlug) });
			useLessonEditStore.getState().setIsEditing(false);
		},
	});

	return {
		save: () => saveMutation.mutate(),
		isSaving: saveMutation.isPending,
		saveError: saveMutation.error?.message ?? null,
	};
}
