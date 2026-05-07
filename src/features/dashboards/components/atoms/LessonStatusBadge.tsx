import { cn } from "../../../../libs/utils/cn";

type Status = "draft" | "reviewed" | "published";

const styles: Record<Status, string> = {
	draft: "border-[color:var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]",
	reviewed: "border-transparent bg-[var(--amber-bg)] text-[var(--amber-text)]",
	published: "border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
};

const labels: Record<Status, string> = {
	draft: "Draft",
	reviewed: "In Review",
	published: "Published",
};

type Props = { status: Status; className?: string };

export function LessonStatusBadge({ status, className }: Props) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.04em]",
				styles[status],
				className,
			)}
		>
			{labels[status]}
		</span>
	);
}
