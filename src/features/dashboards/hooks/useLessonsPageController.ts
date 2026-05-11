import { useState } from "react";
import {
	useTeacherLessons,
	useCreateLesson,
	useUpdateLesson,
	useDeleteLesson,
	useReviewLesson,
	usePublishLesson,
} from "./useTeacherLessons";
import type { CreateLessonPayload, TeacherLessonDTO, UpdateLessonPayload } from "../types/teacher.types";

export function useLessonsPageController() {
	const { data: lessons, isLoading } = useTeacherLessons();

	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<TeacherLessonDTO | null>(null);
	const [historyLesson, setHistoryLesson] = useState<TeacherLessonDTO | null>(null);

	const createMutation = useCreateLesson();
	const updateMutation = useUpdateLesson();
	const deleteMutation = useDeleteLesson();
	const reviewMutation = useReviewLesson();
	const publishMutation = usePublishLesson();

	function openCreate() {
		setEditing(null);
		setModalOpen(true);
	}

	function openEdit(lesson: TeacherLessonDTO) {
		setEditing(lesson);
		setModalOpen(true);
	}

	function closeModal() {
		setModalOpen(false);
		setEditing(null);
	}

	function handleSave(payload: CreateLessonPayload | UpdateLessonPayload) {
		if (editing) {
			updateMutation.mutate({ id: editing.id, payload }, { onSuccess: closeModal });
		} else {
			createMutation.mutate(payload as CreateLessonPayload, { onSuccess: closeModal });
		}
	}

	function handleDelete(id: string) {
		if (window.confirm("Delete this lesson? This cannot be undone.")) {
			deleteMutation.mutate(id);
		}
	}

	return {
		lessons: lessons ?? [],
		isLoading,
		modalOpen,
		editing,
		historyLesson,
		setHistoryLesson,
		openCreate,
		openEdit,
		closeModal,
		handleSave,
		handleDelete,
		onReview: (id: string) => reviewMutation.mutate(id),
		onPublish: (id: string) => publishMutation.mutate(id),
		isSaving: createMutation.isPending || updateMutation.isPending,
	};
}
