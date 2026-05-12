import type { DashboardInsight } from "../../data/dashboardData";

type Props = { item: DashboardInsight };

export function ActivityBarColumn({ item }: Props) {
	return (
		<div className="flex flex-col items-center gap-3">
			<div className="flex h-52 w-full items-end rounded-[24px] border border-[color:var(--border)] bg-[var(--bg-secondary)] p-3">
				<div
					className="w-full rounded-[18px] bg-[var(--blue)]"
					style={{ height: `${item.value}%` }}
				/>
			</div>
			<div className="text-center">
				<p className="text-sm font-semibold text-[var(--text-primary)]">{item.label}</p>
				<p className="mt-1 text-xs text-[var(--text-secondary)]">{item.value}%</p>
				<p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
					{item.helper}
				</p>
			</div>
		</div>
	);
}
