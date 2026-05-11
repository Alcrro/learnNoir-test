import { Pencil, Save, X, Bot, Loader2 } from "lucide-react";

type Props = {
	isEditing: boolean;
	isDirty: boolean;
	isSaving: boolean;
	onEdit: () => void;
	onSave: () => void;
	onCancel: () => void;
	onReview: () => void;
	isReviewing: boolean;
};

export const LessonEditBar = ({
	isEditing,
	isDirty,
	isSaving,
	onEdit,
	onSave,
	onCancel,
	onReview,
	isReviewing,
}: Props) => {
	return (
		<div className="flex items-center gap-2">
			{!isEditing ? (
				<button
					type="button"
					onClick={onEdit}
					className="flex items-center gap-1.5 rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) hover:border-(--accent) transition-colors"
				>
					<Pencil className="h-3.5 w-3.5" />
					Edit lesson
				</button>
			) : (
				<>
					<button
						type="button"
						onClick={onReview}
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
						onClick={onCancel}
						disabled={isSaving}
						className="flex items-center gap-1.5 rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors disabled:opacity-50"
					>
						<X className="h-3.5 w-3.5" />
						Cancel
					</button>

					<button
						type="button"
						onClick={onSave}
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
