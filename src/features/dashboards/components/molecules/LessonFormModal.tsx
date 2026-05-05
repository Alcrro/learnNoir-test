import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { useModules } from "../../hooks/useModules";
import type { CreateLessonPayload, TeacherLessonDTO, UpdateLessonPayload } from "../../types/teacher.types";

function slugify(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

type Props = {
	lesson?: TeacherLessonDTO;
	onClose: () => void;
	onSave: (payload: CreateLessonPayload | UpdateLessonPayload) => void;
	isLoading?: boolean;
};

export function LessonFormModal({ lesson, onClose, onSave, isLoading }: Props) {
	const uid = useId();
	const { data: modules } = useModules();

	const [title, setTitle] = useState(lesson?.title ?? "");
	const [slug, setSlug] = useState(lesson?.slug ?? "");
	const [slugManual, setSlugManual] = useState(!!lesson);
	const [description, setDescription] = useState(lesson?.description ?? "");
	const [moduleId, setModuleId] = useState(lesson?.moduleId ?? "");
	const [durationMins, setDurationMins] = useState(
		lesson ? String(Math.round(lesson.durationSeconds / 60)) : "",
	);
	const [position, setPosition] = useState(
		lesson?.position != null ? String(lesson.position) : "",
	);
	const [isActive, setIsActive] = useState(lesson?.isActive ?? true);

	useEffect(() => {
		if (!slugManual) setSlug(slugify(title));
	}, [title, slugManual]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const payload: CreateLessonPayload = {
			title,
			slug: slug || slugify(title),
			moduleId,
			description: description.trim() || null,
			durationSeconds: durationMins ? Number(durationMins) * 60 : 0,
			position: position ? Number(position) : null,
			isActive,
		};
		onSave(payload);
	}

	const inputClass =
		"w-full rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[color:var(--blue)] focus:outline-none transition";

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="relative w-full max-w-xl overflow-y-auto max-h-[90vh] rounded-[28px] border border-[color:var(--border)] bg-[var(--bg-card)] p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between gap-4">
					<h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
						{lesson ? "Edit lesson" : "New lesson"}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label
							htmlFor={`${uid}-title`}
							className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
						>
							Title <span className="text-[color:rgb(244,63,94)]">*</span>
						</label>
						<input
							id={`${uid}-title`}
							type="text"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="e.g. Introduction to Binary Search"
							className={inputClass}
						/>
					</div>

					<div>
						<label
							htmlFor={`${uid}-slug`}
							className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
						>
							Slug
						</label>
						<input
							id={`${uid}-slug`}
							type="text"
							value={slug}
							onChange={(e) => {
								setSlug(e.target.value);
								setSlugManual(true);
							}}
							placeholder="auto-generated from title"
							className={`${inputClass} font-mono`}
						/>
					</div>

					<div>
						<label
							htmlFor={`${uid}-module`}
							className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
						>
							Module <span className="text-[color:rgb(244,63,94)]">*</span>
						</label>
						<select
							id={`${uid}-module`}
							required
							value={moduleId}
							onChange={(e) => setModuleId(e.target.value)}
							className={inputClass}
						>
							<option value="" disabled>
								Select a module…
							</option>
							{(modules ?? []).map((m) => (
								<option key={m.id} value={m.id}>
									{m.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor={`${uid}-desc`}
							className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
						>
							Description
						</label>
						<textarea
							id={`${uid}-desc`}
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="What will students learn in this lesson?"
							className={`${inputClass} resize-none`}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor={`${uid}-duration`}
								className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
							>
								Duration (minutes)
							</label>
							<input
								id={`${uid}-duration`}
								type="number"
								min={1}
								value={durationMins}
								onChange={(e) => setDurationMins(e.target.value)}
								placeholder="e.g. 45"
								className={inputClass}
							/>
						</div>
						<div>
							<label
								htmlFor={`${uid}-position`}
								className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
							>
								Position
							</label>
							<input
								id={`${uid}-position`}
								type="number"
								min={1}
								value={position}
								onChange={(e) => setPosition(e.target.value)}
								placeholder="e.g. 1"
								className={inputClass}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
						<div>
							<p className="text-sm font-medium text-[var(--text-primary)]">Active</p>
							<p className="text-xs text-[var(--text-muted)]">
								Visible to enrolled students
							</p>
						</div>
						<button
							type="button"
							role="switch"
							aria-checked={isActive}
							onClick={() => setIsActive((v) => !v)}
							className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
								isActive ? "bg-[var(--teal)]" : "bg-[var(--bg-elevated)]"
							}`}
						>
							<span
								className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
									isActive ? "translate-x-5" : "translate-x-0"
								}`}
							/>
						</button>
					</div>

					<div className="flex items-center justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="rounded-2xl bg-[var(--blue)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
						>
							{isLoading ? "Saving…" : lesson ? "Save changes" : "Create lesson"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
