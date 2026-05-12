import { BarChart3 } from "lucide-react";
import type { DashboardInsight } from "../../data/dashboardData";
import { DashboardProgressBar } from "../DashboardUI";

type Props = { item: DashboardInsight };

function healthTone(value: number) {
	if (value >= 85) return "teal" as const;
	if (value >= 70) return "blue" as const;
	return "amber" as const;
}

export function ModuleHealthCard({ item }: Props) {
	return (
		<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-5">
			<div className="flex items-center justify-between gap-3">
				<div>
					<p className="text-base font-semibold text-[var(--text-primary)]">{item.label}</p>
					<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.helper}</p>
				</div>
				<div className="rounded-2xl bg-[var(--blue-bg)] p-3 text-[var(--blue-text)]">
					<BarChart3 className="h-5 w-5" />
				</div>
			</div>
			<div className="mt-6">
				<div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
					<span>Health</span>
					<span>{item.value}%</span>
				</div>
				<DashboardProgressBar value={item.value} tone={healthTone(item.value)} />
			</div>
		</div>
	);
}
