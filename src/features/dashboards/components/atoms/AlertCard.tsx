import type { DashboardAlert } from "../../data/dashboardData";
import { DashboardBadge } from "../DashboardUI";

type Props = { alert: DashboardAlert };

export function AlertCard({ alert }: Props) {
	return (
		<div className="rounded-3xl border border-(--border) bg-(--bg-secondary) p-4">
			<div className="flex items-start justify-between gap-3">
				<p className="text-sm font-semibold text-(--text-primary)">{alert.title}</p>
				<DashboardBadge
					label={alert.meta}
					tone={alert.tone}
					className="max-w-44 justify-center text-center"
				/>
			</div>
			<p className="mt-3 text-sm leading-6 text-(--text-secondary)">{alert.description}</p>
		</div>
	);
}
