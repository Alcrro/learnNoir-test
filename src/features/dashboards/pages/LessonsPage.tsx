import { useState } from "react";
import { Plus } from "lucide-react";
import { DashboardPanel, DashboardSectionHeading } from "../components/DashboardUI";
import { LessonStatsBar } from "../components/organisms/LessonStatsBar";
import { LessonList } from "../components/organisms/LessonList";
import { LessonFormModal } from "../components/molecules/LessonFormModal";
import {
	useTeacherLessons,
	useCreateLesson,
	useUpdateLesson,
	useDeleteLesson,
	useReviewLesson,
	usePublishLesson,
} from "../hooks/useTeacherLessons";
import type { CreateLessonPayload, TeacherLessonDTO, UpdateLessonPayload } from "../types/teacher.types";

export default function LessonsPage() {
	const { data: lessons, isLoading } = useTeacherLessons();

	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<TeacherLessonDTO | null>(null);

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

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<p className="text-sm text-[var(--text-muted)]">Loading lessons…</p>
			</div>
		);
	}

	const lessonList = lessons ?? [];

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Lessons"
					title="Build, review and deliver lessons"
					description="Manage all your lessons in one place — create drafts, send them for review, and publish when ready."
					action={
						<button
							type="button"
							onClick={openCreate}
							className="inline-flex items-center gap-2 rounded-2xl bg-[var(--blue)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
						>
							<Plus className="h-4 w-4" />
							New lesson
						</button>
					}
				/>
			</DashboardPanel>

			<LessonStatsBar lessons={lessonList} />

			<LessonList
				lessons={lessonList}
				onEdit={openEdit}
				onDelete={handleDelete}
				onReview={(id) => reviewMutation.mutate(id)}
				onPublish={(id) => publishMutation.mutate(id)}
			/>

			{modalOpen && (
				<LessonFormModal
					lesson={editing ?? undefined}
					onClose={closeModal}
					onSave={handleSave}
					isLoading={createMutation.isPending || updateMutation.isPending}
				/>
			)}
		</div>
	);
}
