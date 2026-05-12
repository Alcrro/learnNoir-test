import type { LucideIcon } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import type { DashboardTone } from "../../data/dashboardData";

const iconStyles: Record<DashboardTone, string> = {
	blue: "bg-(--blue-bg) text-(--blue-text)",
	teal: "bg-(--teal-bg) text-(--teal-text)",
	amber: "bg-(--amber-bg) text-(--amber-text)",
	slate: "bg-(--bg-secondary) text-(--text-primary)",
	rose: "bg-[color:rgba(244,63,94,0.12)] text-[color:rgb(225,29,72)] dark:text-[color:rgb(251,113,133)]",
};

type Props = {
	icon: LucideIcon;
	title: string;
	description: string;
	tone?: DashboardTone;
};

export function GovernanceCard({ icon: Icon, title, description, tone = "blue" }: Props) {
	return (
		<div className="rounded-3xl border border-(--border) bg-(--bg-secondary) p-5">
			<div className="flex items-start gap-3">
				<div className={cn("rounded-2xl p-3", iconStyles[tone])}>
					<Icon className="h-5 w-5" />
				</div>
				<div>
					<p className="text-sm font-semibold text-(--text-primary)">{title}</p>
					<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{description}</p>
				</div>
			</div>
		</div>
	);
}
