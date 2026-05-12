import { Radio } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
	title: string;
	lastActivityAt: string;
};

export function LiveLessonBanner({ title, lastActivityAt }: Props) {
	const time = new Date(lastActivityAt).toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div className="rounded-[28px] border border-[color:var(--teal-border)] bg-[var(--teal-bg)] p-5">
			<div className="flex items-start gap-4">
				<div className="shrink-0 rounded-2xl border border-[color:var(--teal-border)] bg-[var(--teal-bg)] p-3 text-[var(--teal-text)]">
					<Radio className="h-5 w-5" />
				</div>
				<div className="min-w-0 flex-1">
					<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--teal-text)]">
						Live now
					</p>
					<p className="mt-1 truncate text-lg font-semibold text-[var(--text-primary)]">
						{title}
					</p>
					<p className="mt-1 text-xs text-[var(--text-secondary)]">Last activity {time}</p>
				</div>
				<Link
					to="/dashboard/lessons"
					className="shrink-0 rounded-2xl border border-[color:var(--teal-border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
				>
					View
				</Link>
			</div>
		</div>
	);
}
