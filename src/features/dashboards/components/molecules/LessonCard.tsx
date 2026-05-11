import { Clock, Edit2, Eye, Globe, History, Trash2, Users } from "lucide-react";
import type { TeacherLessonDTO } from "../../types/teacher.types";
import { LessonStatusBadge } from "../atoms/LessonStatusBadge";
import { DashboardPanel } from "../DashboardUI";

type Props = {
	lesson: TeacherLessonDTO;
	onEdit: (lesson: TeacherLessonDTO) => void;
	onDelete: (id: string) => void;
	onReview: (id: string) => void;
	onPublish: (id: string) => void;
	onHistory: (lesson: TeacherLessonDTO) => void;
};

export function LessonCard({ lesson, onEdit, onDelete, onReview, onPublish, onHistory }: Props) {
	const durationMins = Math.round(lesson.durationSeconds / 60);

	return (
		<DashboardPanel className="h-full">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="flex-1 min-w-0">
					<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] truncate">
						{lesson.moduleName}
					</p>
					<h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
						{lesson.title}
					</h3>
					{lesson.description && (
						<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] line-clamp-2">
							{lesson.description}
						</p>
					)}
				</div>
				<LessonStatusBadge status={lesson.status} className="shrink-0" />
			</div>

			<div className="mt-5 grid grid-cols-3 gap-3">
				<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-3">
					<div className="flex items-center gap-1.5 text-[var(--text-muted)]">
						<Clock className="h-3.5 w-3.5 shrink-0" />
						<p className="text-xs uppercase tracking-[0.12em]">Duration</p>
					</div>
					<p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
						{durationMins > 0 ? `${durationMins}m` : "—"}
					</p>
				</div>
				<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-3">
					<div className="flex items-center gap-1.5 text-[var(--text-muted)]">
						<Users className="h-3.5 w-3.5 shrink-0" />
						<p className="text-xs uppercase tracking-[0.12em]">Students</p>
					</div>
					<p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
						{lesson.studentCount}
					</p>
				</div>
				<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-3">
					<div className="flex items-center gap-1.5 text-[var(--text-muted)]">
						<Eye className="h-3.5 w-3.5 shrink-0" />
						<p className="text-xs uppercase tracking-[0.12em]">Completion</p>
					</div>
					<p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
						{lesson.completionRate}%
					</p>
				</div>
			</div>

			<div className="mt-5 flex items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					{lesson.status === "draft" && (
						<button
							type="button"
							onClick={() => onReview(lesson.id)}
							className="inline-flex items-center gap-1.5 rounded-xl border border-[color:var(--amber-border)] bg-[var(--amber-bg)] px-3 py-2 text-xs font-semibold text-[var(--amber-text)] transition hover:opacity-80"
						>
							<Eye className="h-3.5 w-3.5" />
							Send for review
						</button>
					)}
					{lesson.status === "reviewed" && (
						<button
							type="button"
							onClick={() => onPublish(lesson.id)}
							className="inline-flex items-center gap-1.5 rounded-xl border border-[color:var(--teal-border)] bg-[var(--teal-bg)] px-3 py-2 text-xs font-semibold text-[var(--teal-text)] transition hover:opacity-80"
						>
							<Globe className="h-3.5 w-3.5" />
							Publish
						</button>
					)}
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => onHistory(lesson)}
						aria-label="View edit history"
						className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-primary)]"
					>
						<History className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => onEdit(lesson)}
						aria-label="Edit lesson"
						className="rounded-xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-primary)]"
					>
						<Edit2 className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => onDelete(lesson.id)}
						aria-label="Delete lesson"
						className="rounded-xl border border-transparent bg-[color:rgba(244,63,94,0.1)] p-2 text-[color:rgb(225,29,72)] transition hover:bg-[color:rgba(244,63,94,0.18)] dark:text-[color:rgb(251,113,133)]"
					>
						<Trash2 className="h-4 w-4" />
					</button>
				</div>
			</div>
		</DashboardPanel>
	);
}
