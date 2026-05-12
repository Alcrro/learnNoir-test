import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { DashboardQuickAction } from "../../data/dashboardData";

type Props = { action: DashboardQuickAction };

export function QuickActionCard({ action }: Props) {
	return (
		<Link
			to={action.href}
			className="rounded-3xl border border-(--border) bg-(--bg-secondary) p-4 transition hover:border-(--border-strong) hover:bg-(--bg-elevated)"
		>
			<p className="text-sm font-semibold text-(--text-primary)">{action.title}</p>
			<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{action.description}</p>
			<span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-(--text-primary)">
				{action.cta}
				<ArrowRight className="h-4 w-4" />
			</span>
		</Link>
	);
}
