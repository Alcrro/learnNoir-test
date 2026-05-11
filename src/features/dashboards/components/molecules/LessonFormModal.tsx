import { useId } from "react";
import { X } from "lucide-react";
import type { CreateLessonPayload, TeacherLessonDTO, UpdateLessonPayload } from "../../types/teacher.types";
import { useLessonForm } from "../../hooks/useLessonForm";
import { AISuggestButton } from "../atoms/AISuggestButton";
import { ActiveToggle } from "../atoms/ActiveToggle";
import DefaultButton from "../../../../components/atoms/DefaultButton";
import { FormField } from "../../../../components/molecules/FormField";
import { FormSelectField } from "../../../../components/molecules/FormSelectField";
import { FormTextareaField } from "../../../../components/molecules/FormTextareaField";

type Props = {
	lesson?: TeacherLessonDTO;
	onClose: () => void;
	onSave: (payload: CreateLessonPayload | UpdateLessonPayload) => void;
	isLoading?: boolean;
};

export function LessonFormModal({ lesson, onClose, onSave, isLoading }: Props) {
	const uid = useId();
	const {
		modules,
		title, setTitle,
		description, setDescription,
		moduleId, setModuleId,
		durationMins, setDurationMins,
		isActive, setIsActive,
		aiLoading,
		aiError,
		canSuggest,
		handleAISuggest,
		handleSubmit,
	} = useLessonForm(lesson, onSave);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
			<div className="relative w-full max-w-xl overflow-y-auto max-h-[90vh] rounded-[28px] border border-(--border) bg-(--bg-card) p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between gap-4">
					<h2 className="text-xl font-semibold tracking-tight text-(--text-primary)">
						{lesson ? "Edit lesson" : "New lesson"}
					</h2>
					<DefaultButton
						type="button"
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="rounded-xl border border-(--border) bg-(--bg-secondary) p-2"
					>
						<X className="h-4 w-4" />
					</DefaultButton>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					<FormField
						id={`${uid}-title`}
						label="Title"
						type="text"
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="e.g. Introduction to Binary Search"
						action={
							<AISuggestButton
								onClick={handleAISuggest}
								disabled={!canSuggest}
								loading={aiLoading}
							/>
						}
					/>

					<FormSelectField
						id={`${uid}-module`}
						label="Module"
						required
						value={moduleId}
						onChange={(e) => setModuleId(e.target.value)}
					>
						<option value="" disabled>Select a module…</option>
						{(modules ?? []).map((m) => (
							<option key={m.id} value={m.id}>{m.name}</option>
						))}
					</FormSelectField>

					<FormTextareaField
						id={`${uid}-desc`}
						label="Description"
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder={aiLoading ? "AI is generating…" : "What will students learn in this lesson?"}
						disabled={aiLoading}
					/>

					<FormField
						id={`${uid}-duration`}
						label="Duration (minutes)"
						type="number"
						min={1}
						value={durationMins}
						onChange={(e) => setDurationMins(e.target.value)}
						placeholder={aiLoading ? "AI is estimating…" : "e.g. 45"}
						disabled={aiLoading}
					/>

					{aiError && <p className="text-xs text-[rgb(244,63,94)]">{aiError}</p>}

					<ActiveToggle checked={isActive} onChange={setIsActive} />

					<div className="flex items-center justify-end gap-3 pt-2">
						<DefaultButton
							type="button"
							variant="secondary"
							onClick={onClose}
							className="rounded-2xl px-5 py-2.5 text-sm font-medium"
						>
							Cancel
						</DefaultButton>
						<DefaultButton
							type="submit"
							variant="primary"
							disabled={isLoading || aiLoading}
							className="rounded-2xl px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
						>
							{isLoading ? "Saving…" : lesson ? "Save changes" : "Create lesson"}
						</DefaultButton>
					</div>
				</form>
			</div>
		</div>
	);
}
