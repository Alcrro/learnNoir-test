type Props = {
	label: string;
	value: string | number;
};

export function CourseStatCell({ label, value }: Props) {
	return (
		<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
			<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</p>
			<p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{value}</p>
		</div>
	);
}
