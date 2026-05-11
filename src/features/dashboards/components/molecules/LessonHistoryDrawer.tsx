import { X } from "lucide-react";
import { useLessonHistory } from "../../hooks/useLessonHistory";
import type { LessonEditEntry } from "../../types/teacher.types";

function formatRelative(iso: string): string {
	const diff = Date.now() - new Date(iso).getTime();
	const mins = Math.floor(diff / 60_000);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins}m ago`;
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) return `${hrs}h ago`;
	const days = Math.floor(hrs / 24);
	if (days < 7) return `${days}d ago`;
	return new Date(iso).toLocaleDateString();
}

function HistoryEntry({ entry }: { entry: LessonEditEntry }) {
	return (
		<div className="border-b border-[color:var(--border)] py-4 last:border-0">
			<div className="flex items-baseline justify-between gap-2 mb-2">
				<span className="text-xs font-semibold text-[var(--text-primary)]">
					{entry.editorName}
				</span>
				<span className="text-xs text-[var(--text-muted)] shrink-0">
					{formatRelative(entry.changedAt)}
				</span>
			</div>
			<ul className="space-y-1.5">
				{entry.changes.map((change, i) => (
					<li key={i} className="text-xs text-[var(--text-secondary)]">
						<span className="font-medium capitalize">{change.field}</span>
						{": "}
						<span className="line-through text-[var(--text-muted)]">
							{change.from || "—"}
						</span>
						{" → "}
						<span className="text-[var(--text-primary)]">{change.to || "—"}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

type Props = {
	lessonId: string | null;
	lessonTitle: string;
	onClose: () => void;
};

export function LessonHistoryDrawer({ lessonId, lessonTitle, onClose }: Props) {
	const { data, isLoading } = useLessonHistory(lessonId);

	return (
		<>
			<div
				className="fixed inset-0 z-30 bg-black/30"
				onClick={onClose}
				aria-hidden="true"
			/>
			<aside className="fixed right-0 top-0 z-40 flex h-full w-full max-w-sm flex-col bg-[var(--bg-card)] shadow-2xl border-l border-[color:var(--border)]">
				<div className="flex items-start justify-between gap-3 border-b border-[color:var(--border)] px-5 py-4">
					<div className="min-w-0">
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
							Edit history
						</p>
						<p className="mt-0.5 truncate text-sm font-semibold text-[var(--text-primary)]">
							{lessonTitle}
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close history"
						className="mt-0.5 shrink-0 rounded-lg p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto px-5">
					{isLoading && (
						<p className="py-8 text-center text-xs text-[var(--text-muted)]">Loading…</p>
					)}
					{!isLoading && (!data || data.length === 0) && (
						<p className="py-8 text-center text-xs text-[var(--text-muted)]">
							No edits recorded yet.
						</p>
					)}
					{data && data.length > 0 && (
						<div>
							{data.map((entry) => (
								<HistoryEntry key={entry.id} entry={entry} />
							))}
						</div>
					)}
				</div>
			</aside>
		</>
	);
}
