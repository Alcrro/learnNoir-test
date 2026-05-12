type Props = {
	rank: number;
	username: string;
	avatarUrl: string | null;
	avgScore: number;
};

export function TopPerformerCard({ rank, username, avatarUrl, avgScore }: Props) {
	const initials = username
		.split(/\s+/)
		.map((w) => w[0] ?? "")
		.join("")
		.toUpperCase()
		.slice(0, 2);

	return (
		<div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
			<div className="relative shrink-0">
				{avatarUrl ? (
					<img src={avatarUrl} alt={username} className="h-10 w-10 rounded-full object-cover" />
				) : (
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--blue-bg)] text-sm font-semibold text-[var(--blue-text)]">
						{initials}
					</div>
				)}
				<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-card)] text-xs font-bold text-[var(--text-muted)]">
					{rank}
				</span>
			</div>
			<div className="min-w-0">
				<p className="truncate text-sm font-semibold text-[var(--text-primary)]">{username}</p>
				<p className="text-xs text-[var(--text-secondary)]">
					Score: {avgScore > 0 ? avgScore.toFixed(1) : "—"}
				</p>
			</div>
		</div>
	);
}
