import { Clock3 } from "lucide-react";
import type { DashboardSession } from "../../data/dashboardData";
import { DashboardBadge } from "../DashboardUI";

type Props = { session: DashboardSession };

export function SessionCard({ session }: Props) {
	const tone =
		session.status === "Booked" || session.status === "Next class" ? "blue" : "amber";

	return (
		<div className="rounded-3xl border border-(--border) bg-(--bg-secondary) p-4">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<p className="text-base font-semibold text-(--text-primary)">{session.title}</p>
					<p className="mt-1 text-sm text-(--text-secondary)">
						{session.group} · {session.mode}
					</p>
				</div>
				<DashboardBadge label={session.status} tone={tone} />
			</div>
			<div className="mt-4 flex items-center gap-2 text-sm text-(--text-secondary)">
				<Clock3 className="h-4 w-4" />
				{session.time}
			</div>
			<p className="mt-3 text-sm leading-6 text-(--text-secondary)">{session.meta}</p>
		</div>
	);
}
