import { Pencil, Save, X, Bot, Loader2 } from "lucide-react";
import { useLessonContext } from "../../context/LessonContext";
import { useLessonBySlugQuery } from "../../hooks/useLessonBySlugQuery";
import { useLessonEditStore } from "../../store/useLessonEditStore";
import { useLessonAIStore } from "../../store/useLessonAIStore";
import { useLessonEdit } from "../../hooks/useLessonEdit";

export const LessonEditBar = () => {
	const { lessonSlug } = useLessonContext();
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const isEditing = useLessonEditStore((s) => s.isEditing);
	const editTitle = useLessonEditStore((s) => s.editTitle);
	const editDescription = useLessonEditStore((s) => s.editDescription);
	const setIsEditing = useLessonEditStore((s) => s.setIsEditing);
	const cancelEdit = useLessonEditStore((s) => s.cancelEdit);
	const isReviewing = useLessonAIStore((s) => s.reviewState.loading);
	const handleReview = useLessonAIStore((s) => s.handleReview);
	const { save, isSaving } = useLessonEdit();

	const isDirty = lesson
		? editTitle !== lesson.title || editDescription !== (lesson.description ?? "")
		: false;

	const startEditing = () => {
		if (lesson) {
			useLessonEditStore.getState()._patch({
				editTitle: lesson.title,
				editDescription: lesson.description ?? "",
			});
		}
		setIsEditing(true);
	};

	return (
		<div className="flex items-center gap-2">
			{!isEditing ? (
				<button
					type="button"
					onClick={startEditing}
					className="flex items-center gap-1.5 rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) hover:border-(--accent) transition-colors"
				>
					<Pencil className="h-3.5 w-3.5" />
					Edit lesson
				</button>
			) : (
				<>
					<button
						type="button"
						onClick={() =>
							handleReview({
								title: editTitle,
								description: editDescription,
								content: lesson?.description ?? "",
							})
						}
						disabled={isReviewing}
						className="flex items-center gap-1.5 rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-muted) hover:text-(--accent) hover:border-(--accent) transition-colors disabled:opacity-50"
					>
						{isReviewing ? (
							<Loader2 className="h-3.5 w-3.5 animate-spin" />
						) : (
							<Bot className="h-3.5 w-3.5" />
						)}
						{isReviewing ? "Reviewing…" : "AI Review"}
					</button>

					<button
						type="button"
						onClick={() => cancelEdit(lesson?.title ?? "", lesson?.description ?? "")}
						disabled={isSaving}
						className="flex items-center gap-1.5 rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors disabled:opacity-50"
					>
						<X className="h-3.5 w-3.5" />
						Cancel
					</button>

					<button
						type="button"
						onClick={save}
						disabled={!isDirty || isSaving}
						className="flex items-center gap-1.5 rounded-lg bg-(--accent) px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
					>
						{isSaving ? (
							<Loader2 className="h-3.5 w-3.5 animate-spin" />
						) : (
							<Save className="h-3.5 w-3.5" />
						)}
						{isSaving ? "Saving…" : "Save"}
					</button>
				</>
			)}
		</div>
	);
};
